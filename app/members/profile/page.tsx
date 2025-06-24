"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Leaf, User, MapPin, Phone, Mail, Calendar, Edit, Save, X, Package, Star, Shield, LogOut, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { MobileNav } from "@/app/components/mobile-nav"

interface OrderItem {
  product: {
    name: string;
    price: number;
    image?: string;
    images?: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  tracking?: {
    trackingNumber: string;
    carrier: string;
    shippedAt?: string;
    deliveredAt?: string;
  };
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const isAdmin = session?.user?.role === 'admin'
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    buyerType: "retail",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    createdAt: "",
    totalOrders: 0,
    favoriteCategory: "Flowers",
  })

  const [editData, setEditData] = useState({ ...profileData })

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/user/profile')
        if (!response.ok) {
          throw new Error('Failed to fetch profile data')
        }
        const data = await response.json()
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : "",
          buyerType: data.buyerType || "retail",
          address: {
            street: data.address?.street || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zipCode: data.address?.zipCode || ""
          },
          createdAt: data.createdAt || "",
          totalOrders: 0,
          favoriteCategory: "Flowers",
        })
        setEditData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : "",
          buyerType: data.buyerType || "retail",
          address: {
            street: data.address?.street || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zipCode: data.address?.zipCode || ""
          },
          createdAt: data.createdAt || "",
          totalOrders: 0,
          favoriteCategory: "Flowers",
        })
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders?userId=' + session?.user?.id)
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(data)
        setProfileData(prev => ({
          ...prev,
          totalOrders: data.length
        }))
      } catch (error) {
        console.error('Error fetching orders:', error)
        toast({
          title: "Error",
          description: "Failed to load order history",
          variant: "destructive",
        })
      }
    }

    if (session) {
      fetchProfileData()
      fetchOrders()
    }
  }, [session, toast])

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600 text-white"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'processing':
        return <Badge className="bg-blue-600 text-white"><Package className="h-3 w-3 mr-1" />Processing</Badge>
      case 'shipped':
        return <Badge className="bg-forest-600 text-white"><Truck className="h-3 w-3 mr-1" />Shipped</Badge>
      case 'delivered':
        return <Badge className="bg-green-600 text-white"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>
      case 'cancelled':
        return <Badge className="bg-red-600 text-white"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editData.firstName,
          lastName: editData.lastName,
          phone: editData.phone,
          dateOfBirth: editData.dateOfBirth,
          address: editData.address,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedData = await response.json()
      setProfileData({
        ...profileData,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        phone: updatedData.phone,
        dateOfBirth: updatedData.dateOfBirth ? new Date(updatedData.dateOfBirth).toISOString().split('T')[0] : "",
        address: updatedData.address,
      })
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/signin' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
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
            </nav>

            <MobileNav 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              cartItemCount={0}
              currentPath="/members/profile"
            />
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="premium-gradient whitespace-nowrap">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSave} className="premium-gradient whitespace-nowrap">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" className="border-sage-600 text-sage-300 whitespace-nowrap">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {isAdmin && (
                      <Link href="/admin" className="w-full sm:w-auto">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full whitespace-nowrap">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="destructive"
                      className="border-red-700 text-white bg-red-600 hover:bg-red-700 hover:text-white whitespace-nowrap"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
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
                      {new Date(profileData.createdAt).getFullYear()}
                    </div>
                    <div className="text-sage-300 text-sm">Member Since</div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sage-300 font-medium">First Name</Label>
                    {isEditing ? (
                      <Input
                        value={editData.firstName}
                        onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                        className="mt-2 bg-transparent border-sage-700 text-white"
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white">
                        {profileData.firstName}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sage-300 font-medium">Last Name</Label>
                    {isEditing ? (
                      <Input
                        value={editData.lastName}
                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                        className="mt-2 bg-transparent border-sage-700 text-white"
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white">
                        {profileData.lastName}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sage-300 font-medium">Email Address</Label>
                    <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white flex items-center gap-3">
                      <Mail className="h-5 w-5 text-sage-400" />
                      {profileData.email}
                    </div>
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
                          className="pl-12 bg-transparent border-sage-700 text-white"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white flex items-center gap-3">
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
                          className="pl-12 bg-transparent border-sage-700 text-white"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-sage-400" />
                        {profileData.dateOfBirth}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sage-300 font-medium">Account Type</Label>
                    <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white flex items-center gap-3">
                      <User className="h-5 w-5 text-sage-400" />
                      <div className="flex items-center gap-2">
                        <span className="capitalize">{profileData.buyerType}</span>
                        <Badge variant="outline" className="border-forest-500 text-forest-400 text-xs">
                          {profileData.buyerType === 'retail' ? 'Individual Buyer' : 'Business Buyer'}
                        </Badge>
                      </div>
                    </div>
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
                        value={editData.address.street}
                        onChange={(e) => setEditData({
                          ...editData,
                          address: { ...editData.address, street: e.target.value }
                        })}
                        className="mt-2 bg-transparent border-sage-700 text-white"
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white">
                        {profileData.address.street}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sage-300 font-medium">City</Label>
                      {isEditing ? (
                        <Input
                          value={editData.address.city}
                          onChange={(e) => setEditData({
                            ...editData,
                            address: { ...editData.address, city: e.target.value }
                          })}
                          className="mt-2 bg-transparent border-sage-700 text-white"
                        />
                      ) : (
                        <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white">
                          {profileData.address.city}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sage-300 font-medium">State</Label>
                      {isEditing ? (
                        <Input
                          value={editData.address.state}
                          onChange={(e) => setEditData({
                            ...editData,
                            address: { ...editData.address, state: e.target.value }
                          })}
                          className="mt-2 bg-transparent border-sage-700 text-white"
                        />
                      ) : (
                        <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white">
                          {profileData.address.state}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sage-300 font-medium">Zip Code</Label>
                      {isEditing ? (
                        <Input
                          value={editData.address.zipCode}
                          onChange={(e) => setEditData({
                            ...editData,
                            address: { ...editData.address, zipCode: e.target.value }
                          })}
                          className="mt-2 bg-transparent border-sage-700 text-white"
                        />
                      ) : (
                        <div className="mt-2 p-3 bg-transparent border border-sage-700 rounded-md text-white">
                          {profileData.address.zipCode}
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
                {orders.length === 0 ? (
                  <div className="text-center text-sage-300 py-8">
                    <Package className="h-16 w-16 text-sage-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                    <p className="text-sage-300 mb-6">Start shopping to see your order history here</p>
                    <Link href="/members">
                      <Button className="premium-gradient">Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order._id} className="bg-black border-sage-800">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-white text-lg">Order #{order._id.slice(-8)}</CardTitle>
                              <CardDescription className="text-sage-300">
                                Placed on {formatDate(order.createdAt)}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(order.status)}
                              {order.status === 'shipped' && order.tracking && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-forest-500 text-forest-400 hover:bg-forest-900"
                                  onClick={() => {
                                    if (!order.tracking) return;
                                    const carrier = order.tracking.carrier || 'USPS'
                                    let trackingUrl = ''
                                    switch (carrier) {
                                      case 'USPS':
                                        trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${order.tracking.trackingNumber}`
                                        break
                                      case 'FedEx':
                                        trackingUrl = `https://www.fedex.com/fedextrack/?trknbr=${order.tracking.trackingNumber}`
                                        break
                                      case 'UPS':
                                        trackingUrl = `https://www.ups.com/track?tracknum=${order.tracking.trackingNumber}`
                                        break
                                      case 'DHL':
                                        trackingUrl = `https://www.dhl.com/en/express/tracking.html?AWB=${order.tracking.trackingNumber}`
                                        break
                                      default:
                                        trackingUrl = `https://www.google.com/search?q=track+${order.tracking.trackingNumber}`
                                    }
                                    window.open(trackingUrl, '_blank')
                                  }}
                                >
                                  <Truck className="h-4 w-4 mr-2" />
                                  Track Package
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Order Items */}
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-sage-950 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    {item.product?.images?.[0] || item.product?.image ? (
                                      <div className="w-12 h-12 relative">
                                        <Image
                                          src={item.product.images?.[0] || item.product.image || ''}
                                          alt={item.product.name}
                                          fill
                                          className="object-cover rounded-lg"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-12 h-12 bg-sage-800 rounded-lg flex items-center justify-center">
                                        <Package className="h-6 w-6 text-sage-400" />
                                      </div>
                                    )}
                                    <div>
                                      <p className="text-white font-medium">
                                        {item.product?.name || 'Product not found'}
                                      </p>
                                      <p className="text-sage-300 text-sm">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    <p className="text-sage-300 text-sm">${item.price.toFixed(2)} each</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-sage-800 pt-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sage-300">Total</span>
                                <span className="text-xl font-bold text-white">${order.totalAmount.toFixed(2)}</span>
                              </div>
                            </div>

                            {/* Tracking Information */}
                            {order.tracking && (
                              <div className="border-t border-sage-800 pt-4">
                                <h4 className="text-white font-semibold mb-2">Tracking Information</h4>
                                <div className="bg-sage-950 p-3 rounded-lg">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-sage-300">Tracking #:</span>
                                      <p className="text-white font-mono">{order.tracking.trackingNumber}</p>
                                    </div>
                                    <div>
                                      <span className="text-sage-300">Carrier:</span>
                                      <p className="text-white">{order.tracking.carrier}</p>
                                    </div>
                                    {order.tracking.shippedAt && (
                                      <div>
                                        <span className="text-sage-300">Shipped:</span>
                                        <p className="text-white">{formatDate(order.tracking.shippedAt)}</p>
                                      </div>
                                    )}
                                    {order.tracking.deliveredAt && (
                                      <div>
                                        <span className="text-sage-300">Delivered:</span>
                                        <p className="text-white">{formatDate(order.tracking.deliveredAt)}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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
