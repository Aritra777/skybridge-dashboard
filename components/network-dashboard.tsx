"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis } from "recharts"
import { Network, Shield, Table2, ArrowLeftRight, Globe, Database, Server } from "lucide-react"

export default function NetworkDashboard() {
  // CloudFront Incoming Requests data
  const cloudFrontData = [
    { date: "Nov 13", requests: 500000 },
    { date: "Nov 20", requests: 6500000 },
    { date: "Nov 27", requests: 1500000 },
    { date: "Dec 03", requests: 800000 },
    { date: "Dec 10", requests: 600000 },
    { date: "Dec 17", requests: 500000 },
    { date: "Dec 23", requests: 400000 },
    { date: "Dec 30", requests: 500000 },
    { date: "Jan 06", requests: 600000 },
    { date: "Jan 12", requests: 700000 },
    { date: "Jan 19", requests: 800000 },
    { date: "Jan 26", requests: 1000000 },
    { date: "Feb 01", requests: 1800000 },
    { date: "Feb 08", requests: 1600000 },
    { date: "Feb 15", requests: 1500000 },
    { date: "Feb 21", requests: 1400000 },
    { date: "Feb 28", requests: 1300000 },
    { date: "Mar 06", requests: 1200000 },
    { date: "Mar 13", requests: 1100000 },
    { date: "Mar 20", requests: 1000000 },
    { date: "Mar 27", requests: 900000 },
    { date: "Apr 02", requests: 1000000 },
    { date: "Apr 09", requests: 1100000 },
    { date: "Apr 16", requests: 900000 },
    { date: "Apr 22", requests: 1000000 },
  ]

  // API Gateway Requests data
  const apiGatewayData = [
    { date: "Mar 01", requests: 500000 },
    { date: "Mar 08", requests: 1000000 },
    { date: "Mar 15", requests: 800000 },
    { date: "Mar 22", requests: 1200000 },
    { date: "Mar 29", requests: 700000 },
    { date: "Apr 06", requests: 2000000 },
    { date: "Apr 13", requests: 1500000 },
    { date: "Apr 21", requests: 1800000 },
  ]

  // Elastic Load Balancers data
  const elbData = [
    { date: "Nov 13", requests: 8000000 },
    { date: "Nov 20", requests: 5000000 },
    { date: "Nov 27", requests: 10000000 },
    { date: "Dec 03", requests: 8000000 },
    { date: "Dec 10", requests: 6000000 },
    { date: "Dec 17", requests: 4000000 },
    { date: "Dec 23", requests: 3000000 },
    { date: "Dec 30", requests: 2000000 },
    { date: "Jan 06", requests: 3000000 },
    { date: "Jan 12", requests: 4000000 },
    { date: "Jan 19", requests: 3000000 },
    { date: "Jan 26", requests: 2000000 },
    { date: "Feb 01", requests: 3000000 },
    { date: "Feb 08", requests: 4000000 },
    { date: "Feb 15", requests: 5000000 },
    { date: "Feb 21", requests: 7000000 },
    { date: "Feb 28", requests: 8000000 },
    { date: "Mar 06", requests: 9000000 },
    { date: "Mar 13", requests: 10000000 },
    { date: "Mar 20", requests: 15000000 },
    { date: "Mar 27", requests: 8000000 },
    { date: "Apr 02", requests: 20000000 },
    { date: "Apr 09", requests: 18000000 },
    { date: "Apr 16", requests: 12000000 },
    { date: "Apr 22", requests: 10000000 },
  ]

  // Load Balancer Types data
  const lbTypesData = [
    { name: "application", value: 15, color: "#3b82f6" },
    { name: "classic", value: 85, color: "#06b6d4" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Network</h1>
        </div>

        {/* Network Metrics - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">VPC</CardTitle>
              <Network className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">21</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Subnets</CardTitle>
              <Shield className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">79</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">CDN Distributions</CardTitle>
              <Globe className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">32</div>
            </CardContent>
          </Card>
        </div>

        {/* Network Metrics - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">ACL</CardTitle>
              <Shield className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">21</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Route Tables</CardTitle>
              <Table2 className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Today Incoming Requests</CardTitle>
              <ArrowLeftRight className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">79.91 K / 1.19 M</div>
            </CardContent>
          </Card>
        </div>

        {/* CloudFront Incoming Requests Chart */}
        <Card>
          <CardHeader>
            <CardTitle>CloudFront Incoming Requests</CardTitle>
            <CardDescription>Incoming requests over the last 6 months per distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                requests: { label: "Requests", color: "#9333ea" },
              }}
              className="h-[300px]"
            >
              <LineChart data={cloudFrontData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* API Gateway and RESTful APIs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Gateway Requests Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>API Gateway Requests</CardTitle>
              <CardDescription>Incoming requests over the last 6 months per API Gateway</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  requests: { label: "Requests", color: "#06b6d4" },
                }}
                className="h-[300px]"
              >
                <LineChart data={apiGatewayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* API Metrics */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">RESTful APIs</CardTitle>
                <Database className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">17</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Today Incoming Requests</CardTitle>
                <ArrowLeftRight className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">114.69 K / 1.38 M</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Elastic Load Balancers Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Elastic Load Balancers</CardTitle>
            <CardDescription>Incoming requests over the last 6 months per AWS Region</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                requests: { label: "Requests", color: "#10b981" },
              }}
              className="h-[300px]"
            >
              <LineChart data={elbData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Load Balancer Metrics and Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Load Balancer Metrics */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Elastic Load Balancers</CardTitle>
                <Server className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">46</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Today Incoming Requests</CardTitle>
                <ArrowLeftRight className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">214.97 K / 3.92 M</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Route53 Domain Names</CardTitle>
                <Globe className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">32</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Route53 A Records</CardTitle>
                <Database className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">155</div>
              </CardContent>
            </Card>
          </div>

          {/* Load Balancer Types */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Load Balancer Types</CardTitle>
              <CardDescription>Deployed Load Balancer per Type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px] flex items-center justify-center">
                <ChartContainer
                  config={{
                    application: { label: "Application", color: "#3b82f6" },
                    classic: { label: "Classic", color: "#06b6d4" },
                  }}
                  className="w-full h-full"
                >
                  <PieChart width={300} height={300}>
                    <Pie
                      data={lbTypesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {lbTypesData.map((entry, index) => (
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
                  <span className="text-sm text-gray-600">application</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">classic</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
