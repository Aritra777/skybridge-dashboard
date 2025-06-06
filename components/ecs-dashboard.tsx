"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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
  AreaChart,
  Area,
} from "recharts"
import { Server, Activity, Cpu, MemoryStick, Network, Container } from "lucide-react"

export default function EcsDashboard() {
  // CPU Utilization over time
  const cpuUtilizationData = [
    { time: "00:00", utilization: 45 },
    { time: "04:00", utilization: 52 },
    { time: "08:00", utilization: 68 },
    { time: "12:00", utilization: 75 },
    { time: "16:00", utilization: 82 },
    { time: "20:00", utilization: 65 },
    { time: "24:00", utilization: 48 },
  ]

  // Memory Utilization over time
  const memoryUtilizationData = [
    { time: "00:00", utilization: 38 },
    { time: "04:00", utilization: 42 },
    { time: "08:00", utilization: 58 },
    { time: "12:00", utilization: 72 },
    { time: "16:00", utilization: 78 },
    { time: "20:00", utilization: 61 },
    { time: "24:00", utilization: 44 },
  ]

  // Task count trends
  const taskTrendsData = [
    { date: "Mon", running: 45, pending: 3, stopped: 2 },
    { date: "Tue", running: 48, pending: 2, stopped: 1 },
    { date: "Wed", running: 52, pending: 4, stopped: 3 },
    { date: "Thu", running: 47, pending: 1, stopped: 2 },
    { date: "Fri", running: 55, pending: 2, stopped: 1 },
    { date: "Sat", running: 42, pending: 1, stopped: 1 },
    { date: "Sun", running: 38, pending: 2, stopped: 2 },
  ]

  // Launch type distribution
  const launchTypeData = [
    { name: "Fargate", value: 65, color: "#3b82f6" },
    { name: "EC2", value: 35, color: "#06b6d4" },
  ]

  // Service status distribution
  const serviceStatusData = [
    { name: "Active", value: 28, color: "#10b981" },
    { name: "Draining", value: 3, color: "#f59e0b" },
    { name: "Inactive", value: 2, color: "#ef4444" },
  ]

  // Instance types distribution
  const instanceTypesData = [
    { type: "t3.medium", count: 12 },
    { type: "t3.large", count: 8 },
    { type: "m5.large", count: 6 },
    { type: "c5.large", count: 4 },
    { type: "r5.large", count: 3 },
  ]

  // Network I/O data
  const networkData = [
    { time: "00:00", inbound: 120, outbound: 85 },
    { time: "04:00", inbound: 95, outbound: 72 },
    { time: "08:00", inbound: 180, outbound: 145 },
    { time: "12:00", inbound: 220, outbound: 185 },
    { time: "16:00", inbound: 195, outbound: 165 },
    { time: "20:00", inbound: 155, outbound: 125 },
    { time: "24:00", inbound: 110, outbound: 88 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Amazon ECS Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your containerized applications and services</p>
        </div>

        {/* Cluster Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Clusters</CardTitle>
              <Server className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-gray-500 mt-1">2 Fargate, 6 EC2</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Running Services</CardTitle>
              <Activity className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">33</div>
              <p className="text-xs text-gray-500 mt-1">28 active, 5 updating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Running Tasks</CardTitle>
              <Container className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">156</div>
              <p className="text-xs text-gray-500 mt-1">3 pending, 2 stopped</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Container Instances</CardTitle>
              <Server className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-gray-500 mt-1">22 active, 2 draining</p>
            </CardContent>
          </Card>
        </div>

        {/* Resource Utilization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CPU Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-blue-500" />
                CPU Utilization
              </CardTitle>
              <CardDescription>Average CPU usage across all clusters (24h)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  utilization: { label: "CPU %", color: "#3b82f6" },
                }}
                className="h-[300px]"
              >
                <AreaChart data={cpuUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="utilization" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Memory Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MemoryStick className="h-5 w-5 text-green-500" />
                Memory Utilization
              </CardTitle>
              <CardDescription>Average memory usage across all clusters (24h)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  utilization: { label: "Memory %", color: "#10b981" },
                }}
                className="h-[300px]"
              >
                <AreaChart data={memoryUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="utilization" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Task Trends and Launch Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Trends */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Task Status Trends</CardTitle>
              <CardDescription>Task counts over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  running: { label: "Running", color: "#10b981" },
                  pending: { label: "Pending", color: "#f59e0b" },
                  stopped: { label: "Stopped", color: "#ef4444" },
                }}
                className="h-[300px]"
              >
                <BarChart data={taskTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="running" fill="#10b981" />
                  <Bar dataKey="pending" fill="#f59e0b" />
                  <Bar dataKey="stopped" fill="#ef4444" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Launch Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Launch Type Distribution</CardTitle>
              <CardDescription>Fargate vs EC2 usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[200px] flex items-center justify-center">
                <ChartContainer
                  config={{
                    fargate: { label: "Fargate", color: "#3b82f6" },
                    ec2: { label: "EC2", color: "#06b6d4" },
                  }}
                  className="w-full h-full"
                >
                  <PieChart width={200} height={200}>
                    <Pie
                      data={launchTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {launchTypeData.map((entry, index) => (
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
                  <span className="text-sm text-gray-600">Fargate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">EC2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status and Instance Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Status */}
          <Card>
            <CardHeader>
              <CardTitle>Service Status Distribution</CardTitle>
              <CardDescription>Current status of all ECS services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px] flex items-center justify-center">
                <ChartContainer
                  config={{
                    active: { label: "Active", color: "#10b981" },
                    draining: { label: "Draining", color: "#f59e0b" },
                    inactive: { label: "Inactive", color: "#ef4444" },
                  }}
                  className="w-full h-full"
                >
                  <PieChart width={250} height={250}>
                    <Pie
                      data={serviceStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {serviceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Instance Types */}
          <Card>
            <CardHeader>
              <CardTitle>EC2 Instance Types</CardTitle>
              <CardDescription>Distribution of instance types in EC2 clusters</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: { label: "Count", color: "#8b5cf6" },
                }}
                className="h-[250px]"
              >
                <BarChart data={instanceTypesData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Network I/O */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-cyan-500" />
              Network I/O
            </CardTitle>
            <CardDescription>Inbound and outbound network traffic (MB/s)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                inbound: { label: "Inbound", color: "#06b6d4" },
                outbound: { label: "Outbound", color: "#8b5cf6" },
              }}
              className="h-[300px]"
            >
              <LineChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="inbound" stroke="#06b6d4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="outbound" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Task Definitions</CardTitle>
              <Container className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">47</div>
              <p className="text-xs text-gray-500 mt-1">12 active revisions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Load Balancers</CardTitle>
              <Activity className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-gray-500 mt-1">All healthy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Auto Scaling Groups</CardTitle>
              <Server className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6</div>
              <p className="text-xs text-gray-500 mt-1">2 scaling events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Service Discoveries</CardTitle>
              <Network className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <p className="text-xs text-gray-500 mt-1">Cloud Map enabled</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
