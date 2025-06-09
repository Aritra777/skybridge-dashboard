"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RecommendationsResponse } from "./compute-calculator"
import { TrendingUp, Award } from "lucide-react"
import { AILoading } from "./ai-loading.tsx"

interface RecommendationsDisplayProps {
    recommendations: RecommendationsResponse | null
    isLoading: boolean
}

export function RecommendationsDisplay({ recommendations, isLoading }: RecommendationsDisplayProps) {
    console.log("RecommendationsDisplay", recommendations, isLoading)
    if (isLoading) {
        return (
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        AI Cost Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <AILoading message="AI is analyzing your cloud requirements..." />
                </CardContent>
            </Card>
        )
    }

    if (!recommendations) {
        return (
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        AI Cost Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Ready for AI Analysis</h3>
                        <p className="text-gray-500">Fill out the form to get AI-powered cloud cost recommendations</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const sortedRecommendations = [...recommendations.recommendations].sort(
        (a, b) => a.estimated_cost.monthly - b.estimated_cost.monthly,
    )

    const bestValue = sortedRecommendations[0]

    return (
        <div className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        AI-Powered Cost Analysis
                    </CardTitle>
                    <p className="text-gray-600 text-sm">Based on your requirements</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    {sortedRecommendations.map((rec, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`px-2 py-1 rounded text-xs font-medium ${rec.cloud_provider === "AWS"
                                        ? "bg-orange-500 text-white"
                                        : rec.cloud_provider === "GCP"
                                            ? "bg-blue-500 text-white"
                                            : "bg-blue-600 text-white"
                                        }`}
                                >
                                    {rec.cloud_provider}
                                </div>
                                <div>
                                    <div className="text-gray-900 font-medium">{rec.service_name}</div>
                                    <div className="text-gray-600 text-sm">{rec.region}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">${rec.estimated_cost.monthly.toFixed(2)}</div>
                                <div className="text-gray-600 text-sm">per month</div>
                            </div>
                        </div>
                    ))}

                    {bestValue && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="h-4 w-4 text-green-600" />
                                <span className="text-green-700 font-medium">AI Recommendation</span>
                            </div>
                            <p className="text-green-700 text-sm">{bestValue.cloud_provider} offers the best value</p>
                            <p className="text-green-600 text-sm">
                                Save $
                                {(
                                    sortedRecommendations[sortedRecommendations.length - 1].estimated_cost.monthly -
                                    bestValue.estimated_cost.monthly
                                ).toFixed(2)}{" "}
                                per month compared to the highest option
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-gray-900">Detailed AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {sortedRecommendations.map((rec, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            variant={index === 0 ? "default" : "secondary"}
                                            className={
                                                rec.cloud_provider === "AWS"
                                                    ? "bg-orange-500 hover:bg-orange-600"
                                                    : rec.cloud_provider === "GCP"
                                                        ? "bg-blue-500 hover:bg-blue-600"
                                                        : "bg-blue-600 hover:bg-blue-700"
                                            }
                                        >
                                            {rec.cloud_provider}
                                        </Badge>
                                        <h3 className="text-gray-900 font-semibold">{rec.service_name}</h3>
                                        {index === 0 && (
                                            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                                                AI Best Choice
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-gray-900">${rec.estimated_cost.monthly}/mo</div>
                                        <div className="text-gray-600 text-sm">${rec.estimated_cost.hourly.toFixed(3)}/hr</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <div className="text-gray-600 text-sm">vCPU</div>
                                        <div className="text-gray-900 font-medium">{rec.vCPU}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600 text-sm">RAM</div>
                                        <div className="text-gray-900 font-medium">{rec.RAM_GB} GB</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600 text-sm">Storage</div>
                                        <div className="text-gray-900 font-medium">
                                            {rec.storage.size_GB} GB {rec.storage.type}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600 text-sm">SLA</div>
                                        <div className="text-gray-900 font-medium">{rec.uptime_SLA}</div>
                                    </div>
                                </div>

                                <div className="text-gray-700 text-sm bg-white p-3 rounded border border-gray-200">
                                    <strong>AI Analysis:</strong> {rec.justification}
                                </div>
                            </div>
                        ))}
                    </div>

                    {recommendations.summary && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="text-gray-900 font-medium mb-2">AI Summary</h4>
                            <p className="text-gray-700 text-sm">{recommendations.summary}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
