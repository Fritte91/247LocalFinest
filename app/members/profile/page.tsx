"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Leaf, User, MapPin, Phone, Mail, Calendar, Edit, Save, X, Package, Star, Shield } from "lucide-react"
import { useApp } from "@/lib/context"

export default function ProfilePage() {
  const { isAdmin } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    memberSince: "2023-01-15",
    totalOrders: 24,
    favoriteCategory: "Flowers",
  })

  const [editData, setEditData] = useState({ ...profileData })

  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 127.5,
      status: "Delivered",
      items: ["Purple Haze Premium", "Artisan Glass Pipe"],
    },
    {
      id: "ORD-002",
      date: "2024-01-08",
      total: 85.0,
      status: "Delivered",
      items: ["OG Kush Indoor"],
    },
    {
      id: "ORD-003",
      date: "2024-01-01",
      total: 42.0,
      status: "Processing",
      items: ["Hybrid Balance"],
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/members" className="text-sage-300 hover:text-white font-medium transition-colors">
                Shop
              </Link>
              <Link href="/members/community" className="text-sage-300 hover:text-white font-medium transition-colors">
                Community
              </Link>
              <Link href="/members/growers" className="text-sage-300 hover:text-white font-medium transition-colors">
                Growers
              </Link>
              <Button variant="outline" className="border-sage-600 text-white border-b-2 border-forest-500">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">My Profile</h1>
          <p className="text-xl text-sage-300">Manage your account information and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-sage-950 border border-sage-700 h-12">
            <TabsTrigger value="profile" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-forest-600 data-[state=active]:text-white"
            >
              <Star className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-sage-950 border-sage-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white font-display">Personal Information</CardTitle>
                    <CardDescription className="text-sage-300">
                      Update your account details and contact information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditing(true)} className="premium-gradient">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      {isAdmin && (
                        <Link href="/admin">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <Shield className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="premium-gradient">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="border-sage-600 text-sage-300">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Member Stats */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="dark-glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-forest-400">{profileData.totalOrders}</div>
                    <div className="text-sage-300 text-sm">Total Orders</div>
                  </div>
                  <div className="dark-glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gold-400">Premium</div>
                    <div className="text-sage-300 text-sm">Member Status</div>
                  </div>
                  <div className="dark-glass rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-forest-400">
                      {new Date(profileData.memberSince).getFullYear()}
                    </div>
                    <div className="text-sage-300 text-sm">Member Since</div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sage-300 font-medium">Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={editData.fullName}
                        onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white">
                        {profileData.fullName}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sage-300 font-medium">Email Address</Label>
                    {isEditing ? (
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                        <Input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="pl-12 bg-black border-sage-700 text-white"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white flex items-center gap-3">
                        <Mail className="h-5 w-5 text-sage-400" />
                        {profileData.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sage-300 font-medium">Phone Number</Label>
                    {isEditing ? (
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                        <Input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="pl-12 bg-black border-sage-700 text-white"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white flex items-center gap-3">
                        <Phone className="h-5 w-5 text-sage-400" />
                        {profileData.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sage-300 font-medium">Date of Birth</Label>
                    {isEditing ? (
                      <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                        <Input
                          type="date"
                          value={editData.dateOfBirth}
                          onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                          className="pl-12 bg-black border-sage-700 text-white"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-sage-400" />
                        {new Date(profileData.dateOfBirth).toISOString().slice(0, 10)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-forest-500" />
                    <h3 className="text-xl font-semibold text-white">Address Information</h3>
                  </div>

                  <div>
                    <Label className="text-sage-300 font-medium">Street Address</Label>
                    {isEditing ? (
                      <Input
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white">
                        {profileData.address}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sage-300 font-medium">City</Label>
                      {isEditing ? (
                        <Input
                          value={editData.city}
                          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                          className="mt-2 bg-black border-sage-700 text-white"
                        />
                      ) : (
                        <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white">
                          {profileData.city}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sage-300 font-medium">State</Label>
                      {isEditing ? (
                        <Input
                          value={editData.state}
                          onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                          className="mt-2 bg-black border-sage-700 text-white"
                        />
                      ) : (
                        <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white">
                          {profileData.state}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sage-300 font-medium">Zip Code</Label>
                      {isEditing ? (
                        <Input
                          value={editData.zipCode}
                          onChange={(e) => setEditData({ ...editData, zipCode: e.target.value })}
                          className="mt-2 bg-black border-sage-700 text-white"
                        />
                      ) : (
                        <div className="mt-2 p-3 bg-black border border-sage-700 rounded-md text-white">
                          {profileData.zipCode}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-sage-950 border-sage-800">
              <CardHeader>
                <CardTitle className="text-white font-display">Order History</CardTitle>
                <CardDescription className="text-sage-300">View your recent purchases and order status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="dark-glass rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">Order {order.id}</h4>
                          <p className="text-sage-300">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">${order.total.toFixed(2)}</div>
                          <Badge
                            className={
                              order.status === "Delivered"
                                ? "bg-forest-600 text-white"
                                : order.status === "Processing"
                                  ? "bg-gold-600 text-white"
                                  : "bg-sage-600 text-white"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <Badge key={index} variant="outline" className="border-sage-500 text-sage-400">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="bg-sage-950 border-sage-800">
              <CardHeader>
                <CardTitle className="text-white font-display">Preferences</CardTitle>
                <CardDescription className="text-sage-300">Customize your shopping experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="dark-glass rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Favorite Category</h4>
                    <Badge className="premium-gradient text-white">{profileData.favoriteCategory}</Badge>
                  </div>

                  <div className="dark-glass rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Notification Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-300">New product alerts</span>
                        <Badge className="bg-forest-600 text-white">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sage-300">Order updates</span>
                        <Badge className="bg-forest-600 text-white">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sage-300">Promotional offers</span>
                        <Badge className="bg-sage-600 text-white">Disabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
