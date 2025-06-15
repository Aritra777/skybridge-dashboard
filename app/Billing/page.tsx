"use client";

import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Globe,
  Loader2,
  Server,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/sui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/sui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/sui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { fetch_cost } from "@/services/cost";
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout';
// Types
type BillingResource = {
  id: string;
  region: string;
  cost: number;
};

type BillingService = {
  service: string;
  totalCost: number;
  resources: BillingResource[];
};

export default function Component() {
  const [billingData, setBillingData] = useState<BillingService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedServices, setExpandedServices] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
  const getBillingData = async () => {
    try {
      setIsLoading(true);

      const cachedData = localStorage.getItem("aws_billing_data");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setBillingData(parsedData.services);
        setTotalCost(parsedData.totalCost);
        setTotalCredits(parsedData.totalCredits);
        setIsLoading(false);
        return;
      }

      const data: BillingService[] = await fetch_cost();
      console.log("Raw JSON from fetch_cost:", JSON.stringify(data, null, 2));

      if (!Array.isArray(data)) throw new Error("Expected array from backend");

      // ✅ Recalculate totalCost from all resources (NOT just >0)
      const updatedData = data.map((service) => {
        const recalculatedTotal = service.resources.reduce((acc, r) => acc + r.cost, 0);
        return { ...service, totalCost: recalculatedTotal };
      });

      setBillingData(updatedData);

      const calculatedTotalCost = updatedData.reduce((sum, s) => {
        return sum + s.totalCost;
      }, 0);
      setTotalCost(calculatedTotalCost);

      const calculatedTotalCredits = updatedData.reduce((sum, s) => {
        return (
          sum +
          s.resources
            .filter((r) => r.cost < 0)
            .reduce((acc, r) => acc + Math.abs(r.cost), 0)
        );
      }, 0);
      setTotalCredits(calculatedTotalCredits);

      localStorage.setItem(
        "aws_billing_data",
        JSON.stringify({
          services: updatedData,
          totalCost: calculatedTotalCost,
          totalCredits: calculatedTotalCredits,
        })
      );
    } catch (err: any) {
      console.error("Error fetching billing data:", err);
      setError("Failed to load billing data. " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  getBillingData();
}, []);

  const toggleService = (service: string) => {
    setExpandedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);

  const getServiceIcon = (service: string) => {
    if (service.includes("Storage") || service.includes("Compute"))
      return <Server className="h-4 w-4" />;
    if (service.includes("Network") || service.includes("VPC"))
      return <Globe className="h-4 w-4" />;
    return <DollarSign className="h-4 w-4" />;
  };

  const regionStats = billingData.reduce((acc, service) => {
    service.resources.forEach((res) => {
      if (!acc[res.region]) acc[res.region] = { cost: 0, resources: 0 };
      acc[res.region].cost += res.cost;
      acc[res.region].resources += 1;
    });
    return acc;
  }, {} as Record<string, { cost: number; resources: number }>);

  return (
    <BasicSidebarLayout>
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">AWS Billing Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your AWS costs and resource usage across services and
              regions.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SummaryCard title="Total Cost" value={formatCurrency(totalCost)} />
            <SummaryCard
              title="Credits Applied"
              value={formatCurrency(totalCredits)}
              highlight
            />
            <SummaryCard
              title="Active Services"
              value={billingData.length.toString()}
            />
            <SummaryCard
              title="Regions"
              value={Object.keys(regionStats).length.toString()}
            />
          </div>

          <Tabs defaultValue="services">
            <TabsList>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="regions">Regions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Service Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {billingData
                    .sort((a, b) => b.totalCost - a.totalCost)
                    .map((service) => (
                      <div key={service.service}>
                        <div
                          className="flex justify-between items-center border p-3 rounded cursor-pointer hover:bg-accent/50"
                          onClick={() => toggleService(service.service)}
                        >
                          <div className="flex items-center space-x-3">
                            {getServiceIcon(service.service)}
                            <div>
                              <p className="font-medium">{service.service}</p>
                              <p className="text-sm text-muted-foreground">
                                {service.resources.length} resources
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{formatCurrency(service.totalCost)}</span>
                            {expandedServices.includes(service.service) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </div>

                        {expandedServices.includes(service.service) && (
                          <div className="ml-6">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Resource ID</TableHead>
                                  <TableHead>Region</TableHead>
                                  <TableHead className="text-right">
                                    Cost
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {service.resources.map((r, i) => (
                                  <TableRow key={i}>
                                    <TableCell className="font-mono text-sm">
                                      {r.id === "NoResourceId"
                                        ? "N/A"
                                        : r.id.length > 50
                                        ? r.id.slice(0, 50) + "..."
                                        : r.id}
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="outline">{r.region}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <span
                                        className={r.cost < 0 ? "text-green-600" : ""}
                                      >
                                        {formatCurrency(r.cost)}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Regions Tab */}
            <TabsContent value="regions">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Region</TableHead>
                        <TableHead className="text-right">Resources</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(regionStats)
                        .sort(([, a], [, b]) => b.cost - a.cost)
                        .map(([region, stats]) => (
                          <TableRow key={region}>
                            <TableCell>{region}</TableCell>
                            <TableCell className="text-right">
                              {stats.resources}
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={stats.cost < 0 ? "text-green-600" : ""}>
                                {formatCurrency(stats.cost)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Resources Tab */}
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>All Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Resource ID</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingData
                        .flatMap((s) =>
                          s.resources.map((r) => ({ ...r, service: s.service }))
                        )
                        .sort((a, b) => Math.abs(b.cost) - Math.abs(a.cost))
                        .map((res, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{res.service}</TableCell>
                            <TableCell className="font-mono text-sm">
                              {res.id === "NoResourceId"
                                ? "N/A"
                                : res.id.length > 40
                                ? res.id.slice(0, 40) + "..."
                                : res.id}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{res.region}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={res.cost < 0 ? "text-green-600" : ""}>
                                {formatCurrency(res.cost)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
    </BasicSidebarLayout>
  );
}

// Summary Card Component
function SummaryCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${highlight ? "text-green-600" : ""}`}>
          {value}
        </div>
        <p className="text-xs text-muted-foreground">Current period</p>
      </CardContent>
    </Card>
  );
}
const data: BillingService[] = await fetch_cost();
console.log("Raw JSON from fetch_cost:", JSON.stringify(data, null, 2));