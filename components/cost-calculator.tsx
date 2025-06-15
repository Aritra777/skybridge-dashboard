"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, Lightbulb } from "lucide-react"

type ServiceType = "EC2" | "S3" | "Route53" | "VPC" | "ECS" | "EFS" | "DynamoDB" | "EBS"

interface ServiceConfig {
  name: string
  fields: Array<{
    id: string
    label: string
    placeholder: string
    type: "number" | "select"
    options?: string[]
  }>
  calculate: (values: Record<string, string>) => number
}

export default function CostCalculator() {
  const [activeService, setActiveService] = useState<ServiceType>("EC2")
  const [formValues, setFormValues] = useState<Record<string, string>>({})

  const services: Record<ServiceType, ServiceConfig> = {
    EC2: {
      name: "Amazon EC2",
      fields: [
        {
          id: "instanceType",
          label: "Instance Type",
          placeholder: "t3.medium",
          type: "select",
          options: ["t3.micro", "t3.small", "t3.medium", "t3.large", "m5.large", "c5.large"],
        },
        { id: "hours", label: "Hours/Month", placeholder: "730", type: "number" },
        { id: "instances", label: "Number of Instances", placeholder: "1", type: "number" },
        {
          id: "region",
          label: "Region",
          placeholder: "US East (N. Virginia)",
          type: "select",
          options: ["US East (N. Virginia)", "US West (Oregon)", "EU (Ireland)", "Asia Pacific (Tokyo)"],
        },
      ],
      calculate: (values) => {
        const hours = Number.parseInt(values.hours) || 730
        const instances = Number.parseInt(values.instances) || 1
        const baseRate =
          values.instanceType === "t3.micro"
            ? 0.0104
            : values.instanceType === "t3.small"
              ? 0.0208
              : values.instanceType === "t3.medium"
                ? 0.0416
                : values.instanceType === "t3.large"
                  ? 0.0832
                  : values.instanceType === "m5.large"
                    ? 0.096
                    : 0.085
        return hours * instances * baseRate
      },
    },
    S3: {
      name: "Amazon S3",
      fields: [
        { id: "storage", label: "Storage (GB)", placeholder: "100", type: "number" },
        { id: "requests", label: "PUT/POST Requests (thousands)", placeholder: "10", type: "number" },
        { id: "getRequests", label: "GET Requests (thousands)", placeholder: "100", type: "number" },
        {
          id: "storageClass",
          label: "Storage Class",
          placeholder: "Standard",
          type: "select",
          options: ["Standard", "Standard-IA", "Glacier", "Glacier Deep Archive"],
        },
      ],
      calculate: (values) => {
        const storage = Number.parseInt(values.storage) || 100
        const putRequests = Number.parseInt(values.requests) || 10
        const getRequests = Number.parseInt(values.getRequests) || 100
        const storageRate =
          values.storageClass === "Standard"
            ? 0.023
            : values.storageClass === "Standard-IA"
              ? 0.0125
              : values.storageClass === "Glacier"
                ? 0.004
                : 0.00099
        return storage * storageRate + putRequests * 0.005 + getRequests * 0.0004
      },
    },
    Route53: {
      name: "Amazon Route 53",
      fields: [
        { id: "hostedZones", label: "Hosted Zones", placeholder: "1", type: "number" },
        { id: "queries", label: "DNS Queries (millions)", placeholder: "1", type: "number" },
        { id: "healthChecks", label: "Health Checks", placeholder: "0", type: "number" },
      ],
      calculate: (values) => {
        const zones = Number.parseInt(values.hostedZones) || 1
        const queries = Number.parseInt(values.queries) || 1
        const healthChecks = Number.parseInt(values.healthChecks) || 0
        return zones * 0.5 + queries * 0.4 + healthChecks * 0.5
      },
    },
    VPC: {
      name: "Amazon VPC",
      fields: [
        { id: "natGateways", label: "NAT Gateways", placeholder: "1", type: "number" },
        { id: "dataProcessed", label: "Data Processed (GB)", placeholder: "100", type: "number" },
        { id: "vpnConnections", label: "VPN Connections", placeholder: "0", type: "number" },
      ],
      calculate: (values) => {
        const natGateways = Number.parseInt(values.natGateways) || 1
        const dataProcessed = Number.parseInt(values.dataProcessed) || 100
        const vpnConnections = Number.parseInt(values.vpnConnections) || 0
        return natGateways * 32.85 + dataProcessed * 0.045 + vpnConnections * 36.5
      },
    },
    ECS: {
      name: "Amazon ECS",
      fields: [
        { id: "launchType", label: "Launch Type", placeholder: "Fargate", type: "select", options: ["Fargate", "EC2"] },
        { id: "vcpu", label: "vCPU Hours", placeholder: "730", type: "number" },
        { id: "memory", label: "Memory (GB-Hours)", placeholder: "1460", type: "number" },
        { id: "storage", label: "Ephemeral Storage (GB)", placeholder: "20", type: "number" },
      ],
      calculate: (values) => {
        const vcpu = Number.parseInt(values.vcpu) || 730
        const memory = Number.parseInt(values.memory) || 1460
        const storage = Number.parseInt(values.storage) || 20
        if (values.launchType === "Fargate") {
          return vcpu * 0.04048 + memory * 0.004445 + storage * 0.000111
        }
        return vcpu * 0.01 // EC2 launch type has no additional charges
      },
    },
    EFS: {
      name: "Amazon EFS",
      fields: [
        { id: "storage", label: "Storage (GB)", placeholder: "100", type: "number" },
        {
          id: "storageClass",
          label: "Storage Class",
          placeholder: "Standard",
          type: "select",
          options: ["Standard", "Infrequent Access"],
        },
        { id: "throughput", label: "Provisioned Throughput (MB/s)", placeholder: "0", type: "number" },
      ],
      calculate: (values) => {
        const storage = Number.parseInt(values.storage) || 100
        const throughput = Number.parseInt(values.throughput) || 0
        const storageRate = values.storageClass === "Standard" ? 0.3 : 0.025
        return storage * storageRate + throughput * 6.0
      },
    },
    DynamoDB: {
      name: "Amazon DynamoDB",
      fields: [
        { id: "storage", label: "Storage (GB)", placeholder: "25", type: "number" },
        { id: "readUnits", label: "Read Capacity Units", placeholder: "25", type: "number" },
        { id: "writeUnits", label: "Write Capacity Units", placeholder: "25", type: "number" },
        {
          id: "onDemand",
          label: "Pricing Model",
          placeholder: "Provisioned",
          type: "select",
          options: ["Provisioned", "On-Demand"],
        },
      ],
      calculate: (values) => {
        const storage = Number.parseInt(values.storage) || 25
        const readUnits = Number.parseInt(values.readUnits) || 25
        const writeUnits = Number.parseInt(values.writeUnits) || 25
        const storageCharge = Math.max(0, storage - 25) * 0.25 // First 25GB free

        if (values.onDemand === "On-Demand") {
          return storageCharge + readUnits * 1000 * 0.000125 + writeUnits * 1000 * 0.000625
        }
        const readCharge = Math.max(0, readUnits - 25) * 0.00013 * 730 // First 25 RCU free
        const writeCharge = Math.max(0, writeUnits - 25) * 0.00065 * 730 // First 25 WCU free
        return storageCharge + readCharge + writeCharge
      },
    },
    EBS: {
      name: "Amazon EBS",
      fields: [
        {
          id: "volumeType",
          label: "Volume Type",
          placeholder: "gp3",
          type: "select",
          options: ["gp3", "gp2", "io1", "io2", "st1", "sc1"],
        },
        { id: "storage", label: "Storage (GB)", placeholder: "100", type: "number" },
        { id: "iops", label: "Provisioned IOPS", placeholder: "3000", type: "number" },
        { id: "throughput", label: "Throughput (MB/s)", placeholder: "125", type: "number" },
      ],
      calculate: (values) => {
        const storage = Number.parseInt(values.storage) || 100
        const iops = Number.parseInt(values.iops) || 3000
        const throughput = Number.parseInt(values.throughput) || 125

        let storageRate = 0.08 // gp3 default
        if (values.volumeType === "gp2") storageRate = 0.1
        else if (values.volumeType === "io1") storageRate = 0.125
        else if (values.volumeType === "io2") storageRate = 0.125
        else if (values.volumeType === "st1") storageRate = 0.045
        else if (values.volumeType === "sc1") storageRate = 0.015

        let iopsCharge = 0
        if (values.volumeType === "gp3" && iops > 3000) {
          iopsCharge = (iops - 3000) * 0.005
        } else if (values.volumeType === "io1" || values.volumeType === "io2") {
          iopsCharge = iops * 0.065
        }

        let throughputCharge = 0
        if (values.volumeType === "gp3" && throughput > 125) {
          throughputCharge = (throughput - 125) * 0.04
        }

        return storage * storageRate + iopsCharge + throughputCharge
      },
    },
  }

  const currentService = services[activeService]
  const estimatedCost = currentService.calculate(formValues)

  const handleInputChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleServiceChange = (service: ServiceType) => {
    setActiveService(service)
    setFormValues({}) // Reset form values when switching services
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AWS Cost Calculator</h1>
          <p className="text-gray-600 mt-2">Calculate costs for different AWS services</p>
        </div>

        {/* Service Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {Object.keys(services).map((service) => (
            <Button
              key={service}
              variant={activeService === service ? "default" : "outline"}
              onClick={() => handleServiceChange(service as ServiceType)}
              className="h-12"
            >
              {service}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cost Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Cost Calculator - {currentService.name}
              </CardTitle>
              <CardDescription>Input your requirements to get personalized cost estimates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentService.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  {field.type === "select" ? (
                    <Select
                      value={formValues[field.id] || ""}
                      onValueChange={(value) => handleInputChange(field.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.id}
                      type="number"
                      placeholder={field.placeholder}
                      value={formValues[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cost Estimate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Cost Estimate
              </CardTitle>
              <CardDescription>Based on your requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AWS Cost */}
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">AWS</div>
                  <span className="font-medium">{currentService.name}</span>
                </div>
                <span className="text-2xl font-bold text-orange-600">${estimatedCost.toFixed(2)}</span>
              </div>

              {/* Comparison (simulated) */}
              <div className="space-y-3">
                {/* <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">GCP</div>
                    <span className="font-medium">Google Cloud Platform</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">${(estimatedCost * 0.95).toFixed(2)}</span>
                </div> */}
{/* 
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">Azure</div>
                    <span className="font-medium">Microsoft Azure</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">${(estimatedCost * 1.02).toFixed(2)}</span>
                </div> */}
              </div>

              {/* Recommendation */}
              {/* <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Recommendation</span>
                </div>
                <div className="text-green-800 font-medium mb-1">GCP offers the best value</div>
                <div className="text-green-700 text-sm">
                  Save ${(estimatedCost * 0.05).toFixed(2)} per month compared to AWS
                </div>
                <div className="text-green-600 text-xs mt-2">
                  * Prices are estimates and may vary based on actual usage, region, and current pricing
                </div>
              </div> */}

              {/* Cost Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Cost Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Service Cost:</span>
                    <span>${estimatedCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Transfer:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support (Basic):</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Monthly:</span>
                    <span>${estimatedCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Annual (12 months):</span>
                    <span>${(estimatedCost * 12).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
