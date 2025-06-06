/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

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

// This is sample data.
const data = {
  user: {
    name: "Sauradip Ghosh",
    email: "sauradip96ghosh@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Sauradip AWS",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Sauradip GCP",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Sauradip Azure",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Network",
          url: "#",
        },
        {
          title: "Public",
          url: "#",
        },
        {
          title: "Private",
          url: "#",
        },
      ],
    },
    {
      title: "Compute",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "EC2",
          url: "#",
        },
        {
          title: "ECS",
          url: "#",
        },
      ],
    },
    {
      title: "Storage",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "S3",
          url: "#",
        },
        {
          title: "EBS",
          url: "#",
        },
        {
          title: "EFS",
          url: "#",
        },
        {
          title: "DynamoDB",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Recommendations",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Compare",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
