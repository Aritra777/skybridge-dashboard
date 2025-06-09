'use client';
import React, { useState, useEffect } from 'react';
// import { Loader2, ArrowUpDown, ChevronDown, ChevronUp, Server } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChevronDown,
    ChevronUp,
    Server,
    Network,
    HardDrive,
    Shield,
    Clock,
    MapPin,
    Cpu,
    Tag,
    Globe,
    Lock,
    Loader2,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { fetch_ec2_instances } from '@/services/ec2';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { fetch_cost } from '@/services/cost';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Navbar from '@/components/nav-bar-component';
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout';

const getStateVariant = (state: string) => {
    switch (state.toLowerCase()) {
        case "running":
            return "default"
        case "stopped":
            return "secondary"
        case "pending":
            return "outline"
        case "stopping":
            return "destructive"
        case "terminated":
            return "destructive"
        default:
            return "secondary"
    }
}

const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
        case "running":
            return "text-green-600 bg-green-50 border-green-200"
        case "stopped":
            return "text-red-600 bg-red-50 border-red-200"
        case "pending":
            return "text-yellow-600 bg-yellow-50 border-yellow-200"
        case "stopping":
            return "text-orange-600 bg-orange-50 border-orange-200"
        case "terminated":
            return "text-gray-600 bg-gray-50 border-gray-200"
        default:
            return "text-gray-600 bg-gray-50 border-gray-200"
    }
}

