"use client"

import { useState } from "react"
import { ComputeForm } from "./compute-form"
import { RecommendationsDisplay } from "./recommendations-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"
import { getRecommendation } from "@/services/recommendation"

export interface ComputeRequirements {
    vCPU: number
    RAM_GB: number
    machine_count: number
    storage: {
        type: "SSD" | "HDD"
        size_GB: number
    }
    region: string
    OS: "Linux" | "Windows"
    duration: string
    usage: string
    budget_limit: number | null
    workload_type: "Web Application"
    preferred_cloud: "AWS" | "Azure" | "GCP" | "Any"
    billing_model: "OnDemand" | "Reserved" | "Spot" | "Preemptible"
}

export interface CloudRecommendation {
    cloud_provider: string
    service_name: string
    region: string
    vCPU: number
    RAM_GB: number
    storage: {
        type: string
        size_GB: number
    }
    instance_count: number
    billing_model: string
    estimated_cost: {
        hourly: number
        monthly: number
        total: number
    }
    uptime_SLA: string
    justification: string
}

export interface RecommendationsResponse {
    recommendations: CloudRecommendation[]
    summary: string
    note: string | null
}

export function ComputeCalculator() {
    const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFormSubmit = async (requirements: ComputeRequirements) => {
        setIsLoading(true);

        // Promise that resolves after 6 seconds
        const delay = new Promise((resolve) => setTimeout(resolve, 6000));

        try {
            // Run both API call and delay in parallel
            const [apiResult] = await Promise.allSettled([
                getRecommendation(requirements),
                delay,
            ]);

            if (apiResult.status === "fulfilled") {
                setRecommendations(apiResult.value);
            } else {
                setRecommendations(null);
                console.error("Error fetching recommendations:", apiResult.reason);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Cost Calculator - Compute
                    </CardTitle>
                    <p className="text-gray-600 text-sm">Input your requirements to get personalized cost estimates</p>
                </CardHeader>
                <CardContent>
                    <ComputeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                </CardContent>
            </Card>

            <div className="space-y-6">
                <RecommendationsDisplay recommendations={recommendations} isLoading={isLoading} />
            </div>
        </div>
    )
}
