"use client"



/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppSidebar } from '@/components/app-sidebar'
import { Dashboardui } from '@/components/dashboard-component';
import Navbar from '@/components/nav-bar-component';
import ComputeDashboard from "@/components/compute-dashboard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { use } from 'react';
import CloudPricingComparison from '@/components/cloud-pricing-comparison';

const handleConnectCloud = () => {
      // re-direct to the Connct-Cloud page
      window.location.href = "/connect";
};
const handleDashboard = () => {
      // re-direct to the Connct-Cloud page
      window.location.href = "/dashboard";
};
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Navbar handleConnectCloud={handleConnectCloud} handleDashboard={handleDashboard} />
          </div>
        </header>
        <CloudPricingComparison />
      </SidebarInset>
    </SidebarProvider>
  );
}
