"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, RefreshCw, Search } from 'lucide-react';
import { fetch_vpcs } from '@/services/ec2';
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout';

const VPCTable = () => {
    const [vpcData, setVpcData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);

    // Sample data for demonstration
    //   const sampleData = [
    //     {
    //       "OwnerId": "534038054875",
    //       "InstanceTenancy": "default",
    //       "CidrBlockAssociationSet": [
    //         {
    //           "AssociationId": "vpc-cidr-assoc-0aab41e0230698fe9",
    //           "CidrBlock": "172.31.0.0/16",
    //           "CidrBlockState": {
    //             "State": "associated"
    //           }
    //         }
    //       ],
    //       "IsDefault": true,
    //       "BlockPublicAccessStates": {
    //         "InternetGatewayBlockMode": "off"
    //       },
    //       "VpcId": "vpc-0ff68c5f3ad549e2f",
    //       "State": "available",
    //       "CidrBlock": "172.31.0.0/16",
    //       "DhcpOptionsId": "dopt-0eb186c41fbd3919c",
    //       "cost": 0
    //     },
    //     {
    //       "OwnerId": "534038054875",
    //       "InstanceTenancy": "dedicated",
    //       "CidrBlockAssociationSet": [
    //         {
    //           "AssociationId": "vpc-cidr-assoc-0bb41e0230698fe8",
    //           "CidrBlock": "10.0.0.0/16",
    //           "CidrBlockState": {
    //             "State": "associated"
    //           }
    //         }
    //       ],
    //       "IsDefault": false,
    //       "BlockPublicAccessStates": {
    //         "InternetGatewayBlockMode": "on"
    //       },
    //       "VpcId": "vpc-1aa68c5f3ad549e3a",
    //       "State": "available",
    //       "CidrBlock": "10.0.0.0/16",
    //       "DhcpOptionsId": "dopt-1eb186c41fbd3919d",
    //       "cost": 25.50
    //     }
    //   ];

    // Fetch data from API
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch_vpcs();
            setVpcData(response);
            setFilteredData(response);
            setLastUpdated(new Date().toLocaleString());
        } catch (error) {
            console.error('Error fetching data:', error);
            // Fallback to sample data on error
            //   setVpcData(sampleData);
            //   setFilteredData(sampleData);
        } finally {
            setLoading(false);
        }
    };

    // Search functionality
    useEffect(() => {
        if (!searchTerm) {
            setFilteredData(vpcData);
        } else {
            const filtered = vpcData.filter(vpc =>
                Object.values(vpc).some(value =>
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, vpcData]);

    // Initial data load
    useEffect(() => {
        if (typeof window !== undefined)
            fetchData();
    }, []);
    console.log("voc data:", vpcData);
    console.log("filtered: ", filteredData);

    // Toggle row expansion
    const toggleRowExpansion = (vpcId) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(vpcId)) {
            newExpanded.delete(vpcId);
        } else {
            newExpanded.add(vpcId);
        }
        setExpandedRows(newExpanded);
    };

    // Status badge component
    const StatusBadge = ({ status, type = 'status' }: { status: string }) => {
        const getStatusStyles = () => {
            switch (status) {
                case 'available':
                    return 'bg-green-100 text-green-800 border border-green-200';
                case 'pending':
                    return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
                case 'associated':
                    return 'bg-blue-100 text-blue-800 border border-blue-200';
                default:
                    return 'bg-gray-100 text-gray-800 border border-gray-200';
            }
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
                {typeof status === 'boolean' ? (status ? 'Yes' : 'No') : status}
            </span>
        );
    };

    // Calculate stats
    // const stats = {
    //     total: filteredData.length,
    //     available: filteredData.filter(vpc => vpc.State === 'available').length,
    //     default: filteredData.filter(vpc => vpc.IsDefault).length,
    //     totalCost: filteredData.reduce((sum, vpc) => sum + (vpc.cost || 0), 0)
    // };

    return (
        <BasicSidebarLayout>
            <div className="p-4">
                {/* Header */}
                <div className="">
                    <div className="">
                        <h1 className="text-2xl font-semibold mb-1">VPC Management Dashboard</h1>
                        <p className="">Virtual Private Cloud Configuration Overview</p>
                    </div>

                    {/* Stats Grid */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-200">
                        <div className="px-8 py-6 text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total VPCs</div>
                        </div>
                        <div className="px-8 py-6 text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.available}</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Available</div>
                        </div>
                        <div className="px-8 py-6 text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.default}</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Default VPCs</div>
                        </div>
                        <div className="px-8 py-6 text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-1">${stats.totalCost.toFixed(2)}</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Cost</div>
                        </div>
                    </div> */}
                </div>

                {/* Controls */}
                <div className="bg-white py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    {/* <div className="flex items-center space-x-4"> */}
                    {/* <button
                            onClick={fetchData}
                            disabled={loading}
                            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center space-x-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span>Refresh Data</span>
                        </button> */}
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search VPCs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        {/* </div> */}
                    </div>
                    <div className="text-sm text-gray-500">
                        {loading && <span>Loading...</span>}
                        {lastUpdated && !loading && <span>Last updated: {lastUpdated}</span>}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-b-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-8"></th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">VPC ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CIDR Block</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">State</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Default</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tenancy</th>
                                    {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cost</th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.map((vpc: any) => (
                                    <React.Fragment key={vpc.VpcId}>
                                        {/* Main Row */}
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => toggleRowExpansion(vpc.VpcId)}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {expandedRows.has(vpc.VpcId) ? (
                                                        <ChevronDown className="w-5 h-5" />
                                                    ) : (
                                                        <ChevronRight className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                    {vpc.VpcId}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {vpc.OwnerId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm bg-orange-50 text-orange-700 px-2 py-1 rounded">
                                                    {vpc.CidrBlock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={vpc.State} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={vpc.IsDefault} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {vpc.InstanceTenancy}
                                            </td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ${(vpc.cost || 0).toFixed(2)}
                                            </td> */}
                                        </tr>

                                        {/* Expanded Row */}
                                        {expandedRows.has(vpc.VpcId) && (
                                            <tr className="bg-gray-50">
                                                <td colSpan="8" className="px-6 py-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {/* DHCP Options */}
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-gray-700 mb-2">DHCP Options</h4>
                                                            <span className="font-mono text-sm bg-white border px-2 py-1 rounded">
                                                                {vpc.DhcpOptionsId}
                                                            </span>
                                                        </div>

                                                        {/* Block Public Access */}
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Internet Gateway Block Mode</h4>
                                                            <StatusBadge status={vpc.BlockPublicAccessStates?.InternetGatewayBlockMode || 'N/A'} />
                                                        </div>

                                                        {/* CIDR Block Associations */}
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-gray-700 mb-2">CIDR Block Associations</h4>
                                                            <div className="space-y-2">
                                                                {vpc.CidrBlockAssociationSet?.map((association, index) => (
                                                                    <div key={index} className="bg-white border rounded p-3">
                                                                        <div className="text-xs text-gray-500 mb-1">Association ID:</div>
                                                                        <div className="font-mono text-xs mb-2">{association.AssociationId}</div>
                                                                        <div className="text-xs text-gray-500 mb-1">CIDR Block:</div>
                                                                        <span className="font-mono text-sm bg-orange-50 text-orange-700 px-2 py-1 rounded">
                                                                            {association.CidrBlock}
                                                                        </span>
                                                                        <div className="mt-2">
                                                                            <StatusBadge status={association.CidrBlockState?.State} />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredData.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">No VPCs found matching your search criteria.</div>
                        </div>
                    )}
                </div>
            </div>
        </BasicSidebarLayout>
    );
};

export default VPCTable;