"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingDown, Filter } from "lucide-react"

type ServiceType = "Compute" | "Storage" | "Database" | "Networking" | "Container" | "Serverless"

interface PricingData {
  provider: string
  instanceType: string
  price: number
  originalPrice?: number
  discount?: number
  vcpu: number
  memory: string
  storage?: string
  region: string
  category: string
}

export default function CloudPricingComparison() {
  const [activeService, setActiveService] = useState<ServiceType>("Compute")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [filterProvider, setFilterProvider] = useState("all")

  const pricingData: Record<ServiceType, PricingData[]> = {
    Compute: [
      {
        provider: "AWS",
        instanceType: "t4g.xlarge",
        price: 0.1344,
        originalPrice: 0.16,
        discount: 16,
        vcpu: 4,
        memory: "16 GB",
        region: "us-east-1",
        category: "General Purpose",
      },
      {
        provider: "Azure",
        instanceType: "B4ms",
        price: 0.166,
        vcpu: 4,
        memory: "16 GB",
        region: "East US",
        category: "General Purpose",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "e2-standard-4",
        price: 0.1509,
        originalPrice: 0.18,
        discount: 16,
        vcpu: 4,
        memory: "16 GB",
        region: "us-central1",
        category: "General Purpose",
      },
      {
        provider: "Oracle",
        instanceType: "VM.Standard3.Flex",
        price: 0.0899,
        vcpu: 4,
        memory: "16 GB",
        region: "us-ashburn-1",
        category: "General Purpose",
      },
      {
        provider: "AWS",
        instanceType: "c6a.xlarge",
        price: 0.153,
        vcpu: 4,
        memory: "8 GB",
        region: "us-east-1",
        category: "Compute Optimized",
      },
      {
        provider: "Azure",
        instanceType: "F4s v2",
        price: 0.169,
        originalPrice: 0.2,
        discount: 15,
        vcpu: 4,
        memory: "8 GB",
        region: "East US",
        category: "Compute Optimized",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "c2-standard-4",
        price: 0.2351,
        vcpu: 4,
        memory: "16 GB",
        region: "us-central1",
        category: "Compute Optimized",
      },
      {
        provider: "Oracle",
        instanceType: "VM.Optimized3.Flex",
        price: 0.0555,
        vcpu: 4,
        memory: "8 GB",
        region: "us-ashburn-1",
        category: "Compute Optimized",
      },
      {
        provider: "AWS",
        instanceType: "m6i.large",
        price: 0.0864,
        vcpu: 2,
        memory: "8 GB",
        region: "us-east-1",
        category: "General Purpose",
      },
      {
        provider: "Azure",
        instanceType: "D2s v3",
        price: 0.096,
        vcpu: 2,
        memory: "8 GB",
        region: "East US",
        category: "General Purpose",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "n2-standard-2",
        price: 0.0971,
        originalPrice: 0.11,
        discount: 12,
        vcpu: 2,
        memory: "8 GB",
        region: "us-central1",
        category: "General Purpose",
      },
    ],
    Storage: [
      {
        provider: "AWS",
        instanceType: "S3 Standard",
        price: 0.023,
        vcpu: 0,
        memory: "Per GB/month",
        storage: "Standard",
        region: "us-east-1",
        category: "Object Storage",
      },
      {
        provider: "Azure",
        instanceType: "Blob Storage Hot",
        price: 0.0184,
        originalPrice: 0.022,
        discount: 16,
        vcpu: 0,
        memory: "Per GB/month",
        storage: "Hot Tier",
        region: "East US",
        category: "Object Storage",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "Cloud Storage Standard",
        price: 0.02,
        vcpu: 0,
        memory: "Per GB/month",
        storage: "Standard",
        region: "us-central1",
        category: "Object Storage",
      },
      {
        provider: "Oracle",
        instanceType: "Object Storage Standard",
        price: 0.0255,
        vcpu: 0,
        memory: "Per GB/month",
        storage: "Standard",
        region: "us-ashburn-1",
        category: "Object Storage",
      },
      {
        provider: "AWS",
        instanceType: "EBS gp3",
        price: 0.08,
        vcpu: 0,
        memory: "Per GB/month",
        storage: "SSD",
        region: "us-east-1",
        category: "Block Storage",
      },
      {
        provider: "Azure",
        instanceType: "Premium SSD",
        price: 0.135,
        vcpu: 0,
        memory: "Per GB/month",
        storage: "Premium SSD",
        region: "East US",
        category: "Block Storage",
      },
    ],
    Database: [
      {
        provider: "AWS",
        instanceType: "RDS db.t3.medium",
        price: 0.068,
        vcpu: 2,
        memory: "4 GB",
        region: "us-east-1",
        category: "Relational Database",
      },
      {
        provider: "Azure",
        instanceType: "SQL Database S2",
        price: 0.075,
        originalPrice: 0.09,
        discount: 17,
        vcpu: 2,
        memory: "4 GB",
        region: "East US",
        category: "Relational Database",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "Cloud SQL db-n1-standard-1",
        price: 0.0825,
        vcpu: 1,
        memory: "3.75 GB",
        region: "us-central1",
        category: "Relational Database",
      },
      {
        provider: "AWS",
        instanceType: "DynamoDB On-Demand",
        price: 0.25,
        vcpu: 0,
        memory: "Per million requests",
        region: "us-east-1",
        category: "NoSQL Database",
      },
      {
        provider: "Azure",
        instanceType: "Cosmos DB",
        price: 0.008,
        vcpu: 0,
        memory: "Per RU/s per hour",
        region: "East US",
        category: "NoSQL Database",
      },
    ],
    Networking: [
      {
        provider: "AWS",
        instanceType: "CloudFront",
        price: 0.085,
        vcpu: 0,
        memory: "Per GB",
        region: "Global",
        category: "CDN",
      },
      {
        provider: "Azure",
        instanceType: "CDN Standard",
        price: 0.081,
        originalPrice: 0.095,
        discount: 15,
        vcpu: 0,
        memory: "Per GB",
        region: "Global",
        category: "CDN",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "Cloud CDN",
        price: 0.08,
        vcpu: 0,
        memory: "Per GB",
        region: "Global",
        category: "CDN",
      },
      {
        provider: "AWS",
        instanceType: "Application Load Balancer",
        price: 0.0225,
        vcpu: 0,
        memory: "Per hour",
        region: "us-east-1",
        category: "Load Balancer",
      },
    ],
    Container: [
      {
        provider: "AWS",
        instanceType: "ECS Fargate",
        price: 0.04048,
        vcpu: 1,
        memory: "Per vCPU per hour",
        region: "us-east-1",
        category: "Container Service",
      },
      {
        provider: "Azure",
        instanceType: "Container Instances",
        price: 0.0012,
        originalPrice: 0.0015,
        discount: 20,
        vcpu: 1,
        memory: "Per second",
        region: "East US",
        category: "Container Service",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "Cloud Run",
        price: 0.000024,
        vcpu: 1,
        memory: "Per vCPU-second",
        region: "us-central1",
        category: "Container Service",
      },
      {
        provider: "AWS",
        instanceType: "EKS Cluster",
        price: 0.1,
        vcpu: 0,
        memory: "Per cluster per hour",
        region: "us-east-1",
        category: "Kubernetes",
      },
    ],
    Serverless: [
      {
        provider: "AWS",
        instanceType: "Lambda",
        price: 0.0000166667,
        vcpu: 0,
        memory: "Per GB-second",
        region: "us-east-1",
        category: "Function as a Service",
      },
      {
        provider: "Azure",
        instanceType: "Functions",
        price: 0.000016,
        originalPrice: 0.00002,
        discount: 20,
        vcpu: 0,
        memory: "Per GB-second",
        region: "East US",
        category: "Function as a Service",
      },
      {
        provider: "Google Cloud Platform",
        instanceType: "Cloud Functions",
        price: 0.0000025,
        vcpu: 0,
        memory: "Per invocation",
        region: "us-central1",
        category: "Function as a Service",
      },
      {
        provider: "AWS",
        instanceType: "API Gateway",
        price: 3.5,
        vcpu: 0,
        memory: "Per million requests",
        region: "us-east-1",
        category: "API Management",
      },
    ],
  }

  const currentData = pricingData[activeService] || []

  // Filter and sort data
  const filteredData = currentData
    .filter((item) => {
      const matchesSearch =
        item.instanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesProvider = filterProvider === "all" || item.provider === filterProvider
      return matchesSearch && matchesProvider
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price
      if (sortBy === "provider") return a.provider.localeCompare(b.provider)
      if (sortBy === "instanceType") return a.instanceType.localeCompare(b.instanceType)
      return 0
    })

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "AWS":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Azure":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Google Cloud Platform":
        return "bg-green-100 text-green-800 border-green-200"
      case "Oracle":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getInstanceTypeColor = (category: string) => {
    switch (category) {
      case "General Purpose":
        return "bg-purple-100 text-purple-800"
      case "Compute Optimized":
        return "bg-blue-100 text-blue-800"
      case "Memory Optimized":
        return "bg-green-100 text-green-800"
      case "Storage Optimized":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cloud Pricing Comparison</h1>
          <p className="text-gray-600 mt-2">Compare pricing across AWS, Azure, Google Cloud, and Oracle</p>
        </div>

        {/* Service Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.keys(pricingData).map((service) => (
            <Button
              key={service}
              variant={activeService === service ? "default" : "outline"}
              onClick={() => setActiveService(service as ServiceType)}
              className="h-12"
            >
              {service}
            </Button>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search instance types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cloud Provider</label>
                <Select value={filterProvider} onValueChange={setFilterProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="AWS">AWS</SelectItem>
                    <SelectItem value="Azure">Azure</SelectItem>
                    <SelectItem value="Google Cloud Platform">Google Cloud Platform</SelectItem>
                    <SelectItem value="Oracle">Oracle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="instanceType">Instance Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Table */}
        <Card>
          <CardHeader>
            <CardTitle>{activeService} Pricing Comparison</CardTitle>
            <CardDescription>
              Showing {filteredData.length} results • Prices are per hour unless specified
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold">Cloud Provider</th>
                    <th className="text-left p-4 font-semibold">Instance Type</th>
                    <th className="text-left p-4 font-semibold">Price</th>
                    <th className="text-left p-4 font-semibold">vCPU</th>
                    <th className="text-left p-4 font-semibold">Memory</th>
                    <th className="text-left p-4 font-semibold">Region</th>
                    <th className="text-left p-4 font-semibold">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <Badge className={getProviderColor(item.provider)}>{item.provider}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getInstanceTypeColor(item.category)}>
                          {item.instanceType}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">${item.price.toFixed(4)}</span>
                          {item.originalPrice && (
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(4)}
                              </span>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                {item.discount}% off
                              </Badge>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{item.vcpu || "N/A"}</td>
                      <td className="p-4 text-gray-600">{item.memory}</td>
                      <td className="p-4 text-gray-600">{item.region}</td>
                      <td className="p-4">
                        <Badge variant="secondary">{item.category}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Lowest Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${Math.min(...filteredData.map((item) => item.price)).toFixed(4)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Highest Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${Math.max(...filteredData.map((item) => item.price)).toFixed(4)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${(filteredData.reduce((sum, item) => sum + item.price, 0) / filteredData.length || 0).toFixed(4)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{filteredData.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Best Value Recommendation */}
        {filteredData.length > 0 && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">💡 Best Value Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-green-700">
                {(() => {
                  const cheapest = filteredData.reduce((min, item) => (item.price < min.price ? item : min))
                  return (
                    <p>
                      <strong>{cheapest.provider}</strong> offers the best value with{" "}
                      <strong>{cheapest.instanceType}</strong> at <strong>${cheapest.price.toFixed(4)}</strong> per hour
                      in the {activeService.toLowerCase()} category.
                    </p>
                  )
                })()}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
