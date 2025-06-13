"use client";

import { Button } from "@/components/oui/button";
import { Badge } from "@/components/oui/badge";
import { Card, CardContent } from "@/components/oui/card";
import LoadingSpinner from '../components/oui/LoadingSpinner'; 
import Link from "next/link";
import Image from "next/image";
import profile from "../public/image/SkyBridge.svg";
import {
  ArrowRight,
  Shield,
  Database,
  Cloud,
  TrendingUp,
  Brain,
  PieChart,
  Target,
  CheckCircle,
  Users,
  AlertTriangle,
  DollarSign,
  Zap,
  Eye,
  Layers,
  ArrowRightCircle,
} from "lucide-react";
import CountingNumber from "../components/oui/CountingNumber";
import React, { useState, useEffect } from 'react';
const SkyBridgeLanding = () => {
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 20 seconds
    }, 2); 

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
              <LoadingSpinner   />
            ) :(
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Cloud className="h-7 w-7 text-white" />
              </div> */}
                            <Image
                src={profile}
                width={40}
                height={40}
                alt="Picture of the author"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SkyBridge
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                How It Works
              </a>
              <a
                href="#why-skybridge"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Why SkyBridge
              </a>
              <a
                href="/price"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Pricing
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign In
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 hover:bg-purple-200 transition">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto mb-20">
            <Badge className="bg-purple-100 text-purple-700 border border-purple-200 px-4 py-2 mb-8 hover:bg-purple-200 transition">
              <Cloud className="w-4 h-4" />
              Your Unified Cloud Command Center
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Optimize Costs. Maximize Performance.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              SkyBridge is a cloud-agnostic platform that brings simplicity,
              intelligence, and control back to your cloud operations.
              Centralize your entire cloud ecosystem, transform complexity into
              clarity, and enable proactive optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-4 text-lg font-semibold rounded-lg"
              >
                Request a Demo
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:shadow-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">
                  40% Cost Reduction
                </span>
              </div>

              <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:shadow-lg">
                <Brain className="w-6 h-6 text-purple-600" />
                <span className="font-semibold text-gray-900">
                  AI-Powered Insights
                </span>
              </div>

              <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:shadow-lg">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  Multi-Cloud Support
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview with Charts */}
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
            <Card className="relative bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      SkyBridge Command Center
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-white font-medium">
                        Live ML Analysis
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Top Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        {/* Use the CountingNumber component here */}
                        {/* Pass 47000 as the targetValue to count up to */}
                        <CountingNumber targetValue={47000} duration={1500} />
                        <div className="text-sm text-green-600 font-medium">
                          Monthly Savings
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-6 text-center">
                        <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-blue-700">
                          3,247
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          Resources Monitored
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <CardContent className="p-6 text-center">
                        <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-purple-700">
                          94%
                        </div>
                        <div className="text-sm text-purple-600 font-medium">
                          Prediction Accuracy
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <CardContent className="p-6 text-center">
                        <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-orange-700">
                          127
                        </div>
                        <div className="text-sm text-orange-600 font-medium">
                          Optimizations Applied
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Section */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Cost Forecast Chart */}
                    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-gray-900">
                            AI Cost Forecast
                          </h4>
                          <Badge className="bg-purple-100 text-purple-700">
                            ML Powered
                          </Badge>
                        </div>

                        {/* Simulated Line Chart */}
                        <div className="relative h-48 bg-white rounded-lg p-4 border">
                          {/* Y-axis label */}
                          <div className="absolute top-4 left-4 text-xs text-gray-500 transform -rotate-90 origin-top-left -translate-x-full translate-y-4">
                            Cost ($)
                          </div>

                          {/* X-axis label */}
                          <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                            Time
                          </div>

                          {/* Legend - All three types */}
                          <div className="absolute top-2 right-2 flex space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-0.5 bg-red-500"></div>
                              <span>Current</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-0.5 bg-purple-500"></div>
                              <span>Predicted</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-0.5 bg-green-500"></div>
                              <span>Optimized</span>
                            </div>
                          </div>

                          {/* Chart Lines */}
                          <svg className="w-full h-full" viewBox="0 0 300 150">
                            {/* Grid */}
                            <defs>
                              <pattern
                                id="grid"
                                width="30"
                                height="15"
                                patternUnits="userSpaceOnUse"
                              >
                                <path
                                  d="M 30 0 L 0 0 0 15"
                                  fill="none"
                                  stroke="#f3f4f6" /* Lighter grid color */
                                  strokeWidth="0.8" /* Thinner grid lines */
                                />
                              </pattern>
                            </defs>
                            <rect
                              width="100%"
                              height="100%"
                              fill="url(#grid)"
                            />

                            {/* Y-Axis Line */}
                            <line
                              x1="20"
                              y1="10"
                              x2="20"
                              y2="140"
                              stroke="#a0a0a0"
                              strokeWidth="1"
                            />
                            {/* X-Axis Line */}
                            <line
                              x1="20"
                              y1="140"
                              x2="280"
                              y2="140"
                              stroke="#a0a0a0"
                              strokeWidth="1"
                            />

                            {/* Y-axis Ticks and Labels (Illustrative - adjust values as needed) */}
                            <text
                              x="15"
                              y="138"
                              fontSize="8"
                              fill="#555"
                              textAnchor="end"
                            >
                              0
                            </text>
                            <text
                              x="15"
                              y="105"
                              fontSize="8"
                              fill="#555"
                              textAnchor="end"
                            >
                              50
                            </text>
                            <text
                              x="15"
                              y="70"
                              fontSize="8"
                              fill="#555"
                              textAnchor="end"
                            >
                              100
                            </text>
                            <text
                              x="15"
                              y="35"
                              fontSize="8"
                              fill="#555"
                              textAnchor="end"
                            >
                              150
                            </text>

                            {/* X-axis Ticks and Labels (Aligned with data points) */}
                            <text
                              x="20"
                              y="148"
                              fontSize="8"
                              fill="#555"
                              textAnchor="middle"
                            >
                              Day 1
                            </text>
                            <text
                              x="80"
                              y="148"
                              fontSize="8"
                              fill="#555"
                              textAnchor="middle"
                            >
                              Day 2
                            </text>
                            <text
                              x="140"
                              y="148"
                              fontSize="8"
                              fill="#555"
                              textAnchor="middle"
                            >
                              Day 3
                            </text>
                            <text
                              x="200"
                              y="148"
                              fontSize="8"
                              fill="#555"
                              textAnchor="middle"
                            >
                              Day 4
                            </text>
                            <text
                              x="260"
                              y="148"
                              fontSize="8"
                              fill="#555"
                              textAnchor="middle"
                            >
                              Day 5
                            </text>

                            {/* Current Cost Line (Red, Dashed - Highest Cost, Lowest Y on graph) */}
                            <path
                              d="M 20 60 Q 50 55 80 50 T 140 55 T 200 45 T 260 40"
                              fill="none"
                              stroke="#ef4444" /* Red */
                              strokeWidth="2.5"
                              strokeDasharray="4 4"
                            />
                            <circle cx="20" cy="60" r="3" fill="#ef4444" />
                            <circle cx="80" cy="50" r="3" fill="#ef4444" />
                            <circle cx="140" cy="55" r="3" fill="#ef4444" />
                            <circle cx="200" cy="45" r="3" fill="#ef4444" />
                            <circle cx="260" cy="40" r="3" fill="#ef4444" />

                            {/* Predicted Cost Line (Purple, Solid - Middle Cost) */}
                            <path
                              d="M 20 80 Q 50 75 80 70 T 140 75 T 200 60 T 260 50"
                              fill="none"
                              stroke="#8b5cf6" /* Purple */
                              strokeWidth="2.5"
                            />
                            <circle cx="20" cy="80" r="3" fill="#8b5cf6" />
                            <circle cx="80" cy="70" r="3" fill="#8b5cf6" />
                            <circle cx="140" cy="75" r="3" fill="#8b5cf6" />
                            <circle cx="200" cy="60" r="3" fill="#8b5cf6" />
                            <circle cx="260" cy="50" r="3" fill="#8b5cf6" />

                            {/* Optimized Cost Line (Green, Solid - Lowest Cost, Highest Y on graph) */}
                            <path
                              d="M 20 100 Q 50 95 80 90 T 140 95 T 200 80 T 260 65"
                              fill="none"
                              stroke="#10b981" /* Green */
                              strokeWidth="2.5"
                            />
                            <circle cx="20" cy="100" r="3" fill="#10b981" />
                            <circle cx="80" cy="90" r="3" fill="#10b981" />
                            <circle cx="140" cy="95" r="3" fill="#10b981" />
                            <circle cx="200" cy="80" r="3" fill="#10b981" />
                            <circle cx="260" cy="65" r="3" fill="#10b981" />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Resource Distribution Pie Chart */}
                    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-gray-900">
                            Multi-Cloud Distribution
                          </h4>
                          {/* Assuming PieChart is an icon component */}
                          <PieChart className="w-5 h-5 text-gray-600" />
                        </div>

                        {/* Fully Functional 360-Degree Pie Chart */}
                        <div className="relative h-48 bg-white rounded-lg p-4 border flex items-center justify-center">
                          <svg width="160" height="160" viewBox="0 0 160 160">
                            {/* AWS Slice (45% of 360 degrees = 162 degrees) */}
                            {/* Starts at 12 o'clock (0 degrees), goes 162 degrees clockwise */}
                            <path
                              d="M 80 80 L 80 20 A 60 60 0 0 1 98.541 137.063 Z"
                              fill="#ff9500"
                              className="hover:opacity-80 transition-opacity"
                            />
                            {/* GCP Slice (30% of 360 degrees = 108 degrees) */}
                            {/* Starts where AWS ends (162 degrees), goes 108 degrees clockwise */}
                            <path
                              d="M 80 80 L 98.541 137.063 A 60 60 0 0 1 20 80 Z"
                              fill="#4285f4"
                              className="hover:opacity-80 transition-opacity"
                            />
                            {/* Azure Slice (25% of 360 degrees = 90 degrees) */}
                            {/* Starts where GCP ends (270 degrees), goes 90 degrees clockwise to complete the circle */}
                            <path
                              d="M 80 80 L 20 80 A 60 60 0 0 1 80 20 Z"
                              fill="#0078d4"
                              className="hover:opacity-80 transition-opacity"
                            />
                          </svg>

                          {/* Legend */}
                          <div className="absolute bottom-2 left-2 space-y-1 text-xs">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-orange-500 rounded"></div>
                              <span>AWS (45%)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-500 rounded"></div>
                              <span>GCP (30%)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-600 rounded"></div>
                              <span>Azure (25%)</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Resource Optimization Recommendations */}
                  <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Brain className="w-6 h-6 text-purple-600" />
                        <h4 className="text-lg font-bold text-gray-900">
                          AI Recommendations
                        </h4>
                        <Badge className="bg-green-100 text-green-700">
                          Live
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Resize EC2 Instances
                            </span>
                            <span className="text-green-600 font-bold">
                              $12K/mo
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            23 instances can be downsized
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Reserved Instances
                            </span>
                            <span className="text-blue-600 font-bold">
                              $8K/mo
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Convert 45 on-demand instances
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Storage Optimization
                            </span>
                            <span className="text-purple-600 font-bold">
                              $5K/mo
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Archive unused data volumes
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-4 py-2 mb-6 font-semibold">
              <AlertTriangle className="w-4 h-4 mr-2" />
              The Problem
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Today's Multi-Cloud Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In today's multi-cloud and hybrid-cloud world, organizations face
              unprecedented complexity. Traditional cloud management approaches
              are failing to deliver the control and efficiency you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Fragmented Control
                </h3>
                <p className="text-gray-600">
                  Juggling multiple, isolated provider consoles (AWS, Azure,
                  GCP) leads to a chaotic, incomplete view of your cloud estate.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Soaring Costs
                </h3>
                <p className="text-gray-600">
                  Reactive cost management, idle resources, and inefficient
                  configurations often lead to unexpected and avoidable
                  expenditures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Operational Inefficiencies
                </h3>
                <p className="text-gray-600">
                  Manual tracking, error-prone processes, and a lack of holistic
                  visibility hinder agility and consume valuable team time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Limited Insights
                </h3>
                <p className="text-gray-600">
                  Overloaded with raw data but starved for actionable
                  recommendations, making strategic decision-making difficult.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Security Gaps
                </h3>
                <p className="text-gray-600">
                  Decentralized visibility can lead to inconsistent security
                  policies and blind spots across your diverse cloud footprint.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Ready for a better solution?
                </h3>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Discover SkyBridge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-32 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2 mb-6 font-semibold">
              <CheckCircle className="w-4 h-4 mr-2" />
              Key Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How SkyBridge Empowers You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SkyBridge combines advanced machine learning with intuitive design
              to deliver unprecedented visibility and control over your
              multi-cloud infrastructure.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Badge className="bg-purple-100 text-purple-700 mb-4">
                  Unified Multi-Cloud Management
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Single Pane of Glass
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Seamlessly integrates with major cloud providers (initially
                  AWS, expandable to Azure, GCP) to aggregate all your
                  resources, usage, and billing data into one cohesive platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Eliminate dashboard fatigue with a unified view of all
                      cloud resources
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Gain holistic, real-time visibility across your entire
                      cloud footprint
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Control all your cloud resources from a single, intuitive
                      interface
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Card className="border-0 shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-300">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                      <h4 className="text-white font-medium">
                        Unified Cloud Dashboard
                      </h4>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {/* AWS Block with Hover Effect */}
                        <div className="bg-orange-100 rounded-lg p-3 text-center transition-all duration-200 ease-in-out hover:bg-orange-200 hover:shadow-md cursor-pointer">
                          <div className="text-orange-600 font-bold text-lg">
                            AWS
                          </div>
                          <div className="text-xs text-gray-600">
                            847 resources
                          </div>
                        </div>
                        {/* Azure Block with Hover Effect */}
                        <div className="bg-blue-100 rounded-lg p-3 text-center transition-all duration-200 ease-in-out hover:bg-blue-200 hover:shadow-md cursor-pointer">
                          <div className="text-blue-600 font-bold text-lg">
                            Azure
                          </div>
                          <div className="text-xs text-gray-600">
                            423 resources
                          </div>
                        </div>
                        {/* GCP Block with Hover Effect */}
                        <div className="bg-blue-50 rounded-lg p-3 text-center transition-all duration-200 ease-in-out hover:bg-blue-100 hover:shadow-md cursor-pointer">
                          <div className="text-blue-500 font-bold text-lg">
                            GCP
                          </div>
                          <div className="text-xs text-gray-600">
                            156 resources
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-8 bg-gray-100 rounded-md w-full"></div>
                        <div className="h-8 bg-gray-100 rounded-md w-full"></div>
                        <div className="h-8 bg-gray-100 rounded-md w-3/4"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="border-0 shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-300">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4">
                      <h4 className="text-white font-medium">
                        Cost Optimization Engine
                      </h4>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            Current Monthly Cost
                          </span>
                          <span className="text-red-600 font-bold">
                            $24,750
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            Optimized Cost
                          </span>
                          <span className="text-green-600 font-bold">
                            $14,850
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Potential Savings
                          </span>
                          <span className="text-blue-600 font-bold">
                            $9,900 (40%)
                          </span>
                        </div>
                      </div>
                      <div className="h-24 bg-gray-100 rounded-md w-full mb-4 relative">
                        {/* Simulated bar chart */}
                        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-red-500 opacity-20"></div>
                        <div className="absolute bottom-0 left-1/4 w-1/4 h-3/4 bg-orange-500 opacity-20"></div>
                        <div className="absolute bottom-0 left-2/4 w-1/4 h-1/2 bg-yellow-500 opacity-20"></div>
                        <div className="absolute bottom-0 left-3/4 w-1/4 h-1/4 bg-green-500 opacity-20"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 opacity-20 rounded"></div>
                          <span className="text-xs text-gray-600">
                            Idle Resources
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 opacity-20 rounded"></div>
                          <span className="text-xs text-gray-600">
                            Oversized Instances
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Badge className="bg-green-100 text-green-700 mb-4">
                  Intelligent Cost Optimization
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Save Smarter
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Leverages advanced Machine Learning (ML), specifically Random
                  Forest models, to analyze historical usage patterns and
                  accurately forecast future expenditures. Identifies
                  inefficiencies like idle resources, oversized instances, and
                  suboptimal pricing plans.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Move from reactive bill shock to proactive cost control
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Receive precise, actionable recommendations for
                      rightsizing and termination
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Get smarter pricing recommendations (Reserved Instances,
                      Savings Plans)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Badge className="bg-blue-100 text-blue-700 mb-4">
                  Proactive Resource Management
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Maximize Efficiency
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Beyond cost, SkyBridge monitors resource utilization (CPU,
                  memory, storage, network) across all services. It detects
                  underutilized assets and predicts future demands based on
                  usage trends.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Ensure your cloud resources are always aligned with actual
                      needs
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Avoid over-provisioning while maintaining performance
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Optimize your infrastructure's efficiency with AI-driven
                      recommendations
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Card className="border-0 shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-300">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                      <h4 className="text-white font-medium">
                        Resource Utilization Monitor
                      </h4>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              CPU Utilization
                            </span>
                            <span className="text-sm font-medium">23%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "23%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Memory Usage
                            </span>
                            <span className="text-sm font-medium">47%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: "47%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Storage Utilization
                            </span>
                            <span className="text-sm font-medium">72%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "72%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Network Throughput
                            </span>
                            <span className="text-sm font-medium">35%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: "35%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="border-0 shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-300">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                      <h4 className="text-white font-medium">
                        Interactive Dashboards
                      </h4>
                    </div>
                    <div className="p-6 bg-white">
                      {/* Dashboard Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b">
                        <h5 className="font-semibold text-gray-900">
                          Cloud Overview
                        </h5>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                      </div>

                      {/* Mini Charts Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Cost Trend Mini Chart */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
                          <div className="text-xs text-blue-600 font-medium mb-2">
                            Cost Trend
                          </div>
                          <svg className="w-full h-16" viewBox="0 0 100 40">
                            <path
                              d="M 5 35 Q 20 25 35 30 T 65 20 T 95 15"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />
                            <circle cx="95" cy="15" r="2" fill="#3b82f6" />
                          </svg>
                          <div className="text-xs text-gray-600">
                            $24.7K this month
                          </div>
                        </div>

                        {/* Resource Usage Mini Chart */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
                          <div className="text-xs text-green-600 font-medium mb-2">
                            Resource Usage
                          </div>
                          <div className="flex items-end space-x-1 h-16">
                            <div className="bg-green-500 w-2 h-8 rounded-sm"></div>
                            <div className="bg-green-500 w-2 h-12 rounded-sm"></div>
                            <div className="bg-green-500 w-2 h-6 rounded-sm"></div>
                            <div className="bg-green-500 w-2 h-10 rounded-sm"></div>
                            <div className="bg-green-500 w-2 h-14 rounded-sm"></div>
                            <div className="bg-green-500 w-2 h-9 rounded-sm"></div>
                            <div className="bg-green-500 w-2 h-11 rounded-sm"></div>
                          </div>
                          <div className="text-xs text-gray-600">
                            67% average
                          </div>
                        </div>
                      </div>

                      {/* Main Dashboard Area */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">
                            Real-time Metrics
                          </span>
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-500">Live</span>
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white rounded p-2 text-center">
                            <div className="text-lg font-bold text-blue-600">
                              847
                            </div>
                            <div className="text-xs text-gray-500">
                              Active Resources
                            </div>
                          </div>
                          <div className="bg-white rounded p-2 text-center">
                            <div className="text-lg font-bold text-green-600">
                              94%
                            </div>
                            <div className="text-xs text-gray-500">Uptime</div>
                          </div>
                          <div className="bg-white rounded p-2 text-center">
                            <div className="text-lg font-bold text-purple-600">
                              $47K
                            </div>
                            <div className="text-xs text-gray-500">Saved</div>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Tabs */}
                      <div className="flex space-x-4 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span className="text-gray-600">Cost Analysis</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-gray-600">Performance</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded"></div>
                          <span className="text-gray-600">Optimization</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Badge className="bg-indigo-100 text-indigo-700 mb-4">
                  User-Friendly Visualizations
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Clarity at a Glance
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Transforms complex cloud data into intuitive, interactive
                  dashboards and customizable reports. Provides clear visual
                  representations of cost trends, resource utilization, and
                  optimization opportunities.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Empower both technical and financial stakeholders with
                      accessible insights
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Understand your cloud health without needing deep
                      technical expertise
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Create tailored reports for financial accountability and
                      strategic planning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            {/* <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Badge className="bg-purple-100 text-purple-700 mb-4">
                  Secure & Role-Based Access
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Control & Compliance
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Features robust user authentication and Role-Based Access
                  Control (RBAC), allowing you to define precise permissions for
                  different team members (e.g., Admins, Financial Users,
                  Developers).
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Maintain stringent security posture across your cloud
                      accounts
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Enforce governance consistency with granular access
                      controls
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-700">
                      Ensure data security by controlling who sees what and who
                      can take action
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Card className="border-0 shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-300">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                      <h4 className="text-white font-medium">
                        Role-Based Access Control
                      </h4>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="font-medium">Admin</span>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            Full Access
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Finance</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">
                            Cost Data Only
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">Developer</span>
                          </div>
                          <Badge className="bg-purple-100 text-purple-700">
                            Resource View
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="font-medium">Auditor</span>
                          </div>
                          <Badge className="bg-gray-100 text-gray-700">
                            Read Only
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 mb-6 font-semibold">
              <CheckCircle className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How SkyBridge Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with SkyBridge is easy. Our platform does the
              heavy lifting so you can focus on making strategic decisions.
            </p>
          </div>

          {/* Process Steps - Fixed version with better visual flow */}
          <div className="relative">
            {/* Connection Line */}
            {/* <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 z-0"></div> */}

            <div className="grid md:grid-cols-5 gap-8">
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center p-4 transition-transform duration-300 transform bg-white rounded-xl shadow-md hover:shadow-purple-400 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Connect Your Clouds
                </h3>
                <p className="text-gray-600 text-center">
                  Securely link your AWS (and soon Azure, GCP) accounts to
                  SkyBridge.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center p-4 transition-transform duration-300 transform bg-white rounded-xl shadow-md hover:shadow-blue-400 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Intelligent Data Ingestion
                </h3>
                <p className="text-gray-600 text-center">
                  SkyBridge automatically collects and normalizes vast amounts
                  of usage, billing, and resource metadata.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center p-4 transition-transform duration-300 transform bg-white rounded-xl shadow-md hover:shadow-indigo-400 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Intelligent Cloud Insights
                </h3>
                <p className="text-gray-600 text-center">
                  Our models analyze your data, predict future costs,
                  identify inefficiencies, and spot anomalies.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center p-4 transition-transform duration-300 transform bg-white rounded-xl shadow-md hover:shadow-pink-400 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Actionable Insights
                </h3>
                <p className="text-gray-600 text-center">
                  Receive clear, prioritized recommendations and visualize your
                  entire cloud landscape on intuitive dashboards.
                </p>
              </div>

              {/* Step 5 */}
              <div className="relative z-10 flex flex-col items-center p-4 transition-transform duration-300 transform bg-white rounded-xl shadow-md hover:shadow-red-400 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  5
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Optimize & Save
                </h3>
                <p className="text-gray-600 text-center">
                  Implement recommended changes to reduce costs, enhance
                  performance, and gain ultimate control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section
        id="why-skybridge"
        className="py-32 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-4 py-2 mb-6 font-semibold">
              <CheckCircle className="w-4 h-4 mr-2" />
              Why SkyBridge
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your Unique Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SkyBridge isn't just another cloud management tool. We've built a
              platform that truly transforms how you operate in the cloud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Cloud className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  True Cloud-Agnosticism
                </h3>
                <p className="text-gray-600">
                  Not just multi-cloud compatible, but built from the ground up
                  for a unified cross-platform experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Brain className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Intelligent & Proactive
                </h3>
                <p className="text-gray-600">
                  Moves beyond mere monitoring to deliver predictive analytics
                  and actionable recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Simplicity Meets Power
                </h3>
                <p className="text-gray-600">
                  Designed for ease of use without sacrificing the deep insights
                  required by enterprises.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Sustainable Savings
                </h3>
                <p className="text-gray-600">
                  Continuously identifies new opportunities to reduce costs and
                  optimize resource allocation.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-blue-50 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Future-Ready Platform
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Designed for tomorrow's cloud, SkyBridge offers a scalable foundation constantly evolving to integrate real-time analytics, intelligent automation.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Learn About Our Roadmap
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 border border-white rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 border border-white rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 mb-6 font-semibold">
              <Brain className="w-4 h-4 mr-2" />
              Start Your Cloud Optimization Journey
            </Badge>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Transform Your
            <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
              Cloud Operations
            </span>
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the power of AI-driven cloud management. Reduce costs by
            40%, improve efficiency, and gain unprecedented visibility across
            your entire multi-cloud infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-50 hover:scale-105 px-10 py-4 text-lg font-semibold rounded-lg shadow-xl transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Get Your Cloud Cost Analysis
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">
                No credit card required
              </span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Setup in minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">SkyBridge</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Intelligent cloud operations platform powered by advanced
                machine learning.
              </p>
            </div>

            
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Webinars
                  </a>
                </li>
              </ul>
            </div>

           
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

         
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
            &copy; {new Date().getFullYear()} SkyBridge. All rights reserved.
          </div>
        </div>
      </footer> */}
    </div>
    )}
    </div>
  );

};
export default  SkyBridgeLanding; 
