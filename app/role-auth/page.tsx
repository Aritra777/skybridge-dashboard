// app/user-profile/page.tsx
"use client"

import { useUser } from "@clerk/nextjs"
import { BasicSidebarLayout } from "@/components/basic_sidebar_layout"
import RoleAuthManagement from "@/components/role-auth-management"

export default function RoleAuth() {
  const { user } = useUser()

  if (!user) return <div>Loading...</div>

  return (
    <BasicSidebarLayout>
        <RoleAuthManagement />
   </BasicSidebarLayout>
  )
}