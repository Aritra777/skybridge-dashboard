'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { fetch_ecs_clusters, fetch_ecs_services } from '@/services/ecs';
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout';
import { ChevronDown, ChevronRight, AlertCircle, CheckCircle, XCircle, Clock, Server, Network, Shield } from 'lucide-react';

// Utility Components
const StatusBadge = ({ status, rolloutState }) => {
    const getStatusInfo = () => {
        if (rolloutState === 'FAILED') {
            return { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, text: 'Failed' };
        }
        if (status === 'ACTIVE') {
            return { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, text: 'Active' };
        }
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, text: status };
    };

    const { color, icon: Icon, text } = getStatusInfo();

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
            <Icon className="w-3 h-3 mr-1" />
            {text}
        </span>
    );
};

const TaskCounts = ({ desired, running, pending, failed }) => (
    <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">Desired: <span className="font-medium text-gray-900">{desired}</span></span>
            <span className="text-gray-600">Running: <span className="font-medium text-green-600">{running}</span></span>
        </div>
        {(pending > 0 || failed > 0) && (
            <div className="flex items-center space-x-4 text-sm">
                {pending > 0 && <span className="text-gray-600">Pending: <span className="font-medium text-yellow-600">{pending}</span></span>}
                {failed > 0 && <span className="text-gray-600">Failed: <span className="font-medium text-red-600">{failed}</span></span>}
            </div>
        )}
    </div>
);

