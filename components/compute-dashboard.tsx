"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";
import {
   Bar,
   BarChart,
   CartesianGrid,
   XAxis,
   YAxis,
   PieChart,
   Pie,
   Cell,
   LineChart,
   Line,
} from "recharts";
import {
   Play,
   Square,
   Trash2,
   Cpu,
   Database,
   Shield,
   Calendar,
   Key,
   FileBox,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingPage from "./loading";
import { fetch_compute } from "@/services/compute";
import {
   fetch_ecs_clusters,
   fetch_ecs_services,
   fetch_ecs_tasks,
} from "@/services/ecs";

export default function ComputeDashboard() {
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState("");
   const [computeData, setComputeData] = useState(null);
   const [totalInstances, setTotalInstances] = useState(0);
   const [runningInstances, setRunningInstances] = useState(0);
   const [stoppedInstances, setStoppedInstances] = useState(0);
   const [terminatedInstances, setTerminatedInstances] = useState(0);

   // charts
   const [publicInstances, setPublicInstances] = useState(0);
   const [privateInstances, setPrivateInstances] = useState(0);

   const [ecsClusters, setEcsClusters] = useState([]);
   const [clusterArns, setClusterArns] = useState(null);
   const [ecsServices, setEcsServices] = useState([]);
   const [ecsTasks, setEcsTasks] = useState<{ totalTasks?: number } | null>(
      null
   );
   useEffect(() => {
      const fetch_compute_data = async () => {
         try {
            setError("Data Fetching Error...");
            const response = await fetch_compute();
            const response2 = await fetch_ecs_clusters();
            // Use the first clusterArn from the clusters list if available
            const clusterArn =
               response2 && response2.length > 0 ? response2[0] : undefined;
            setClusterArns(response2); // still setting the full list

            // Fetch ECS services only if a clusterArn is available
            let response3 = null;
            let response4 = null;
            if (clusterArn) {
               response3 = await fetch_ecs_services(clusterArn);
               response4 = await fetch_ecs_tasks(clusterArn);
               console.log("ECS Services:", response3);
            }
            setEcsTasks(response4 || 0);
            setEcsServices(response3 || []);
            setEcsClusters(response2.length);
            setComputeData(response);
            if (response) {
               setTotalInstances(response.totalInstances || 0);
               setRunningInstances(response.runningInstances || 0);
               setStoppedInstances(response.stoppedInstances || 0);
               setTerminatedInstances(response.terminatedInstances || 0);
               setPublicInstances(response.publicInstances || 0);
               setPrivateInstances(response.privateInstances || 0);
            } else {
               setError("No Compute Data Available");
            }
         } catch (error) {
            setError(
               "Failed to load Compute Data. Please check your credentials and try again."
            );
            console.error("Error fetching compute data:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetch_compute_data();

      return () => {
         setComputeData(null);
      };
   }, []);

   if (isLoading) return <LoadingPage />;

   console.log("Compute Data", ecsTasks);

   // const ec2Data = [
   //   { name: "Running", value: 187, color: "#10b981" },
   //   { name: "Stopped", value: 6, color: "#f59e0b" },
   //   { name: "Terminated", value: 0, color: "#ef4444" },
   // ]

   const instanceTypeData = [
      { name: "Public", value: publicInstances, color: "#3b82f6" },
      { name: "Private", value: privateInstances, color: "#06b6d4" },
   ];

   const invocationData = [
      { month: "November", invocations: 1 },
      { month: "December", invocations: 12 },
      { month: "January", invocations: 23 },
      { month: "February", invocations: 29 },
      { month: "March", invocations: 17 },
      { month: "April", invocations: 35 },
      { month: "May", invocations: 5 },
      { month: "June", invocations: 52 },
   ];

   const errorData = [
      { date: "2025-06-05", errors: 2 },
      { date: "2025-06-06", errors: 7 },
      { date: "2025-06-07", errors: 0 },
      { date: "2025-06-08", errors: 1 },
      { date: "2025-06-09", errors: 11 },
      { date: "2025-06-10", errors: 9 },
      { date: "2025-06-11", errors: 13 },
   ];

   const instanceFamilyData = [
      { family: "c5.4xlarge", count: 45 },
      { family: "c5.2xlarge", count: 32 },
      { family: "c5.xlarge", count: 28 },
      { family: "c5.large", count: 25 },
      { family: "r4.4xlarge", count: 20 },
      { family: "r4.2xlarge", count: 18 },
      { family: "t3.medium", count: 15 },
      { family: "t3.large", count: 12 },
      { family: "m5.2xlarge", count: 10 },
   ];

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900">Compute</h1>
            </div>

            {/* EC2 Instance Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium text-gray-600">
                        Total EC2 Instances
                     </CardTitle>
                     <FileBox className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold">{totalInstances}</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium text-gray-600">
                        Running EC2 Instances
                     </CardTitle>
                     <Play className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold">
                        {runningInstances}
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium text-gray-600">
                        Stopped EC2 Instances
                     </CardTitle>
                     <Square className="h-5 w-5 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold">
                        {stoppedInstances}
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium text-gray-600">
                        Terminated EC2 Instances
                     </CardTitle>
                     <Trash2 className="h-5 w-5 text-red-500" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold">
                        {terminatedInstances}
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <Card className="lg:col-span-1">
                  <CardHeader>
                     <CardTitle className="text-base">
                        Public vs Private Instances
                     </CardTitle>
                     <CardDescription className="text-sm">
                        Instances with Public IP Address
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                     <div className="w-full h-[250px] flex items-center justify-center">
                        <ChartContainer
                           config={{
                              public: {
                                 label: "Public Instances",
                                 color: "#3b82f6",
                              },
                              private: {
                                 label: "Private Instances",
                                 color: "#06b6d4",
                              },
                           }}
                           className="w-full h-full">
                           <PieChart width={200} height={200}>
                              <Pie
                                 data={instanceTypeData}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={40}
                                 outerRadius={80}
                                 dataKey="value"
                                 startAngle={90}
                                 endAngle={450}>
                                 {instanceTypeData.map((entry, index) => (
                                    <Cell
                                       key={`cell-${index}`}
                                       fill={entry.color}
                                    />
                                 ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                           </PieChart>
                        </ChartContainer>
                     </div>
                     <div className="flex justify-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                           <span className="text-xs text-gray-600">
                              Public Instances
                           </span>
                        </div>
                        <div className="flex items-center space-x-1">
                           <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                           <span className="text-xs text-gray-600">
                              Private Instances
                           </span>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Amazon EC2 Instance Families */}
               <Card className="lg:col-span-2">
                  <CardHeader>
                     <CardTitle className="text-base">
                        Amazon EC2 Instance Families
                     </CardTitle>
                     <CardDescription className="text-sm">
                        Running EC2 instances per Instance Type
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                     <div className="w-full h-[250px] relative">
                        {/* Custom simple graph visualization */}
                        <div className="w-full h-full flex items-center justify-center">
                           <div className="relative w-[200px] h-[200px]">
                              {/* Concentric circles */}
                              {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                                 <div
                                    key={i}
                                    className="absolute border border-gray-200 rounded-full"
                                    style={{
                                       width: `${scale * 100}%`,
                                       height: `${scale * 100}%`,
                                       top: `${(1 - scale) * 50}%`,
                                       left: `${(1 - scale) * 50}%`,
                                    }}
                                 />
                              ))}

                              {/* Center point */}
                              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

                              {/* Data points */}
                              {instanceFamilyData.map((item, index) => {
                                 const angle =
                                    (index * Math.PI * 2) /
                                    instanceFamilyData.length;
                                 const radius = (item.count / 50) * 100; // Scale to max 100px radius
                                 const x = Math.cos(angle) * radius;
                                 const y = Math.sin(angle) * radius;

                                 return (
                                    <div
                                       key={index}
                                       className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                                       style={{
                                          backgroundColor: `hsl(${
                                             index * 45
                                          }, 70%, 60%)`,
                                          top: `calc(50% + ${y}px)`,
                                          left: `calc(50% + ${x}px)`,
                                       }}
                                       title={`${item.family}: ${item.count}`}
                                    />
                                 );
                              })}
                           </div>
                        </div>
                     </div>

                     {/* Legend */}
                     <div className="grid grid-cols-4 gap-1 mt-4 text-xs">
                        {instanceFamilyData.map((item, index) => (
                           <div
                              key={index}
                              className="flex items-center space-x-1">
                              <div
                                 className="w-2 h-2 rounded-full flex-shrink-0"
                                 style={{
                                    backgroundColor: `hsl(${
                                       index * 45
                                    }, 70%, 60%)`,
                                 }}
                              />
                              <span className="text-gray-600 truncate text-[10px]">
                                 {item.family}
                              </span>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               {/* Instance Status Sidebar */}
               <Card className="lg:col-span-1">
                  <CardContent className="p-4 space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Cpu className="h-5 w-5 text-amber-500" />
                           <div>
                              <p className="text-xs text-gray-600">
                                 Reserved Instances
                              </p>
                              <p className="text-xl font-bold">1</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Shield className="h-5 w-5 text-yellow-500" />
                           <div>
                              <p className="text-xs text-gray-600">
                                 Spot Instances
                              </p>
                              <p className="text-xl font-bold">0</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Calendar className="h-5 w-5 text-orange-500" />
                           <div>
                              <p className="text-xs text-gray-600">
                                 Scheduled Instances
                              </p>
                              <p className="text-xl font-bold">0</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Key className="h-5 w-5 text-gray-500" />
                           <div>
                              <p className="text-xs text-gray-600">
                                 Detached Elastic IP
                              </p>
                              <p className="text-xl font-bold">4</p>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Lambda Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Lambda Function Invocations */}
               <Card>
                  <CardHeader>
                     <CardTitle>Lambda Function Invocations</CardTitle>
                     <CardDescription>
                        The number of times functions were invoked
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ChartContainer
                        config={{
                           invocations: {
                              label: "Invocations",
                              color: "#22c55e",
                           },
                        }}
                        className="h-[300px]">
                        <BarChart data={invocationData}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="month" />
                           <YAxis />
                           <ChartTooltip content={<ChartTooltipContent />} />
                           <Bar
                              dataKey="invocations"
                              fill="#22c55e"
                              radius={[4, 4, 0, 0]}
                           />
                        </BarChart>
                     </ChartContainer>
                  </CardContent>
               </Card>

               {/* Lambda Function Errors */}
               <Card>
                  <CardHeader>
                     <CardTitle>Lambda Function Errors</CardTitle>
                     <CardDescription>
                        The number of executions that completed with error
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ChartContainer
                        config={{
                           errors: { label: "Errors", color: "#ef4444" },
                        }}
                        className="h-[300px]">
                        <LineChart data={errorData}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="date" />
                           <YAxis />
                           <ChartTooltip content={<ChartTooltipContent />} />
                           <Line
                              type="monotone"
                              dataKey="errors"
                              stroke="#ef4444"
                              strokeWidth={2}
                           />
                        </LineChart>
                     </ChartContainer>
                  </CardContent>
               </Card>
            </div>

            {/* ECS/EKS Services */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <Card className="bg-blue-600 text-white">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm opacity-90">ECS Clusters</p>
                           <p className="text-3xl font-bold">{ecsClusters}</p>
                        </div>
                        <Database className="h-8 w-8 opacity-80" />
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-blue-600 text-white">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm opacity-90">ECS Tasks</p>
                           <p className="text-3xl font-bold">
                              {ecsTasks?.totalTasks ?? 0}
                           </p>
                        </div>
                        <Database className="h-8 w-8 opacity-80" />
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-blue-600 text-white">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm opacity-90">ECS Services</p>
                           <p className="text-3xl font-bold">
                              {ecsServices.length}
                           </p>
                        </div>
                        <Database className="h-8 w-8 opacity-80" />
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
