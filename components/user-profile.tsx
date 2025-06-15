"use client"

import { useUser } from "@clerk/nextjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Briefcase,
  Edit,
  Settings,
  Shield,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Please sign in to view your profile.</div>

  const fullName = user.fullName || "Unknown"
  const email = user.primaryEmailAddress?.emailAddress || "Not available"
  const avatar = user.imageUrl || ""
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
  const role = user.publicMetadata?.role || "N/A"
  const status = user.publicMetadata?.status || "Active"
  const userId = user.id
  const lastLoginRaw = user.lastSignInAt || user.createdAt
  const lastLogin = lastLoginRaw ? new Date(lastLoginRaw).toLocaleString() : "N/A"
  const router = useRouter()
  const handleRoleAuth = () => {
    router.push('/role-auth')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleRoleAuth}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Main Profile Card */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={avatar} alt={fullName} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <Badge variant={status === "Active" ? "default" : "secondary"} className="mb-2">
                    <>
                        <Shield className="h-3 w-3 mr-1" />
                        {status}
                    </>
                </Badge>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Last login: {lastLogin}
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">User ID</p>
                      <p className="font-medium break-all">{userId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Account Type</h4>
                <p className="text-gray-600">Professional</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Subscription</h4>
                <p className="text-gray-600">Free Plan</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Two-Factor Auth</h4>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Enabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
