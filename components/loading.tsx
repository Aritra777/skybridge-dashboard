"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        

        {/* Loading Indicator */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-4 border-t-blue-500 animate-spin"></div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">Loading the System Resources</h3>
            <p className="text-sm text-gray-500 mt-2">Please wait while we load your Data and Resources</p>
          </div>
        </div>
       
      </div>
    </div>
  )
}