const Ec2ListingPage = () => {
    const [instances, setInstances] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInstances, setFilteredInstances] = useState<any[]>([]);

    useEffect(() => {
        const fetchInstances = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch_ec2_instances();
                if (!response) throw new Error('Failed to fetch EC2 instances');
                setInstances(response);
                setFilteredInstances(response);
            } catch (err) {
                setError('Failed to load EC2 instances. Please check your credentials and try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstances();

        return () => {
            setInstances([]);
        };
    }, []);

    // useEffect(() => {
    //     fetch_cost().then((costData) => {
    //         if (costData) {
    //             console.log("Cost Data:", costData);
    //         } else {
    //             console.error("Failed to fetch cost data");
    //         }
    //     }).catch((error) => {
    //         console.error("Error fetching cost data:", error);
    //     }
    //     );
    // }, []);

    const toggleRowExpansion = (instanceId: string) => {
        setExpandedRows((prev) =>
            prev.includes(instanceId)
                ? prev.filter((id) => id !== instanceId)
                : [...prev, instanceId]
        );
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = instances.filter((instance: any) =>
            instance.InstanceId.toLowerCase().includes(query) ||
            (instance.Tags?.find((tag: any) => tag.Key === "Name")?.Value || "Unnamed Instance").toLowerCase().includes(query)
        );
        setFilteredInstances(filtered);
    };

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
                        !instances.length ? (
                            <Alert className="">
                                <AlertDescription>No EC2 instances found in your account.</AlertDescription>
                            </Alert>
                        ) : (
                            <Card className="w-full shadow-lg rounded-none border-none">
                                <CardHeader className="text-gray-800">
                                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                        <Server className="h-6 w-6" />
                                        EC2 Instances
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="p-4">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                            placeholder="Search by Instance ID or Name..."
                                            className="w-full p-2 border rounded text-sm"
                                        />
                                    </div>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                                                    <TableHead className="font-semibold text-gray-700 py-4">Instance Details</TableHead>
                                                    <TableHead className="font-semibold text-gray-700">Type & State</TableHead>
                                                    <TableHead className="font-semibold text-gray-700">Network</TableHead>
                                                    <TableHead className="font-semibold text-gray-700">Location</TableHead>
                                                    <TableHead className="font-semibold text-gray-700">Currennt Cost</TableHead>
                                                    <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredInstances.map((instance: any) => (
                                                    <React.Fragment key={instance.InstanceId}>
                                                        <TableRow className="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100">
                                                            <TableCell className="py-4">
                                                                <div className="space-y-1">
                                                                    <div className="font-mono text-sm font-medium text-gray-900">{instance.InstanceId}</div>
                                                                    <div className="text-sm text-gray-600">
                                                                        {instance.Tags?.find((tag: any) => tag.Key === "Name")?.Value || "Unnamed Instance"}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">AMI: {instance.ImageId}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="space-y-2">
                                                                    <Badge variant="outline" className="font-medium">
                                                                        {instance.InstanceType}
                                                                    </Badge>
                                                                    <div>
                                                                        <Badge className={`${getStateColor(instance.State.Name)} border`}>
                                                                            {instance.State.Name}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="space-y-1 text-sm">
                                                                    <div className="flex items-center gap-1">
                                                                        <Globe className="h-3 w-3 text-blue-500" />
                                                                        <span className="font-medium">Public:</span>
                                                                        <span className="font-mono">{instance.PublicIpAddress || "N/A"}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Network className="h-3 w-3 text-green-500" />
                                                                        <span className="font-medium">Private:</span>
                                                                        <span className="font-mono">{instance.PrivateIpAddress}</span>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="space-y-1 text-sm">
                                                                    <div className="flex items-center gap-1">
                                                                        <MapPin className="h-3 w-3 text-orange-500" />
                                                                        <span>{instance.Placement.AvailabilityZone}</span>
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">VPC: {instance.VpcId}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="space-y-1 text-sm">
                                                                    <Badge variant="default" color='green'>{`$ ${instance.cost}`}</Badge>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => toggleRowExpansion(instance.InstanceId)}
                                                                    className="hover:bg-blue-100 transition-colors duration-200"
                                                                >
                                                                    {expandedRows.includes(instance.InstanceId) ? (
                                                                        <ChevronUp className="h-4 w-4" />
                                                                    ) : (
                                                                        <ChevronDown className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                        {expandedRows.includes(instance.InstanceId) && (
                                                            <TableRow>
                                                                <TableCell
                                                                    colSpan={5}
                                                                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400"
                                                                >
                                                                    <div className="p-6 space-y-6">
                                                                        {/* Instance Information */}
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                            {/* Basic Info */}
                                                                            <div className="space-y-3">
                                                                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                    <Server className="h-5 w-5 text-blue-600" />
                                                                                    Instance Details
                                                                                </div>
                                                                                <div className="space-y-2 text-sm">
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Architecture:</span>
                                                                                        <span className="font-mono">{instance.Architecture}</span>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Hypervisor:</span>
                                                                                        <span>{instance.Hypervisor}</span>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Virtualization:</span>
                                                                                        <span>{instance.VirtualizationType}</span>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Platform:</span>
                                                                                        <span>{instance.PlatformDetails}</span>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Key Pair:</span>
                                                                                        <span className="font-mono">{instance.KeyName || "N/A"}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* CPU & Performance */}
                                                                            <div className="space-y-3">
                                                                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                    <Cpu className="h-5 w-5 text-green-600" />
                                                                                    CPU & Performance
                                                                                </div>
                                                                                <div className="space-y-2 text-sm">
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">CPU Cores:</span>
                                                                                        <span>{instance.CpuOptions.CoreCount}</span>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Threads per Core:</span>
                                                                                        <span>{instance.CpuOptions.ThreadsPerCore}</span>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">EBS Optimized:</span>
                                                                                        <Badge variant={instance.EbsOptimized ? "default" : "secondary"} className="text-xs w-fit">
                                                                                            {instance.EbsOptimized ? "Yes" : "No"}
                                                                                        </Badge>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Enhanced Networking:</span>
                                                                                        <Badge variant={instance.EnaSupport ? "default" : "secondary"} className="text-xs w-fit">
                                                                                            {instance.EnaSupport ? "Enabled" : "Disabled"}
                                                                                        </Badge>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2">
                                                                                        <span className="font-medium text-gray-600">Monitoring:</span>
                                                                                        <Badge
                                                                                            variant={instance.Monitoring.State === "enabled" ? "default" : "secondary"}
                                                                                            className="text-xs w-fit"
                                                                                        >
                                                                                            {instance.Monitoring.State}
                                                                                        </Badge>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* Timing */}
                                                                            <div className="space-y-3">
                                                                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                    <Clock className="h-5 w-5 text-purple-600" />
                                                                                    Timing
                                                                                </div>
                                                                                <div className="space-y-2 text-sm">
                                                                                    <div>
                                                                                        <span className="font-medium text-gray-600">Launch Time:</span>
                                                                                        <div className="font-mono text-xs mt-1">
                                                                                            {new Date(instance.LaunchTime).toLocaleString()}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="font-medium text-gray-600">Usage Operation Update:</span>
                                                                                        <div className="font-mono text-xs mt-1">
                                                                                            {new Date(instance.UsageOperationUpdateTime).toLocaleString()}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <Separator />

                                                                        {/* Network Details */}
                                                                        <div className="space-y-3">
                                                                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                <Network className="h-5 w-5 text-blue-600" />
                                                                                Network Configuration
                                                                            </div>
                                                                            <div className="bg-white p-4 rounded border space-y-3">
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                                                    <div className="space-y-1">
                                                                                        <div className="font-medium text-gray-600">VPC & Subnet</div>
                                                                                        <div className="font-mono text-xs">{instance.VpcId}</div>
                                                                                        <div className="font-mono text-xs">{instance.SubnetId}</div>
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <div className="font-medium text-gray-600">Public DNS</div>
                                                                                        <div className="font-mono text-xs break-all">{instance.PublicDnsName || "N/A"}</div>
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <div className="font-medium text-gray-600">Private DNS</div>
                                                                                        <div className="font-mono text-xs break-all">{instance.PrivateDnsName}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex items-center justify-between pt-2 border-t">
                                                                                    <span className="text-sm font-medium text-gray-600">Source/Dest Check:</span>
                                                                                    <Badge variant={instance.SourceDestCheck ? "default" : "secondary"} className="text-xs">
                                                                                        {instance.SourceDestCheck ? "Enabled" : "Disabled"}
                                                                                    </Badge>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <Separator />
                                                                        <div className='grid grid-cols-3 gap-6'>
                                                                            {/* Security Groups */}
                                                                            <div className="space-y-3">
                                                                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                    <Shield className="h-5 w-5 text-red-600" />
                                                                                    Security Groups
                                                                                </div>
                                                                                <div className="bg-white p-3 rounded border">
                                                                                    <div className="flex flex-wrap gap-2">
                                                                                        {instance.SecurityGroups.map((group: any) => (
                                                                                            <Badge key={group.GroupId} variant="outline" className="text-xs">
                                                                                                {group.GroupName} ({group.GroupId})
                                                                                            </Badge>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* <Separator /> */}


                                                                            {/* Tags */}
                                                                            <div className="space-y-3">
                                                                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                    <Tag className="h-5 w-5 text-indigo-600" />
                                                                                    Tags
                                                                                </div>
                                                                                <div className="bg-white p-3 rounded border">
                                                                                    <div className="flex flex-wrap gap-2">
                                                                                        {instance.Tags.map((tag: any, index: number) => (
                                                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                                                {tag.Key}: {tag.Value}
                                                                                            </Badge>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <Separator /> */}

                                                                        {/* Storage */}
                                                                        <div className="space-y-3">
                                                                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                <HardDrive className="h-5 w-5 text-orange-600" />
                                                                                Storage
                                                                            </div>
                                                                            <div className="bg-white p-4 rounded border space-y-3">
                                                                                <div className="flex items-center justify-between pb-2 border-b">
                                                                                    <span className="text-sm font-medium text-gray-600">Root Device:</span>
                                                                                    <span className="text-sm">
                                                                                        {instance.RootDeviceName} ({instance.RootDeviceType})
                                                                                    </span>
                                                                                </div>
                                                                                {instance.BlockDeviceMappings.map((device: any, index: number) => (
                                                                                    <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                                                                        <div>
                                                                                            <span className="font-medium text-gray-600">Device:</span>
                                                                                            <div className="font-mono text-xs">{device.DeviceName}</div>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className="font-medium text-gray-600">Volume:</span>
                                                                                            <div className="font-mono text-xs">{device.Ebs.VolumeId}</div>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className="font-medium text-gray-600">Status:</span>
                                                                                            <Badge variant="outline" className="text-xs mt-1">
                                                                                                {device.Ebs.Status}
                                                                                            </Badge>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className="font-medium text-gray-600">Delete on Term:</span>
                                                                                            <Badge
                                                                                                variant={device.Ebs.DeleteOnTermination ? "destructive" : "default"}
                                                                                                className="text-xs mt-1"
                                                                                            >
                                                                                                {device.Ebs.DeleteOnTermination ? "Yes" : "No"}
                                                                                            </Badge>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        <Separator />

                                                                        {/* Metadata Options */}
                                                                        <div className="space-y-3">
                                                                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                                                                <Lock className="h-5 w-5 text-gray-600" />
                                                                                Metadata & Security Options
                                                                            </div>
                                                                            <div className="bg-white p-4 rounded border">
                                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                                                    <div className="space-y-1">
                                                                                        <span className="font-medium text-gray-600">HTTP Tokens:</span>
                                                                                        <Badge
                                                                                            variant={
                                                                                                instance.MetadataOptions.HttpTokens === "required" ? "default" : "secondary"
                                                                                            }
                                                                                            className="text-xs"
                                                                                        >
                                                                                            {instance.MetadataOptions.HttpTokens}
                                                                                        </Badge>
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <span className="font-medium text-gray-600">HTTP Endpoint:</span>
                                                                                        <Badge
                                                                                            variant={
                                                                                                instance.MetadataOptions.HttpEndpoint === "enabled" ? "default" : "secondary"
                                                                                            }
                                                                                            className="text-xs"
                                                                                        >
                                                                                            {instance.MetadataOptions.HttpEndpoint}
                                                                                        </Badge>
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <span className="font-medium text-gray-600">Boot Mode:</span>
                                                                                        <div className="text-xs">{instance.CurrentInstanceBootMode}</div>
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <span className="font-medium text-gray-600">Enclave:</span>
                                                                                        <Badge
                                                                                            variant={instance.EnclaveOptions.Enabled ? "default" : "secondary"}
                                                                                            className="text-xs"
                                                                                        >
                                                                                            {instance.EnclaveOptions.Enabled ? "Enabled" : "Disabled"}
                                                                                        </Badge>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        {instances.length === 0 && (
                                            <div className="text-center py-12 text-gray-500">
                                                <Server className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                                <p className="text-lg font-medium">No instances found</p>
                                                <p className="text-sm">No instances match your current criteria.</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )
            }
        </BasicSidebarLayout>
    );
};

export default Ec2ListingPage;