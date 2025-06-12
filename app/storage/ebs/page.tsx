'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronRight, Database, HardDrive, DollarSign, MapPin, Calendar, Settings, Loader2 } from 'lucide-react';
import { fetch_ec2_volumes } from '@/services/ec2';
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock volumes for demo
const mockVolumeData = [
    {
        "Iops": 3000,
        "VolumeType": "gp3",
        "MultiAttachEnabled": false,
        "Throughput": 125,
        "Operator": {
            "Managed": false
        },
        "VolumeId": "vol-08c01b6b577a1bad4",
        "Size": 8,
        "SnapshotId": "snap-057ad057ac5ed855c",
        "AvailabilityZone": "ap-northeast-1c",
        "State": "in-use",
        "CreateTime": "2025-06-03T07:48:15.317Z",
        "Attachments": [
            {
                "DeleteOnTermination": true,
                "VolumeId": "vol-08c01b6b577a1bad4",
                "InstanceId": "i-020d5dd5bb34b182a",
                "Device": "/dev/xvda",
                "State": "attached",
                "AttachTime": "2025-06-03T07:48:15.000Z"
            }
        ],
        "Encrypted": false,
        "cost": 0.2122666733
    },
    {
        "Iops": 4000,
        "VolumeType": "gp3",
        "MultiAttachEnabled": true,
        "Throughput": 250,
        "Operator": {
            "Managed": true
        },
        "VolumeId": "vol-09d02c7c688b2cfe5",
        "Size": 16,
        "SnapshotId": "snap-168be068bd6f956f4",
        "AvailabilityZone": "ap-northeast-1a",
        "State": "available",
        "CreateTime": "2025-06-02T14:22:30.245Z",
        "Attachments": [],
        "Encrypted": true,
        "cost": 0.4245333466
    },
    {
        "Iops": 2000,
        "VolumeType": "gp2",
        "MultiAttachEnabled": false,
        "Throughput": 100,
        "Operator": {
            "Managed": false
        },
        "VolumeId": "vol-0a3e4f5g6h7i8j9k0",
        "Size": 32,
        "SnapshotId": "snap-279cf179ce7fa67g5",
        "AvailabilityZone": "ap-northeast-1b",
        "State": "in-use",
        "CreateTime": "2025-06-01T09:15:45.123Z",
        "Attachments": [
            {
                "DeleteOnTermination": false,
                "VolumeId": "vol-0a3e4f5g6h7i8j9k0",
                "InstanceId": "i-031e6ee6cc45c293b",
                "Device": "/dev/sdf",
                "State": "attached",
                "AttachTime": "2025-06-01T09:16:00.000Z"
            }
        ],
        "Encrypted": true,
        "cost": 0.8490666932
    }
];

// const mockClusters = [
//   { id: 'cluster-1', name: 'Production Cluster', arn: 'arn:aws:ecs:ap-northeast-1:123456789012:cluster/production' },
//   { id: 'cluster-2', name: 'Development Cluster', arn: 'arn:aws:ecs:ap-northeast-1:123456789012:cluster/development' },
//   { id: 'cluster-3', name: 'Testing Cluster', arn: 'arn:aws:ecs:ap-northeast-1:123456789012:cluster/testing' }
// ];

// Helper Components
const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'in-use': return 'bg-green-100 text-green-800 border-green-200';
            case 'available': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'creating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'deleting': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

