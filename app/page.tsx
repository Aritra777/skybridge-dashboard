// "use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Menu, Plus, X } from "lucide-react";
import DismissibleBanner from "../components/ui/DismissibleBanner";
import Image from "next/image";
import profile from "../public/image/SkyBridge.svg";
import Head from "next/head";


export default function CloudQueryLanding() {
  return (
    
    <div >
      
      <div className="min-h-screen ">
        <DismissibleBanner />
        {/* <div className="bg-emerald-600  text-black px-4 py-2 text-center text-sm">
        <span>CloudQuery is now SOC 2 Type II Certified!</span> */}
        {/* <a href="#" className="ml-2 underline hover:no-underline">
          Learn more →
        </a> */}
        {/* <button className="absolute right-4 top-2  text-black hover:text-gray-200">
          <X className="h-4 w-4" />
        </button> */}
        {/* </div> */}

        {/* Navigation */}
        <nav className="px-8 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src={profile}
                width={40}
                height={40}
                alt="Picture of the author"
              />
              <span className=" text-black text-xl font-semibold">
                CloudQuery
              </span>
            </div>

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-1  text-black hover:text-emerald-400 cursor-pointer">
                <span>Platform</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-1  text-black hover:text-emerald-400 cursor-pointer">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-1  text-black hover:text-emerald-400 cursor-pointer">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <a href="#" className=" text-black hover:text-emerald-400">
                Integrations
              </a>
              <a href="#" className=" text-black hover:text-emerald-400">
                Pricing
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className=" text-black hover:text-emerald-400 hover:bg-transparent"
              >
                Sign in
              </Button>
              <Button className="hidden sm:block bg-emerald-500 hover:bg-emerald-600  text-black">
                Get a demo
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="px-4 lg:px-8 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center ">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6 w-full sm:px-6 lg:px-8 overflow-x-hidden">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold  text-black leading-snug break-words w-full">
                  Bringing <span className="text-emerald-400">Clarity</span>{" "}
                  into{" "}
                  <span className="text-emerald-400">
                    Cloud Infrastructure.
                  </span>
                </h1>

                <p className="text-base sm:text-xl  text-black leading-relaxed break-words w-full">
                  The developer-first cloud governance platform for full
                  visibility into security, compliance, and cost.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full max-w-full overflow-x-hidden">
                <Button className="bg-emerald-500 hover:bg-emerald-600  text-black px-4 py-2 text-base w-full sm:w-auto">
                  Contact Sales
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover: text-black px-4 py-2 text-base w-full sm:w-auto"
                >
                  Try a Live Demo
                </Button>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="border border-slate-900 rounded-xl p-4 space-y-6 ">
              <div className="space-y-6">
                {/* AWS Web App */}
                <div className="bg-green-300 backdrop-blur border border-green-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center  text-black text-xs font-bold">
                        aws
                      </div>
                      <div>
                        <div className=" text-black font-medium">web-app</div>
                        <div className=" text-black text-sm">EC2</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className=" text-black">via</span>
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className=" text-black">eu-central-1</span>
                      <span className="text-blue-400 font-medium">
                        $58 (+5%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sales VM */}
                <div className="bg-green-300 backdrop-blur border border-green-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center  text-black text-xs font-bold">
                        A
                      </div>
                      <div>
                        <div className=" text-black font-medium">sales-vm</div>
                        <div className=" text-black text-sm">
                          Virtual Machine
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className=" text-black">via</span>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className=" text-black">east-us</span>
                      <span className="text-orange-400 font-medium">
                        5 alerts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Frontend App */}
                <div className="bg-green-300 backdrop-blur border border-green-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center  text-black text-xs font-bold">
                        G
                      </div>
                      <div>
                        <div className=" text-black font-medium">
                          frontend-app
                        </div>
                        <div className=" text-black text-sm">
                          Compute Engine
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className=" text-black">via</span>
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className=" text-black">us-central-1</span>
                      <span className="text-red-400 font-medium">
                        5 CIS violations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Trusted By Section */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className=" text-black text-lg mb-8">Trusted by</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
                <div className=" text-black text-2xl font-bold">zendesk</div>
                <div className=" text-black text-2xl font-bold">Infosys</div>
                <div className=" text-black text-2xl font-bold">
                  AURORA LABS
                </div>
                <div className=" text-black text-2xl font-bold">paloalto</div>
                <div className=" text-black text-2xl font-bold">
                  INSTRUCTURE
                </div>
                <div className=" text-black text-2xl font-bold flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full mr-2"></div>
                  reddit
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="min-h-screen   text-black">
        {/* Navigation */}
        {/* <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"> */}
        {/* Logo */}
        {/* <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center relative">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className=" text-black text-xl font-semibold">CloudQuery</span>
          </div> */}

        {/* Desktop Navigation */}
        {/* <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-1  text-black hover:text-emerald-400 cursor-pointer">
              <span>Platform</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1  text-black hover:text-emerald-400 cursor-pointer">
              <span>Solutions</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1  text-black hover:text-emerald-400 cursor-pointer">
              <span>Resources</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#" className=" text-black hover:text-emerald-400">
              Integrations
            </a>
            <a href="#" className=" text-black hover:text-emerald-400">
              Pricing
            </a>
          </div> */}

        {/* CTA Buttons */}
        {/* <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="hidden lg:flex border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover: text-black"
            >
              Sign in
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600  text-black">Get a demo</Button>
            <Button variant="ghost" className="lg:hidden p-1">
              <Menu className="w-6 h-6" />
            </Button>
          </div> */}
        {/* </div>
      </header> */}

        <main className="relative">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Connect. Discover. Control.
            </h1>
            <p className="text-lg lg:text-xl  text-black max-w-4xl mx-auto mb-16">
              Connect your cloud environment, uncover your cloud assets and gain
              insights into security, compliance and cost at scale.
            </p>

            {/* Integration Diagram */}
            <div className="relative max-w-5xl mx-auto mb-20">
              {/* Cloud Services Row */}
              <div className="flex justify-center items-center space-x-6 lg:space-x-12 mb-8">
                {/* Google Cloud */}
                <div className="w-16 h-16 lg:w-20 lg:h-20   rounded-2xl flex items-center justify-center">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className=" text-black text-2xl">❄</span>
                  </div>
                </div>

                {/* WIZ */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-800 rounded-2xl flex items-center justify-center">
                  <span className=" text-black font-bold text-lg">WIZ</span>
                </div>

                {/* AWS */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-800 rounded-2xl flex items-center justify-center">
                  <div className="text-orange-400 font-bold text-lg">aws</div>
                </div>

                {/* Kubernetes */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-800  rounded-2xl flex items-center justify-center">
                  <div className="w-12 h-12 lg:w-14 lg:h-14  rounded-xl flex items-center justify-center">
                    <span className=" text-blue-600 text-2xl">⎈</span>
                  </div>
                </div>

                {/* Terraform */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-800 rounded-2xl flex items-center justify-center">
                  <div className="w-12 h-12 lg:w-14 lg:h-14  rounded-xl flex items-center justify-center">
                    <span className=" text-orange-500 text-2xl">T</span>
                  </div>
                </div>

                {/* Plus */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-800 rounded-2xl flex items-center justify-center">
                  <Plus className=" text-black w-8 h-8" />
                </div>
              </div>

              {/* Connection Lines */}
              <div className="relative h-24 mb-8">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 100"
                  fill="none"
                >
                  {/* Curved connection lines from each service to center */}
                  <path
                    d="M133,20 Q133,60 400,60"
                    stroke="#4B5563"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M233,20 Q233,50 400,60"
                    stroke="#4B5563"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M333,20 Q333,40 400,60"
                    stroke="#4B5563"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M467,20 Q467,40 400,60"
                    stroke="#4B5563"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M567,20 Q567,50 400,60"
                    stroke="#4B5563"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M667,20 Q667,60 400,60"
                    stroke="#4B5563"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Vertical line down */}
                  <path
                    d="M400,60 L400,100"
                    stroke="#10B981"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </div>

              {/* CloudQuery Central Logo */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-emerald-500 rounded-2xl flex items-center justify-center">
                  {/* <div className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-500 rounded-xl flex items-center justify-center relative">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full"></div>
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full"></div>
                  </div> */}
                  <Image
                    src={profile}
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Connection Line for Features */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-96 bottom-0 w-0.5 bg-emerald-500 opacity-50"></div>

          {/* Features Section */}
          <div className="max-w-7xl mx-auto px-4 pb-20">
            {/* Feature 1: Unified Asset Inventory - LEFT SIDE */}
            <div className="relative mb-32">
              {/* Connection Line to Left */}
              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 w-32 h-0.5 bg-emerald-500"></div>

              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 -translate-y-0.5 w-0.5 h-16 bg-emerald-500"></div>

              <div className="grid lg:grid-cols-2 gap-8 pt-20">
                {/* Left Side Content */}
                <div className="lg:text-right lg:pr-8">
                  {/* AWS Card */}
                  <div className="inline-block bg-slate-800 rounded-xl p-6 mb-8">
                    <div className="flex items-center space-x-3 text-sm  text-white">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className=" text-black text-xs font-bold">
                          aws
                        </span>
                      </div>
                      <span>web-app</span>
                      <span>EC2</span>
                      <span>eu-central-1</span>
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Unified Asset Inventory
                  </h2>
                  <p className=" text-black text-lg mb-8">
                    Gain full visibility into your cloud infrastructure- track,
                    query, and analyze all resources across AWS, GCP, Azure, and
                    SaaS in one place. Easily identify ownership, relationship,
                    and changes in real time.
                  </p>
                  <Button
                    variant="link"
                    className="text-emerald-400 hover:text-emerald-300 p-0 text-lg"
                  >
                    Learn more <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="hidden lg:block"></div>
              </div>
            </div>

            {/* Feature 2: Cost Optimization & FinOps - RIGHT SIDE */}
            <div className="relative mb-32">
              {/* Connection Line to Right */}
              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 w-32 h-0.5 bg-emerald-500"></div>

              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 -translate-y-0.5 w-0.5 h-16 bg-emerald-500"></div>

              <div className="grid lg:grid-cols-2 gap-8 pt-20">
                <div className="hidden lg:block"></div>
                {/* Right Side Content */}
                <div className="lg:pl-8">
                  {/* Cost Chart */}
                  <div className="bg-slate-800 rounded-xl p-6 mb-6">
                    {/* Legend */}
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                        <span className="text-sm  text-white">Engineering</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-sm  text-white">Marketing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        <span className="text-sm  text-white">Sales</span>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="relative">
                      <div className=" text-white text-sm mb-2">$10k</div>
                      <div className="flex items-end space-x-2 h-32 mb-2">
                        {[
                          { height: 60, color: "bg-emerald-400" },
                          { height: 45, color: "bg-blue-400" },
                          { height: 30, color: "bg-orange-400" },
                          { height: 80, color: "bg-emerald-400" },
                          { height: 55, color: "bg-blue-400" },
                          { height: 35, color: "bg-orange-400" },
                          { height: 75, color: "bg-emerald-400" },
                          { height: 90, color: "bg-blue-400" },
                          { height: 40, color: "bg-orange-400" },
                        ].map((bar, i) => (
                          <div
                            key={i}
                            className={`w-6 ${bar.color} rounded-t-lg`}
                            style={{ height: `${bar.height}%` }}
                          ></div>
                        ))}
                      </div>
                      <div className=" text-black text-sm">$0</div>
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Cost Optimization & FinOps
                  </h2>
                  <p className=" text-black text-lg mb-8">
                    Identify savings opportunities across your cloud
                    infrastructure with custom queries and use tagging to
                    understand what's driving spend. CloudQuery's FinOps
                    integrations allow you to maximise savings and fully explore
                    your spending.
                  </p>
                  <Button
                    variant="link"
                    className="text-emerald-400 hover:text-emerald-300 p-0 text-lg"
                  >
                    Learn more <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Feature 3: Security & Compliance - LEFT SIDE */}
            <div className="relative mb-32">
              {/* Connection Line to Left */}
              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 w-32 h-0.5 bg-emerald-500"></div>

              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 -translate-y-0.5 w-0.5 h-16 bg-emerald-500"></div>

              <div className="grid lg:grid-cols-2 gap-8 pt-20">
                {/* Left Side Content */}
                <div className="lg:text-right lg:pr-8">
                  {/* CIS Benchmark Card */}
                  <div className="inline-block bg-slate-800 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10   rounded-lg flex items-center justify-center">
                          <span className=" text-white text-xs font-bold">
                            CIS
                          </span>
                        </div>
                        <div>
                          <div className=" text-white text-sm font-medium">
                            AWS CIS Benchmark
                          </div>
                          <div className=" text-white text-xs">
                            Compliance & Security Policy
                          </div>
                        </div>
                      </div>
                      <div className="text-red-400 text-sm font-medium   px-3 py-1 rounded-full">
                        5 violations
                      </div>
                    </div>
                    <div className="text-sm  text-white mb-4">
                      <span className="text-orange-400 font-medium">117</span>{" "}
                      tag anomalies across{" "}
                      <span className="text-orange-400 font-medium">192</span>{" "}
                      resources
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        <span className="text-xs  text-white">
                          Tag anomalies
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3   rounded-full"></div>
                        <span className="text-xs  text-white">
                          Compliant Resources
                        </span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Security & Compliance
                  </h2>
                  <p className=" text-black text-lg mb-8">
                    Enforce security and governance at scale with automated
                    policy checks, and compliance frameworks like CIS, NIST, SOC
                    2 and GDPR. Define and apply rules for tagging, access
                    control, and resource configuration to maintain consistency
                    across your cloud environments.
                  </p>
                  <Button
                    variant="link"
                    className="text-emerald-400 hover:text-emerald-300 p-0 text-lg"
                  >
                    Learn more <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="hidden lg:block"></div>
              </div>
            </div>

            {/* Feature 4: Data Pipelines (Zero-ETL) - RIGHT SIDE */}
            <div className="relative mb-32">
              {/* Connection Line to Right */}
              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 w-32 h-0.5 bg-emerald-500"></div>

              <div className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 -translate-y-0.5 w-0.5 h-16 bg-emerald-500"></div>

              <div className="grid lg:grid-cols-2 gap-8 pt-20">
                <div className="hidden lg:block"></div>
                {/* Right Side Content */}
                <div className="lg:pl-8">
                  {/* Service Icons Grid */}
                  <div className="inline-block bg-slate-800 rounded-xl p-7 mb-8 inline-block">
                    <div className="grid grid-cols-6 gap-3">
                      {[
                        { bg: "bg-emerald-500", icon: "✓" },
                        { bg: "bg-yellow-500", icon: "|||" },
                        { bg: "bg-purple-600", icon: "W" },
                        { bg: "bg-orange-500", icon: "aws" },
                        { bg: "bg-blue-500", icon: "A" },
                        { bg: "bg-blue-600", icon: "G" },
                        { bg: "bg-blue-400", icon: "⚙" },
                        { bg: "bg-gray-700", icon: "G" },
                        { bg: "bg-orange-600", icon: "C" },
                        { bg: "bg-purple-500", icon: "I" },
                        { bg: "bg-red-500", icon: "○" },
                        { bg: "bg-orange-700", icon: "F" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center  text-black text-sm font-bold`}
                        >
                          {item.icon}
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Data Pipelines (Zero-ETL)
                  </h2>
                  <p className=" text-black text-lg mb-8">
                    Break down data silos by moving cloud config data to any
                    data warehouse on any schedule- ensuring data freshness
                    while avoiding API throttling.
                  </p>
                  <Button
                    variant="link"
                    className="text-emerald-400 hover:text-emerald-300 p-0 text-lg"
                  >
                    Learn more <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="h-10"></div>
      <footer className=" py-20 mt-auto">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
            {/* Logo and Newsletter */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-xl  text-black font-semibold">
                  CloudQuery
                </span>
              </div>

              <div>
                <h3 className="text-lg  text-black font-medium mb-6">
                  Get Weekly Cloud Governance Insights
                </h3>
                <div className="space-y-10">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="bg-[#1e293b] border border-slate-700  text-white placeholder: text-white rounded-md h-12 w-full text-center"
                  />
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600  text-black h-12 rounded-md">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Product use cases */}
            <div className="lg:ml-10 lg:col-span-2 padd">
              <h4 className="font-medium mb-6  text-black">
                Product use cases
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Cloud Asset Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Security & Compliance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    FinOps & Cost Transparency
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Platform Engineering
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:ml-10 lg:col-span-2 padd">
              <h4 className="font-medium mb-6  text-black">Resources</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:ml-10 lg:col-span-2 padd">
              <h4 className="font-medium mb-6  text-black">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Legal
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Trust Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Opt in to data collection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" text-black hover: text-black transition-colors"
                  >
                    Opt out of data collection
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div className="lg:col-span-2">
              {/* <div className="flex flex-col space-y-5">
                <a href="#" className=" text-black hover: text-black transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className=" text-black hover: text-black transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className=" text-black hover: text-black transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className=" text-black hover: text-black transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className=" text-black hover: text-black transition-colors">
                  <Users className="w-5 h-5" />
                </a>
              </div> */}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-12 border-t border-slate-800">
            <p className="text-sm  text-black">
              © 2025 CloudQuery, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
