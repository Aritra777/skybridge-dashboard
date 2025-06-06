/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { sidebar_defination } from '@/constants/sidebar'
import { useRouter } from "next/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const route = useRouter();
  const navigateToConnectCloud = () => route.push("/connect");
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebar_defination.teams} end_btn_action={navigateToConnectCloud} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebar_defination.navMain} />
        <NavProjects projects={sidebar_defination.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebar_defination.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