const VolumeTypeChip = ({ type }) => {
    const getTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'gp3': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'gp2': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'io1': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'io2': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(type)}`}>
            <HardDrive className="w-3 h-3 mr-1" />
            {type}
        </span>
    );
};

const ExpandableRow = ({ volume, isExpanded, onToggle }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <tr className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">
                    <button
                        onClick={onToggle}
                        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <Database className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{volume.VolumeId}</span>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <VolumeTypeChip type={volume.VolumeType} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-900">{volume.Size} GB</span>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={volume.State} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{volume.AvailabilityZone}</span>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-600">${volume.cost?.toFixed(2) || '0.00'}</span>
                    </div>
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-gray-50">
                    <td colSpan="7" className="px-6 py-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-sm">Performance</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">IOPS:</span>
                                            <span className="text-xs font-medium text-gray-900">{volume.Iops}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Throughput:</span>
                                            <span className="text-xs font-medium text-gray-900">{volume.Throughput} MB/s</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Multi-Attach:</span>
                                            <span className={`text-xs font-medium ${volume.MultiAttachEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                                                {volume.MultiAttachEnabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-sm">Security & Management</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Encrypted:</span>
                                            <span className={`text-xs font-medium ${volume.Encrypted ? 'text-green-600' : 'text-orange-600'}`}>
                                                {volume.Encrypted ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Managed:</span>
                                            <span className={`text-xs font-medium ${volume.Operator?.Managed ? 'text-green-600' : 'text-gray-500'}`}>
                                                {volume.Operator?.Managed ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Snapshot ID:</span>
                                            <span className="text-xs font-medium text-gray-900 truncate">{volume.SnapshotId}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 text-sm">Timeline</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Created:</span>
                                            <span className="text-xs font-medium text-gray-900">{formatDate(volume.CreateTime)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {volume.Attachments && volume.Attachments.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Attachments</h4>
                                    <div className="space-y-2">
                                        {volume.Attachments.map((attachment, idx) => (
                                            <div key={idx} className="bg-gray-50 rounded-md p-3">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                                    <div>
                                                        <span className="text-gray-500">Instance:</span>
                                                        <span className="font-medium text-gray-900 ml-1">{attachment.InstanceId}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Device:</span>
                                                        <span className="font-medium text-gray-900 ml-1">{attachment.Device}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">State:</span>
                                                        <StatusBadge status={attachment.State} />
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Delete on Termination:</span>
                                                        <span className={`font-medium ml-1 ${attachment.DeleteOnTermination ? 'text-red-600' : 'text-green-600'}`}>
                                                            {attachment.DeleteOnTermination ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

const VolumeTable = () => {
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [volumes, setVolumes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof window === "undefined") return;

        const fetchBuckets = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch_ec2_volumes();
                if (!response) throw new Error('Failed to fetch volumes');
                setVolumes(response);
            } catch (err) {
                setError('Failed to load EC2 Ebs volumes. Please check your credentials and try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuckets();

        return () => {
            setVolumes([]);
        };
    }, []);

    const toggleRow = (volumeId: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(volumeId)) {
            newExpanded.delete(volumeId);
        } else {
            newExpanded.add(volumeId);
        }
        setExpandedRows(newExpanded);
    };

    const totalCost = useMemo(() => {
        return volumes.reduce((sum, volume) => sum + (volume.cost || 0), 0);
    }, [volumes]);

    const totalSize = useMemo(() => {
        return volumes.reduce((sum, volume) => sum + volume.Size, 0);
    }, [volumes]);

    return (
        <BasicSidebarLayout>
            {
                isLoading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                ) :
                    error ? (
                        <Alert variant="destructive" className="">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) :
                        !volumes.length ? (
                            <Alert className="">
                                <AlertDescription>No EC2 volumes found in your account.</AlertDescription>
                            </Alert>
                        ) : (
                            <div className="p-4 pt-0">
                                {/* Header */}
                                <div className="mb-8">
                                    {/* Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <Database className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-500">Total Volumes</p>
                                                    <p className="text-2xl font-bold text-gray-900">{volumes.length}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <HardDrive className="w-8 h-8 text-green-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-500">Total Storage</p>
                                                    <p className="text-2xl font-bold text-gray-900">{totalSize} GB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <DollarSign className="w-8 h-8 text-purple-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-500">Monthly Cost</p>
                                                    <p className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Volume ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Type
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Size
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Availability Zone
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Monthly Cost
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {volumes.map((volume) => (
                                                    <ExpandableRow
                                                        key={volume.VolumeId}
                                                        volume={volume}
                                                        isExpanded={expandedRows.has(volume.VolumeId)}
                                                        onToggle={() => toggleRow(volume.VolumeId)}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
            }
        </BasicSidebarLayout>
    );
};

export default VolumeTable;