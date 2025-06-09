import { BasicSidebarLayout } from "@/components/basic_sidebar_layout"
import { CloudCalculator } from "@/components/recommendation/cloud-calculator"

export default function Recommendation() {
    return (
        <BasicSidebarLayout>
            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Cloud Cost Calculator</h1>
                        <p>Calculate costs for different cloud services</p>
                    </div>
                    <CloudCalculator />
                </div>
            </div>
        </BasicSidebarLayout>
    )
}