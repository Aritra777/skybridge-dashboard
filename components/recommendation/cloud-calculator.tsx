"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComputeCalculator } from "./compute-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, HardDrive, Container } from "lucide-react"

export function CloudCalculator() {
    return (
        <div className="w-full">
            <Tabs defaultValue="compute" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 shadow-sm">
                    <TabsTrigger
                        value="compute"
                        className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 text-gray-600"
                    >
                        <Server className="h-4 w-4" />
                        Compute
                    </TabsTrigger>
                    <TabsTrigger
                        value="storage"
                        className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 text-gray-600"
                    >
                        <HardDrive className="h-4 w-4" />
                        Storage
                    </TabsTrigger>
                    <TabsTrigger
                        value="containers"
                        className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 text-gray-600"
                    >
                        <Container className="h-4 w-4" />
                        Containers
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="compute" className="mt-6">
                    <ComputeCalculator />
                </TabsContent>

                <TabsContent value="storage" className="mt-6">
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-900 flex items-center gap-2">
                                <HardDrive className="h-5 w-5" />
                                Storage Calculator
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <HardDrive className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Storage Calculator</h3>
                                <p className="text-gray-500">Coming soon - Storage cost calculation and recommendations</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="containers" className="mt-6">
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-900 flex items-center gap-2">
                                <Container className="h-5 w-5" />
                                Container Calculator
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <Container className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Container Calculator</h3>
                                <p className="text-gray-500">Coming soon - Container service cost calculation and recommendations</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
