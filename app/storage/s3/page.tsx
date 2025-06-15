"use client";

import React, { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { fetch_cost } from "@/services/cost"; // Your cost API wrapper

interface BillingResource {
  id: string;
  region: string;
  cost: number;
}

interface BillingService {
  service: string;
  totalCost: number;
  resources: BillingResource[];
}

const BillingDashboard = () => {
  const [billingData, setBillingData] = useState<BillingService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    const getBillingData = async () => {
      try {
        setIsLoading(true);
        const data = await fetch_cost();
        if (!data || !data.services) throw new Error("Invalid billing response");

        setBillingData(data.services);

        const cost = data.services.reduce((sum: number, s: BillingService) => sum + s.totalCost, 0);
        setTotalCost(cost);

        const credits = data.services.reduce((sum: number, s: BillingService) => {
          return sum + s.resources
            .filter((r) => r.cost < 0)
            .reduce((acc, r) => acc + Math.abs(r.cost), 0);
        }, 0);
        setTotalCredits(credits);
      } catch (err) {
        console.error(err);
        setError("Failed to load billing data.");
      } finally {
        setIsLoading(false);
      }
    };

    getBillingData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>AWS Cost Overview</CardTitle>
            <div className="flex flex-col md:flex-row gap-4">
              <Badge>Total: {formatCurrency(totalCost)}</Badge>
              <Badge className="text-green-700 bg-green-100 border-green-300">
                Credits: {formatCurrency(totalCredits)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingData.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>{service.service}</TableCell>
                    <TableCell className="text-right">
                      <span className={service.totalCost < 0 ? "text-green-600" : ""}>
                        {formatCurrency(service.totalCost)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BillingDashboard;