const ClusterSelector = ({ clusters, selectedCluster, onClusterChange }) => (
    <div className="flex items-center space-x-2">
        <label htmlFor="cluster-select" className="text-sm font-medium text-gray-700">
            Cluster:
        </label>
        <select
            id="cluster-select"
            value={selectedCluster}
            onChange={(e) => onClusterChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="">All Clusters</option>
            {clusters.map((cluster) => (
                <option key={cluster} value={cluster}>
                    {cluster.split('/').pop()}
                </option>
            ))}
        </select>
    </div>
);

const ExpandedRow = ({ service }) => {
    const deployment = service.deployments?.[0];

    return (
        <tr className="bg-gray-50">
            <td colSpan="6" className="px-6 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Deployment Configuration */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                            <Server className="w-4 h-4 mr-2 text-blue-600" />
                            Deployment Configuration
                        </h4>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Strategy:</span>
                                    <span className="ml-2 font-medium">{service.deploymentConfiguration?.strategy}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Circuit Breaker:</span>
                                    <span className="ml-2 font-medium">
                                        {service.deploymentConfiguration?.deploymentCircuitBreaker?.enable ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Max Percent:</span>
                                    <span className="ml-2 font-medium">{service.deploymentConfiguration?.maximumPercent}%</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Min Healthy:</span>
                                    <span className="ml-2 font-medium">{service.deploymentConfiguration?.minimumHealthyPercent}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Network Configuration */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                            <Network className="w-4 h-4 mr-2 text-green-600" />
                            Network Configuration
                        </h4>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-600">Public IP:</span>
                                    <span className="ml-2 font-medium">
                                        {service.networkConfiguration?.awsvpcConfiguration?.assignPublicIp || 'DISABLED'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Security Groups:</span>
                                    <div className="mt-1">
                                        {service.networkConfiguration?.awsvpcConfiguration?.securityGroups?.map((sg, idx) => (
                                            <span key={idx} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-1">
                                                {sg}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Subnets:</span>
                                    <div className="mt-1">
                                        {service.networkConfiguration?.awsvpcConfiguration?.subnets?.slice(0, 2).map((subnet, idx) => (
                                            <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-1">
                                                {subnet}
                                            </span>
                                        ))}
                                        {service.networkConfiguration?.awsvpcConfiguration?.subnets?.length > 2 && (
                                            <span className="text-gray-500 text-xs">
                                                +{service.networkConfiguration.awsvpcConfiguration.subnets.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Events */}
                    {service.events && service.events.length > 0 && (
                        <div className="lg:col-span-2 space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
                                Recent Events
                            </h4>
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="max-h-32 overflow-y-auto">
                                    {service.events.slice(0, 3).map((event, idx) => (
                                        <div key={event.id} className={`p-3 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}>
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm text-gray-700 flex-1">{event.message}</p>
                                                <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                                                    {new Date(event.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

const ServiceTableRow = ({ service, isExpanded, onToggleExpand }) => {
    const deployment = service.deployments?.[0];
    const createdDate = new Date(service.createdAt).toLocaleDateString();

    return (
        <>
            <tr className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-6 py-4">
                    <button
                        onClick={onToggleExpand}
                        className="flex items-center space-x-3 text-left w-full"
                    >
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                        <div>
                            <div className="font-medium text-gray-900">{service.serviceName}</div>
                            <div className="text-sm text-gray-500">{service.clusterArn.split('/').pop()}</div>
                        </div>
                    </button>
                </td>

                <td className="px-6 py-4">
                    <StatusBadge
                        status={service.status}
                        rolloutState={deployment?.rolloutState}
                    />
                    {deployment?.rolloutStateReason && (
                        <div className="text-xs text-gray-500 mt-1">
                            {deployment.rolloutStateReason}
                        </div>
                    )}
                </td>

                <td className="px-6 py-4">
                    <TaskCounts
                        desired={service.desiredCount}
                        running={service.runningCount}
                        pending={service.pendingCount}
                        failed={deployment?.failedTasks || 0}
                    />
                </td>

                <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                        {service.taskDefinition.split('/').pop()}
                    </div>
                    <div className="text-xs text-gray-500">
                        {service.deploymentConfiguration?.strategy} deployment
                    </div>
                </td>

                <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{createdDate}</div>
                    <div className="text-xs text-gray-500">
                        by {service.createdBy?.split('/').pop() || 'System'}
                    </div>
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                            {service.networkConfiguration?.awsvpcConfiguration?.securityGroups?.length || 0} SGs
                        </span>
                    </div>
                </td>
            </tr>
            {isExpanded && <ExpandedRow service={service} />}
        </>
    );
};

function ECSServices() {
    const [clusters, setClusters] = useState<string[]>([]);
    const [services, setServices] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCluster, setSelectedCluster] = useState('');
    const [expandedRows, setExpandedRows] = useState(new Set());

    // Extract unique clusters
    // const clusters = useMemo(() => {
    //     return [...new Set(data.map(service => service.clusterArn))];
    // }, [data]);

    // Filter services based on selected cluster
    const filteredServices = useMemo(() => {
        if (!selectedCluster) return services;
        return services.filter(service => service.clusterArn === selectedCluster);
    }, [services, selectedCluster]);

    const toggleRowExpansion = (serviceArn: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(serviceArn)) {
            newExpanded.delete(serviceArn);
        } else {
            newExpanded.add(serviceArn);
        }
        setExpandedRows(newExpanded);
    };


    useEffect(() => {
        const fetchClusters = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response: any = await fetch_ecs_clusters();
                if (!response) throw new Error('Failed to fetch ECS clusters');
                setClusters(response);
                setSelectedCluster(response[0]);
            } catch (err) {
                setError('Failed to load ECS clusters. Please check your credentials and try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClusters();

        return () => {
            // setClusters([]);
        };
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            if (!selectedCluster || selectedCluster.trim() === '') return setError("Cluster Arn is not selected.");
            try {
                setIsLoading(true);
                setError('');
                const response: any = await fetch_ecs_services(selectedCluster);
                if (!response) throw new Error('Failed to fetch ECS Services');
                setServices(response);
            } catch (err) {
                setError('Failed to load ECS Services. Please check your credentials and try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();

        return () => {
            // setClusters([]);
        };
    }, [selectedCluster]);

    console.log(clusters);
    console.log("filters: ", filteredServices);

    return (
        <BasicSidebarLayout>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-sm">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">ECS Services</h2>
                                    <p className="text-sm text-gray-600">
                                        {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                                    </p>
                                </div>
                                <ClusterSelector
                                    clusters={clusters}
                                    selectedCluster={selectedCluster}
                                    onClusterChange={setSelectedCluster}
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Service Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tasks
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Task Definition
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Network
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredServices.map((service) => (
                                        <ServiceTableRow
                                            key={service.serviceArn}
                                            service={service}
                                            isExpanded={expandedRows.has(service.serviceArn)}
                                            onToggleExpand={() => toggleRowExpansion(service.serviceArn)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredServices.length === 0 && (
                            <div className="text-center py-12">
                                <Server className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {selectedCluster ? 'No services found for the selected cluster.' : 'No ECS services available.'}
                                </p>
                            </div>
                        )}

                    </div>
                </>
            )}
        </BasicSidebarLayout>
    );
}

export default ECSServices;