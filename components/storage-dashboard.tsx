"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { FolderOpen, HardDrive, Database, Calendar, Server, Layers, Activity, Cpu } from "lucide-react"
import { useEffect, useState } from "react"
import { fetch_all_storage } from "@/services/storage"
import LoadingPage from "@/components/loading";
import { set } from "zod"

export default function StorageDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [storage, setStorage] = useState([]); // all storage data
  const [totalBukets, setTotalBuckets] = useState(0); // no of buckets
  const [totalSize, setTotalSize] = useState(0); // total size of buckets
  const [totalObjects, setTotalObjects] = useState(0); // no of objects in buckets
  const [emptyBuckets, setEmptyBuckets] = useState(0); // no of empty buckets

  const [ebsTotal, setEbsTotal] = useState();
  const [ebsUsed, setEbsUsed] = useState();
  const [ebsSize, setEbsSize] = useState();
  
  const [s3SizeData, setS3SizeData] = useState([]); // chart data for S3 size
  const [s3ObjectsData, setS3ObjectsData] = useState([]); // chart data for S3 objects
  type EBSVolumeType = { name: string; value: number; color: string };
  const [ebsVolumeTypes, setEbsVolumeTypes] = useState<EBSVolumeType[]>([]); // chart data for EBS volume types
useEffect(() => {
  const fetch_storage_data = async () => {
    try {
      setIsLoading(true);
      setError('Data Fetching Error...');

      const response = await fetch_all_storage();
      if (!response) throw new Error('Failed to fetch Storage data');

      setStorage(response);
      setTotalBuckets(response.totalBuckets);
      setTotalSize(response.totalSize);
      setTotalObjects(response.totalObjects);
      setEmptyBuckets(response.emptyBuckets);

      setEbsTotal(response.totalEBSVolumes);
      setEbsUsed(response.totalEBSUsed);
      setEbsSize(response.totalEBSSize);

      // NEW - fill chart data from response
      if (response.s3SizeData) setS3SizeData(response.s3SizeData);
      if (response.s3ObjectsData) setS3ObjectsData(response.s3ObjectsData);
      if (response.ebsVolumeTypes) setEbsVolumeTypes(response.ebsVolumeTypes);

    } catch (err) {
      setError('Failed to load Storage Data. Please check your credentials and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  fetch_storage_data();

  return () => {
    setStorage([]);
  };
}, []);
  if (isLoading) return <LoadingPage />;
  //console.log("Storage Data:", totalBukets);
  // const s3SizeData = [
  //   { date: "2019-04-17", size: 331, type1: 200, type2: 131 },
  //   { date: "2019-04-18", size: 331, type1: 200, type2: 131 },
  //   { date: "2019-04-19", size: 331, type1: 200, type2: 131 },
  //   { date: "2019-04-20", size: 331, type1: 200, type2: 131 },
  //   { date: "2019-04-21", size: 331, type1: 200, type2: 131 },
  //   { date: "2019-04-22", size: 331, type1: 200, type2: 131 },
  //   { date: "2019-04-23", size: 331, type1: 200, type2: 131 },
  // ]

  // const s3ObjectsData = [
  //   { date: "2019-04-17", objects: 1500000, type1: 900000, type2: 600000 },
  //   { date: "2019-04-18", objects: 1500000, type1: 900000, type2: 600000 },
  //   { date: "2019-04-19", objects: 1500000, type1: 900000, type2: 600000 },
  //   { date: "2019-04-20", objects: 1500000, type1: 900000, type2: 600000 },
  //   { date: "2019-04-21", objects: 1500000, type1: 900000, type2: 600000 },
  //   { date: "2019-04-22", objects: 1500000, type1: 900000, type2: 600000 },
  //   { date: "2019-04-23", objects: 1500000, type1: 900000, type2: 600000 },
  // ]
  // const ebsVolumeTypes = [
  //   { name: "gp2", value: 85, color: "#3b82f6" },
  //   { name: "io1", value: 15, color: "#06b6d4" },
  // ]
  const cloudWatchLogsData = [
    { date: "2025-04-17", volume: 2 },
    { date: "2025-04-18", volume: 0 },
    { date: "2025-04-19", volume: 0 },
    { date: "2025-04-20", volume: 0 },
    { date: "2025-04-21", volume: 31 },
    { date: "2025-04-22", volume: 0 },
    { date: "2025-04-23", volume: 10 },
    { date: "2025-04-23", volume: 17 },
    { date: "2025-04-23", volume: 29 },
    {date: "2025-04-23", volume: 11 },
  ]



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Storage</h1>
        </div>

        {/* S3 Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">S3 Buckets</CardTitle>
              <FolderOpen className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBukets}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">S3 Size</CardTitle>
              <HardDrive className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalSize >= 1e9
                  ? `${(totalSize / 1e9).toFixed(2)} GB`
                  : `${(totalSize / 1e6).toFixed(2)} MB`}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">S3 Objects</CardTitle>
              <Database className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalObjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Empty Buckets</CardTitle>
              <FolderOpen className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{emptyBuckets}</div>
            </CardContent>
          </Card>
        </div>

        {/* S3 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* S3 Buckets Size */}
          <Card>
            <CardHeader>
              <CardTitle>S3 Buckets Size</CardTitle>
              <CardDescription>Total size of S3 buckets per AWS Region</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  type1: { label: "Region 1", color: "#3b82f6" },
                  type2: { label: "Region 2", color: "#06b6d4" },
                }}
                className="h-[300px]"
              >
                <BarChart data={s3SizeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="type1" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="type2" stackId="a" fill="#06b6d4" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* S3 Buckets Objects */}
          <Card>
            <CardHeader>
              <CardTitle>S3 Buckets Objects</CardTitle>
              <CardDescription>Number of Objects per AWS Region</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  type1: { label: "Region 1", color: "#3b82f6" },
                  type2: { label: "Region 2", color: "#06b6d4" },
                }}
                className="h-[300px]"
              >
                <BarChart data={s3ObjectsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="type1" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="type2" stackId="a" fill="#06b6d4" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* EBS and Storage Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* EBS Metrics */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">EBS Total</CardTitle>
                <HardDrive className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ebsTotal}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">EBS used</CardTitle>
                <HardDrive className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ebsUsed}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">EBS Size</CardTitle>
                <Database className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ebsSize} GB</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Logs Retention Period</CardTitle>
                <Calendar className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">11 days</div>
              </CardContent>
            </Card>
          </div>

          {/* Amazon EBS Volume Types */}
          <Card>
            <CardHeader>
              <CardTitle>Amazon EBS Volume Types</CardTitle>
              <CardDescription>Usage of EBS volume types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px] flex items-center justify-center">
                <ChartContainer
                  config={{
                    gp2: { label: "gp2", color: "#3b82f6" },
                    io1: { label: "io1", color: "#06b6d4" },
                  }}
                  className="w-full h-full"
                >
                  <PieChart width={200} height={200}>
                    <Pie data={ebsVolumeTypes} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {ebsVolumeTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">gp2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">io1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for additional content */}
          <div></div>
        </div>

        {/* CloudWatch Logs Volume */}
        <Card>
          <CardHeader>
            <CardTitle>CloudWatch Logs Volume</CardTitle>
            <CardDescription>The number of log events uploaded to CloudWatch Logs</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                volume: { label: "Volume", color: "#3b82f6" },
              }}
              className="h-[300px]"
            >
              <BarChart data={cloudWatchLogsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Database Services */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">DynamoDB Tables</CardTitle>
              <Layers className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">RDS Instances</CardTitle>
              <Server className="h-5 w-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">DocDB Instances</CardTitle>
              <Database className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Redshift Clusters</CardTitle>
              <Activity className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Cache Clusters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Memcached Clusters</CardTitle>
              <Cpu className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Redis Clusters</CardTitle>
              <Cpu className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
