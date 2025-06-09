"use client"

import { useEffect, useState } from "react"
import { Brain, Zap, Target, TrendingUp } from "lucide-react"

interface AILoadingProps {
    message?: string
}

export function AILoading({ message = "AI is analyzing your requirements..." }: AILoadingProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [dots, setDots] = useState("")

    const steps = [
        { icon: Brain, text: "Processing your requirements", color: "text-blue-500" },
        { icon: Zap, text: "Analyzing cloud providers", color: "text-purple-500" },
        { icon: Target, text: "Optimizing configurations", color: "text-green-500" },
        { icon: TrendingUp, text: "Calculating cost estimates", color: "text-orange-500" },
    ]

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length)
        }, 1500)

        const dotsInterval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
        }, 500)

        return () => {
            clearInterval(stepInterval)
            clearInterval(dotsInterval)
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
            {/* Neural Network Animation */}
            <div className="relative">
                <div className="w-20 h-20 relative">
                    {/* Central brain icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="h-10 w-10 text-blue-500" />
                    </div>

                    {/* Animated circles */}
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="absolute inset-0 border-2 border-blue-200 rounded-full animate-ping"
                            style={{
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: "2s",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* AI Processing Steps */}
            <div className="space-y-4 w-full max-w-md">
                {steps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep

                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${isActive
                                    ? "bg-blue-50 border border-blue-200 scale-105"
                                    : isCompleted
                                        ? "bg-green-50 border border-green-200"
                                        : "bg-gray-50 border border-gray-200"
                                }`}
                        >
                            <div
                                className={`p-2 rounded-full ${isActive ? "bg-blue-100" : isCompleted ? "bg-green-100" : "bg-gray-100"
                                    }`}
                            >
                                <Icon
                                    className={`h-4 w-4 ${isActive ? step.color : isCompleted ? "text-green-500" : "text-gray-400"}`}
                                />
                            </div>
                            <span
                                className={`text-sm font-medium ${isActive ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-500"
                                    }`}
                            >
                                {step.text}
                                {isActive && dots}
                            </span>
                            {isCompleted && (
                                <div className="ml-auto">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Main message */}
            <div className="text-center">
                <p className="text-lg font-medium text-gray-700">{message}</p>
                <p className="text-sm text-gray-500 mt-1">Our AI is working to find the best cloud solutions for you</p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1500 ease-out"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
            </div>
        </div>
    )
}
