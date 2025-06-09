"use client"



/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppSidebar } from '@/components/app-sidebar'
import { Dashboardui } from '@/components/dashboard-component';
import Navbar from '@/components/nav-bar-component';
import CostCalculator from "@/components/cost-calculator"
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
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout';

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
    <BasicSidebarLayout>
      <CostCalculator />
    </BasicSidebarLayout>
  );
}
