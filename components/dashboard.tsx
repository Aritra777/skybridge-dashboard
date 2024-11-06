'use client'
import Image from 'next/image'
import { Bell, ChevronDown, Globe, HelpCircle, Package } from 'lucide-react'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import cimage from '../components/image/SkyBridge.svg'
//import colimage from '../components/image/favicon.ico'
export function Dashboardui() {
  const [groupBy, setGroupBy] = useState('Cloud provider')

  // Function to handle change in dropdown
  const handleGroupByChange = (value: string) => {
    setGroupBy(value)
  }
  const [timeRange, setTimeRange] = useState('Last 6 months')
  const [viewType, setViewType] = useState('Monthly')

  const sixMonthCostData = [
    { month: 'Jan', Sandbox: 70, Production: 40, AWS: 10, QA: 35, 'Cost 50+': 25 },
    { month: 'Feb', Sandbox: 20, Production: 20, AWS: 20, QA: 20, 'Cost 50+': 15 },
    { month: 'Mar', Sandbox: 15, Production: 25, AWS: 25, QA: 25, 'Cost 50+': 20 },
    { month: 'Apr', Sandbox: 35, Production: 15, AWS: 30, QA: 20, 'Cost 50+': 35 },
    { month: 'May', Sandbox: 25, Production: 35, AWS: 10, QA: 30, 'Cost 50+': 15 },
    { month: 'Jun', Sandbox: 45, Production: 15, AWS: 35, QA: 25, 'Cost 50+': 10 },
  ]

  const yearCostData = [
    // Extend to 12 months for "Last year" data
    ...sixMonthCostData,
    { month: 'Jul', Sandbox: 30, Production: 20, AWS: 15, QA: 40, 'Cost 50+': 20 },
    { month: 'Aug', Sandbox: 50, Production: 10, AWS: 25, QA: 15, 'Cost 50+': 25 },
    { month: 'Sep', Sandbox: 35, Production: 25, AWS: 30, QA: 20, 'Cost 50+': 30 },
    { month: 'Oct', Sandbox: 40, Production: 30, AWS: 20, QA: 35, 'Cost 50+': 20 },
    { month: 'Nov', Sandbox: 25, Production: 20, AWS: 25, QA: 30, 'Cost 50+': 25 },
    { month: 'Dec', Sandbox: 30, Production: 40, AWS: 15, QA: 20, 'Cost 50+': 35 },
  ]

  const resourcesData = [
    { name: 'Amazon Web Services', value: 450, color: '#FF9900' },
    { name: 'Microsoft Azure', value: 150, color: '#00A4EF' },
    { name: 'OVH', value: 100, color: '#123F6D' },
    { name: 'Google Cloud Platform', value: 150, color: '#4285F4' },
    { name: 'DigitalOcean', value: 100, color: '#0080FF' },
  ]
  const regionData = [
    { name: 'North America West', value: 250, color: '#FF9900' },
    { name: 'North America East', value: 200, color: '#00A4EF' },
    { name: 'Europe West', value: 150, color: '#123F6D' },
    { name: 'Asia East', value: 120, color: '#4285F4' },
    { name: 'Asia Pacific', value: 180, color: '#0080FF' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      <Image
        src={cimage}
        width={40}
        height={40}
        alt="Picture of the author"
      />
        <nav className="flex gap-4">
          <Button variant="ghost" className="font-semibold">
            SkyBridge
          </Button>
          <Button variant="ghost">Inventory</Button>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button variant="outline">Leave feedback</Button>
          <Button>Join our Discord</Button>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard overview</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cloud accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Active cloud provider accounts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Regions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Active cloud regions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">580</div>
              <p className="text-xs text-muted-foreground">
                Total cloud resources
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$500.00</div>
              <p className="text-xs text-green-500">+2.1% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Cloud map</CardTitle>
              <CardDescription>
                Analyze which regions have active resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[300px] w-full bg-background">
                {/* World Map Background */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative h-full w-full">
                    {/* Base map - using dots for continents */}
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 20 }).map((_, i) => (
                        Array.from({ length: 40 }).map((_, j) => (
                          <div
                            key={`${i}-${j}`}
                            className="absolute h-1 w-1 rounded-full bg-muted-foreground"
                            style={{
                              left: `${(j * 100) / 40}%`,
                              top: `${(i * 100) / 20}%`,
                            }}
                          />
                        ))
                      ))}
                    </div>

                    {/* Active Regions with glow effect */}
                    {[
                      { x: 20, y: 30, name: 'North America West' },
                      { x: 30, y: 40, name: 'North America East' },
                      { x: 45, y: 25, name: 'Europe West' },
                      { x: 60, y: 35, name: 'Asia East' },
                      { x: 70, y: 45, name: 'Asia Pacific' },
                      { x: 35, y: 60, name: 'South America East' },
                      { x: 75, y: 65, name: 'Australia' },
                    ].map((region, index) => (
                      <div
                        key={index}
                        className="absolute flex items-center justify-center"
                        style={{
                          left: `${region.x}%`,
                          top: `${region.y}%`,
                        }}
                      >
                        <div className="relative">
                          <div className="absolute -inset-4 animate-pulse rounded-full bg-blue-500/20 blur-sm" />
                          <div className="relative h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-sm" />
                    <div className="relative h-3 w-3 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-sm">Active region</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-sm">Inactive region</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Resources manager</CardTitle>
              <CardDescription>
                Uncover how your resources are distributed
              </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="mb-4 flex items-center gap-4">
            {/* Group by Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Group by: {groupBy}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleGroupByChange('Cloud provider')}>
                  Cloud provider
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGroupByChange('Region')}>
                  Region
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input placeholder="Search resources..." className="max-w-xs" />
          </div>

          {/* Chart Rendering */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={groupBy === 'Cloud provider' ? resourcesData : regionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                >
                  {groupBy === 'Cloud provider'
                    ? resourcesData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))
                    : regionData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
        <Card>
          <CardHeader>
            <CardTitle>Cost explorer</CardTitle>
            <CardDescription>
              Visualise, understand, and manage your infrastructure costs and usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Group by: {groupBy}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setGroupBy('Cloud provider')}>
                    Cloud provider
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGroupBy('Service')}>
                    Service
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {timeRange}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTimeRange('Last 6 months')}>
                    Last 6 months
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange('Last year')}>
                    Last year
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Tabs
                defaultValue="monthly"
                className="ml-auto"
                onValueChange={(value) =>
                  setViewType(value === 'monthly' ? 'Monthly' : 'Daily')
                }
              >
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeRange === 'Last 6 months' ? sixMonthCostData : yearCostData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Sandbox" fill="#3b82f6" />
                  <Bar dataKey="Production" fill="#f97316" />
                  <Bar dataKey="AWS" fill="#22c55e" />
                  <Bar dataKey="QA" fill="#eab308" />
                  <Bar dataKey="Cost 50+" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}