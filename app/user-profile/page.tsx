// app/user-profile/page.tsx
"use client"

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import UserProfile from "@/components/user-profile"
import { BasicSidebarLayout } from "@/components/basic_sidebar_layout"
export default function UserProfilePage() {
  const { user } = useUser()

  if (!user) return <div>Loading...</div>

  return (
    <BasicSidebarLayout>
        <UserProfile />
   </BasicSidebarLayout>
  )
}
