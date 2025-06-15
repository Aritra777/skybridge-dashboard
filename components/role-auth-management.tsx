"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, Shield, Building, Plus, Edit, Trash2, Settings, Eye, Lock, UserCheck, Crown, Key } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  level: "admin" | "manager" | "user" | "viewer"
  color: string
  userCount: number
}

interface Organization {
  id: string
  name: string
  description: string
  domain: string
  userCount: number
  roles: string[]
  status: "active" | "inactive"
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  organization: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
}

export default function RoleAuthManagement() {
  const [activeTab, setActiveTab] = useState("roles")
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false)

  // Sample data
  const permissions: Permission[] = [
    { id: "read_users", name: "Read Users", description: "View user information", category: "User Management" },
    { id: "write_users", name: "Write Users", description: "Create and edit users", category: "User Management" },
    { id: "delete_users", name: "Delete Users", description: "Remove users from system", category: "User Management" },
    { id: "read_roles", name: "Read Roles", description: "View role information", category: "Role Management" },
    { id: "write_roles", name: "Write Roles", description: "Create and edit roles", category: "Role Management" },
    { id: "delete_roles", name: "Delete Roles", description: "Remove roles from system", category: "Role Management" },
    { id: "read_orgs", name: "Read Organizations", description: "View organization data", category: "Organization" },
    { id: "write_orgs", name: "Write Organizations", description: "Manage organizations", category: "Organization" },
    { id: "read_analytics", name: "Read Analytics", description: "View system analytics", category: "Analytics" },
    { id: "write_analytics", name: "Write Analytics", description: "Manage analytics settings", category: "Analytics" },
    { id: "system_admin", name: "System Admin", description: "Full system access", category: "System" },
    { id: "billing_access", name: "Billing Access", description: "Access billing information", category: "Billing" },
  ]

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      permissions: permissions.map((p) => p.id),
      level: "admin",
      color: "bg-red-100 text-red-800",
      userCount: 2,
    },
    {
      id: "2",
      name: "Organization Admin",
      description: "Manage organization users and settings",
      permissions: ["read_users", "write_users", "read_roles", "write_roles", "read_orgs", "read_analytics"],
      level: "admin",
      color: "bg-blue-100 text-blue-800",
      userCount: 5,
    },
    {
      id: "3",
      name: "Manager",
      description: "Team management and analytics access",
      permissions: ["read_users", "write_users", "read_roles", "read_analytics"],
      level: "manager",
      color: "bg-green-100 text-green-800",
      userCount: 12,
    },
    {
      id: "4",
      name: "User",
      description: "Standard user with basic permissions",
      permissions: ["read_users"],
      level: "user",
      color: "bg-purple-100 text-purple-800",
      userCount: 45,
    },
    {
      id: "5",
      name: "Viewer",
      description: "Read-only access to system",
      permissions: ["read_users", "read_analytics"],
      level: "viewer",
      color: "bg-gray-100 text-gray-800",
      userCount: 23,
    },
  ])

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "1",
      name: "TechCorp Inc.",
      description: "Technology solutions company",
      domain: "techcorp.com",
      userCount: 45,
      roles: ["1", "2", "3", "4"],
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "StartupXYZ",
      description: "Innovative startup company",
      domain: "startupxyz.io",
      userCount: 23,
      roles: ["2", "3", "4", "5"],
      status: "active",
      createdAt: "2023-06-20",
    },
    {
      id: "3",
      name: "Enterprise Solutions",
      description: "Large enterprise organization",
      domain: "enterprise.com",
      userCount: 156,
      roles: ["1", "2", "3", "4", "5"],
      status: "active",
      createdAt: "2022-11-08",
    },
  ])

  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@techcorp.com",
      role: "Super Admin",
      organization: "TechCorp Inc.",
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@startupxyz.io",
      role: "Organization Admin",
      organization: "StartupXYZ",
      status: "active",
      lastLogin: "1 day ago",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@enterprise.com",
      role: "Manager",
      organization: "Enterprise Solutions",
      status: "active",
      lastLogin: "3 hours ago",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@techcorp.com",
      role: "User",
      organization: "TechCorp Inc.",
      status: "pending",
      lastLogin: "Never",
    },
  ]

  const getRoleIcon = (level: string) => {
    switch (level) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "manager":
        return <UserCheck className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      case "viewer":
        return <Eye className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getPermissionsByCategory = () => {
    const categories: Record<string, Permission[]> = {}
    permissions.forEach((permission) => {
      if (!categories[permission.category]) {
        categories[permission.category] = []
      }
      categories[permission.category].push(permission)
    })
    return categories
  }

  const CreateRoleDialog = () => (
    <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>Define a new role with specific permissions</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input id="roleName" placeholder="Enter role name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleLevel">Role Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="roleDescription">Description</Label>
            <Textarea id="roleDescription" placeholder="Describe the role's purpose" />
          </div>
          <div className="space-y-4">
            <Label>Permissions</Label>
            {Object.entries(getPermissionsByCategory()).map(([category, perms]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">{category}</h4>
                <div className="grid grid-cols-1 gap-2 pl-4">
                  {perms.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox id={permission.id} />
                      <Label htmlFor={permission.id} className="text-sm">
                        {permission.name}
                        <span className="text-gray-500 ml-2">- {permission.description}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateRoleOpen(false)}>Create Role</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const CreateOrgDialog = () => (
    <Dialog open={isCreateOrgOpen} onOpenChange={setIsCreateOrgOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>Set up a new organization with custom settings</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input id="orgName" placeholder="Enter organization name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orgDomain">Domain</Label>
            <Input id="orgDomain" placeholder="company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orgDescription">Description</Label>
            <Textarea id="orgDescription" placeholder="Describe the organization" />
          </div>
          <div className="space-y-2">
            <Label>Available Roles</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox id={`org-role-${role.id}`} />
                  <Label htmlFor={`org-role-${role.id}`} className="text-sm">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateOrgOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateOrgOpen(false)}>Create Organization</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Role-Based Access Control</h1>
            <p className="text-gray-600 mt-2">Manage roles, permissions, and organizations</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIsCreateRoleOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Role
            </Button>
            <Button onClick={() => setIsCreateOrgOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Organization
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Roles List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Roles</CardTitle>
                    <CardDescription>Manage system roles and their permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roles.map((role) => (
                        <div
                          key={role.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedRole?.id === role.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedRole(role)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getRoleIcon(role.level)}
                              <div>
                                <h3 className="font-semibold">{role.name}</h3>
                                <p className="text-sm text-gray-600">{role.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={role.color}>{role.level}</Badge>
                              <span className="text-sm text-gray-500">{role.userCount} users</span>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Role Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Role Details</CardTitle>
                    <CardDescription>
                      {selectedRole ? `Details for ${selectedRole.name}` : "Select a role to view details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedRole ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Permissions</h4>
                          <div className="space-y-2">
                            {selectedRole.permissions.map((permId) => {
                              const perm = permissions.find((p) => p.id === permId)
                              return perm ? (
                                <div key={permId} className="flex items-center gap-2">
                                  <Key className="h-3 w-3 text-green-500" />
                                  <span className="text-sm">{perm.name}</span>
                                </div>
                              ) : null
                            })}
                          </div>
                        </div>
                        <div className="pt-4 border-t">
                          <Button className="w-full" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No role selected</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {organizations.map((org) => (
                <Card key={org.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5" />
                        <div>
                          <CardTitle>{org.name}</CardTitle>
                          <CardDescription>{org.domain}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={org.status === "active" ? "default" : "secondary"}>{org.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{org.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Users:</span>
                          <span className="ml-2 font-medium">{org.userCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Roles:</span>
                          <span className="ml-2 font-medium">{org.roles.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Created:</span>
                          <span className="ml-2 font-medium">{org.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and their role assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 font-semibold">User</th>
                        <th className="text-left p-4 font-semibold">Role</th>
                        <th className="text-left p-4 font-semibold">Organization</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Last Login</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="p-4">{user.organization}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{user.lastLogin}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(getPermissionsByCategory()).map(([category, perms]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                    <CardDescription>Permissions in this category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {perms.map((permission) => (
                        <div key={permission.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{permission.name}</h4>
                              <p className="text-sm text-gray-600">{permission.description}</p>
                            </div>
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <CreateRoleDialog />
        <CreateOrgDialog />
      </div>
    </div>
  )
}
