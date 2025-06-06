"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { FolderOpen, HardDrive, Database, Calendar, Server, Layers, Activity, Cpu } from "lucide-react"

export default function StorageDashboard() {
  const s3SizeData = [
    { date: "2019-04-17", size: 331, type1: 200, type2: 131 },
    { date: "2019-04-18", size: 331, type1: 200, type2: 131 },
    { date: "2019-04-19", size: 331, type1: 200, type2: 131 },
    { date: "2019-04-20", size: 331, type1: 200, type2: 131 },
    { date: "2019-04-21", size: 331, type1: 200, type2: 131 },
    { date: "2019-04-22", size: 331, type1: 200, type2: 131 },
    { date: "2019-04-23", size: 331, type1: 200, type2: 131 },
  ]

  const s3ObjectsData = [
    { date: "2019-04-17", objects: 1500000, type1: 900000, type2: 600000 },
    { date: "2019-04-18", objects: 1500000, type1: 900000, type2: 600000 },
    { date: "2019-04-19", objects: 1500000, type1: 900000, type2: 600000 },
    { date: "2019-04-20", objects: 1500000, type1: 900000, type2: 600000 },
    { date: "2019-04-21", objects: 1500000, type1: 900000, type2: 600000 },
    { date: "2019-04-22", objects: 1500000, type1: 900000, type2: 600000 },
    { date: "2019-04-23", objects: 1500000, type1: 900000, type2: 600000 },
  ]

  const cloudWatchLogsData = [
    { date: "2019-04-17", volume: 50 },
    { date: "2019-04-18", volume: 150 },
    { date: "2019-04-19", volume: 300 },
    { date: "2019-04-20", volume: 400 },
    { date: "2019-04-21", volume: 450 },
    { date: "2019-04-22", volume: 600 },
    { date: "2019-04-23", volume: 750 },
  ]

  const ebsVolumeTypes = [
    { name: "gp2", value: 85, color: "#3b82f6" },
    { name: "io1", value: 15, color: "#06b6d4" },
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
              <div className="text-3xl font-bold">81</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">S3 Size</CardTitle>
              <HardDrive className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1003 GB</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">S3 Objects</CardTitle>
              <Database className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.88 M</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Empty Buckets</CardTitle>
              <FolderOpen className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">17</div>
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
                <div className="text-3xl font-bold">193</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">EBS used</CardTitle>
                <HardDrive className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">193</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">EBS Size</CardTitle>
                <Database className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">53 GB</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Logs Retention Period</CardTitle>
                <Calendar className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">30 days</div>
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
              <div className="text-3xl font-bold">5</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">RDS Instances</CardTitle>
              <Server className="h-5 w-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">DocDB Instances</CardTitle>
              <Database className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">9</div>
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
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
