"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { Play, Square, Trash2, Cpu, Database, Shield, Calendar, Key } from "lucide-react"

export default function ComputeDashboard() {
  const ec2Data = [
    { name: "Running", value: 187, color: "#10b981" },
    { name: "Stopped", value: 6, color: "#f59e0b" },
    { name: "Terminated", value: 0, color: "#ef4444" },
  ]

  const instanceTypeData = [
    { name: "Public", value: 15, color: "#3b82f6" },
    { name: "Private", value: 178, color: "#06b6d4" },
  ]

  const lambdaLanguages = [
    { name: "C# Functions", count: 0, color: "#9333ea", icon: "C#" },
    { name: "Ruby Functions", count: 0, color: "#dc2626", icon: "💎" },
    { name: "Java Functions", count: 0, color: "#f97316", icon: "☕" },
    { name: "Golang Functions", count: 20, color: "#06b6d4", icon: "🐹" },
    { name: "Python Functions", count: 5, color: "#eab308", icon: "🐍" },
    { name: "Node.JS Functions", count: 64, color: "#22c55e", icon: "JS" },
  ]

  const invocationData = [
    { month: "October", invocations: 0 },
    { month: "November", invocations: 0 },
    { month: "December", invocations: 0 },
    { month: "January", invocations: 0 },
    { month: "February", invocations: 0 },
    { month: "March", invocations: 0 },
    { month: "April", invocations: 1000000 },
  ]

  const errorData = [
    { date: "2019-04-17", errors: 100 },
    { date: "2019-04-18", errors: 50 },
    { date: "2019-04-19", errors: 75 },
    { date: "2019-04-20", errors: 125 },
    { date: "2019-04-21", errors: 200 },
    { date: "2019-04-22", errors: 250 },
    { date: "2019-04-23", errors: 400 },
  ]

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
  ]

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
              <CardTitle className="text-sm font-medium text-gray-600">Running EC2 Instances</CardTitle>
              <Play className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">187</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Stopped EC2 Instances</CardTitle>
              <Square className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Terminated EC2 Instances</CardTitle>
              <Trash2 className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Public vs Private Instances</CardTitle>
              <CardDescription className="text-sm">Instances with Public IP Address</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="w-full h-[250px] flex items-center justify-center">
                <ChartContainer
                  config={{
                    public: { label: "Public Instances", color: "#3b82f6" },
                    private: { label: "Private Instances", color: "#06b6d4" },
                  }}
                  className="w-full h-full"
                >
                  <PieChart width={200} height={200}>
                    <Pie
                      data={instanceTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {instanceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Public Instances</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Private Instances</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amazon EC2 Instance Families */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Amazon EC2 Instance Families</CardTitle>
              <CardDescription className="text-sm">Running EC2 instances per Instance Type</CardDescription>
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
                      const angle = (index * Math.PI * 2) / instanceFamilyData.length
                      const radius = (item.count / 50) * 100 // Scale to max 100px radius
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius

                      return (
                        <div
                          key={index}
                          className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            backgroundColor: `hsl(${index * 45}, 70%, 60%)`,
                            top: `calc(50% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                          }}
                          title={`${item.family}: ${item.count}`}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-4 gap-1 mt-4 text-xs">
                {instanceFamilyData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `hsl(${index * 45}, 70%, 60%)` }}
                    />
                    <span className="text-gray-600 truncate text-[10px]">{item.family}</span>
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
                    <p className="text-xs text-gray-600">Reserved Instances</p>
                    <p className="text-xl font-bold">160</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-600">Spot Instances</p>
                    <p className="text-xl font-bold">0</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">Scheduled Instances</p>
                    <p className="text-xl font-bold">0</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Detached Elastic IP</p>
                    <p className="text-xl font-bold">0</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lambda Functions */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {lambdaLanguages.map((lang, index) => (
            <Card key={index} className={`border-l-4`} style={{ borderLeftColor: lang.color }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{lang.name}</p>
                    <p className="text-2xl font-bold text-white">{lang.count}</p>
                  </div>
                  <div className="text-2xl">{lang.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Lambda Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lambda Function Invocations */}
          <Card>
            <CardHeader>
              <CardTitle>Lambda Function Invocations</CardTitle>
              <CardDescription>The number of times functions were invoked</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  invocations: { label: "Invocations", color: "#22c55e" },
                }}
                className="h-[300px]"
              >
                <BarChart data={invocationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="invocations" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Lambda Function Errors */}
          <Card>
            <CardHeader>
              <CardTitle>Lambda Function Errors</CardTitle>
              <CardDescription>The number of executions that completed with error</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  errors: { label: "Errors", color: "#ef4444" },
                }}
                className="h-[300px]"
              >
                <LineChart data={errorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} />
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
                  <p className="text-3xl font-bold">0</p>
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
                  <p className="text-3xl font-bold">0</p>
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
                  <p className="text-3xl font-bold">0</p>
                </div>
                <Database className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">EKS Clusters</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <Shield className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
