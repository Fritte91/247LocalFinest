"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  Plus,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  AlertTriangle,
  Beaker,
  Upload,
  LogOut,
  User,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Save,
  ShoppingBag,
  BarChart,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Product {
  _id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  stock: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
  thc?: string;
  cbd?: string;
  description?: string;
  grower?: string;
  artist?: string;
  effects?: string;
  terpenes?: string;
  flavors?: string;
  images: string[];
  sativa?: number;
  indica?: number;
}

interface NewProduct {
  name: string;
  category: string;
  subcategory: string;
  price: string;
  stock: string;
  thc: string;
  cbd: string;
  description: string;
  grower: string;
  artist: string;
  effects: string;
  terpenes: string;
  flavors: string;
  images: string[];
  sativa: string;
  indica: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [analytics, setAnalytics] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [trackingData, setTrackingData] = useState({
    trackingNumber: '',
    carrier: 'USPS'
  })
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    stock: "",
    thc: "",
    cbd: "",
    description: "",
    grower: "",
    artist: "",
    effects: "",
    terpenes: "",
    flavors: "",
    images: [],
    sativa: "",
    indica: ""
  })
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [totalMembers, setTotalMembers] = useState<number>(0)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("products")

  // Redirect if not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/members')
    }
  }, [status, session, router])

  // Only fetch data if authenticated and admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchProducts()
      fetchTotalMembers()
      fetchAnalytics()
      fetchOrders()
    }
  }, [status, session])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products', {
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    }
  }

  const fetchTotalMembers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to fetch user count')
      const data = await response.json()
      setTotalMembers(data.totalUsers)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user count",
        variant: "destructive",
      })
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics', {
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch analytics",
        variant: "destructive",
      })
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders', {
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      })
    }
  }

  const updateOrderStatus = async (orderId: string, status: string, tracking?: any) => {
    console.log('updateOrderStatus called with:', { orderId, status, tracking })
    
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ orderId, status, tracking }),
      })

      console.log('updateOrderStatus response status:', response.status)

      if (!response.ok) throw new Error('Failed to update order')
      
      const updatedOrder = await response.json()
      console.log('updateOrderStatus updated order:', updatedOrder)
      
      setOrders(orders.map(order => 
        order._id === orderId ? updatedOrder : order
      ))
      
      // Update selected order if it's the one being updated
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(updatedOrder)
      }
      
      toast({
        title: "Success",
        description: tracking ? "Order status and tracking information updated" : `Order status updated to ${status}`,
      })
    } catch (error) {
      console.error('Error in updateOrderStatus:', error)
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    }
  }

  const handleOrderModalOpen = (order: any) => {
    setSelectedOrder(order)
    setTrackingData({
      trackingNumber: order.tracking?.trackingNumber || '',
      carrier: order.tracking?.carrier || 'USPS'
    })
    setIsOrderModalOpen(true)
  }

  const handleOrderModalClose = () => {
    setIsOrderModalOpen(false)
    setSelectedOrder(null)
    setTrackingData({
      trackingNumber: '',
      carrier: 'USPS'
    })
  }

  const getOrderStatusBadge = (status: string) => {
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setSelectedImages((prev) => {
      const newFiles = [...prev, ...files].slice(0, 4);
      if (newFiles.length > 4) {
        toast({
          title: "Error",
          description: "Maximum 4 images allowed",
          variant: "destructive",
        });
        return prev;
      }
      return newFiles;
    });
  };

  const uploadImages = async () => {
    const formData = new FormData()
    selectedImages.forEach((file) => {
      formData.append('images', file)
    })

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to upload images')
      const data = await response.json()
      return data.urls // Array of uploaded image URLs
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      })
      return []
    }
  }

  const handleAddProduct = async () => {
    // Only validate required fields from the database schema
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Error",
        description: "Name, category, price, and stock are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // First upload images if any
      let imageUrls = []
      if (selectedImages.length > 0) {
        imageUrls = await uploadImages()
      }

      const productData: any = {
        name: newProduct.name,
        category: newProduct.category,
        subcategory: newProduct.subcategory || undefined,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock) || 0,
        thc: newProduct.thc || undefined,
        cbd: newProduct.cbd || undefined,
        description: newProduct.description || undefined,
        grower: newProduct.grower || undefined,
        artist: newProduct.artist || undefined,
        effects: newProduct.effects || undefined,
        terpenes: newProduct.terpenes || undefined,
        flavors: newProduct.flavors || undefined,
        images: imageUrls,
        status: Number.parseInt(newProduct.stock) > 10 ? "active" : 
                Number.parseInt(newProduct.stock) > 0 ? "low_stock" : "out_of_stock"
      }

      if (newProduct.category.toLowerCase() === 'flowers') {
        (productData as any).sativa = Number.parseInt(newProduct.sativa) || undefined;
        (productData as any).indica = Number.parseInt(newProduct.indica) || undefined;
      }

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create product')
      }
      
      const createdProduct = await response.json()
      setProducts([...products, createdProduct])
      
      // Reset form
      setNewProduct({
        name: "",
        category: "",
        subcategory: "",
        price: "",
        stock: "",
        thc: "",
        cbd: "",
        description: "",
        grower: "",
        artist: "",
        effects: "",
        terpenes: "",
        flavors: "",
        images: [],
        sativa: "",
        indica: ""
      })
      setSelectedImages([])
      setIsAddProductOpen(false)

      toast({
        title: "Success",
        description: "Product created successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const response = await fetch(`/api/admin/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ _id: id, ...updates }),
      })

      if (!response.ok) throw new Error('Failed to update product')
      
      const updatedProduct = await response.json()
      setProducts(products.map((product) => 
        product._id === id ? updatedProduct : product
      ))
      
      setEditingProduct(null)
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) throw new Error('Failed to delete product')
      
      setProducts(products.filter((product) => product._id !== id))
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const stats = {
    totalProducts: products.length,
    totalRevenue: analytics?.revenue?.total || 0,
    totalMembers: totalMembers,
    lowStockItems: products.filter((p) => p.status === "low_stock").length,
    outOfStockItems: products.filter((p) => p.status === "out_of_stock").length,
    thisMonthRevenue: analytics?.revenue?.thisMonth || 0,
    lastMonthRevenue: analytics?.revenue?.lastMonth || 0,
    growthPercentage: analytics?.revenue?.growth || 0,
    totalOrders: analytics?.orders?.total || 0,
    newOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    completedOrders: orders.filter(o => o.status === 'shipped' || o.status === 'delivered').length,
  }

  // Format number with consistent locale
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  }

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-forest-600 text-white">In Stock</Badge>
      case "low_stock":
        return <Badge className="bg-gold-600 text-white">Low Stock</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-600 text-white">Out of Stock</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/signin' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-forest-500" />
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Link href="/members">
              <Button variant="outline" className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 whitespace-nowrap">
                <Eye className="h-4 w-4 mr-2" />
                View Shop
              </Button>
            </Link>
            <Link href="/members/profile">
              <Button variant="outline" className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 whitespace-nowrap">
                <User className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-300">Total Products</CardTitle>
              <Package className="h-4 w-4 text-forest-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-300">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gold-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${formatNumber(stats.totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-300">Total Members</CardTitle>
              <Users className="h-4 w-4 text-forest-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(stats.totalMembers)}</div>
            </CardContent>
          </Card>

          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-300">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gold-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold-400">{stats.lowStockItems}</div>
            </CardContent>
          </Card>

          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-300">Out of Stock</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{stats.outOfStockItems}</div>
            </CardContent>
          </Card>

          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-300">New Orders</CardTitle>
              <Package className="h-4 w-4 text-gold-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold-400">{stats.newOrders}</div>
            </CardContent>
          </Card>

          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-300">Orders Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-forest-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest-400">{stats.completedOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-sage-950 border border-sage-700 h-12">
            <TabsTrigger value="products" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger
              value="add-product"
              className="data-[state=active]:bg-forest-600 data-[state=active]:text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Products Management */}
          <TabsContent value="products">
            <Card className="bg-sage-950 border-sage-800">
              <CardHeader>
                <CardTitle className="text-white font-display">Product Inventory</CardTitle>
                <CardDescription className="text-sage-300">
                  Manage your product catalog, pricing, and stock levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-sage-800">
                        <TableHead className="text-sage-300">Image</TableHead>
                        <TableHead className="text-sage-300">Product Name</TableHead>
                        <TableHead className="text-sage-300">Category</TableHead>
                        <TableHead className="text-sage-300">Price</TableHead>
                        <TableHead className="text-sage-300">Stock</TableHead>
                        <TableHead className="text-sage-300">Status</TableHead>
                        <TableHead className="text-sage-300">Creator</TableHead>
                        <TableHead className="text-sage-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product._id} className="border-sage-800">
                          <TableCell>
                            {product.images?.[0] && (
                              <div className="relative w-[50px] h-[50px]">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="rounded-md object-cover"
                                />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-white">{product.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge variant="outline" className="border-forest-500 text-forest-400 capitalize text-xs">
                                {product.category}
                              </Badge>
                              {product.subcategory && (
                                <Badge variant="outline" className="border-sage-500 text-sage-400 capitalize text-xs">
                                  {product.subcategory}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-white">${product.price}</TableCell>
                          <TableCell>
                            {editingProduct === product._id ? (
                              <Input
                                type="number"
                                defaultValue={product.stock}
                                className="w-20 bg-black border-sage-700 text-white"
                                onBlur={(e) =>
                                  handleUpdateProduct(product._id, { stock: Number.parseInt(e.target.value) })
                                }
                              />
                            ) : (
                              <span
                                className={
                                  product.status === "low_stock" || product.status === "out_of_stock"
                                    ? "text-gold-400 font-semibold"
                                    : "text-white"
                                }
                              >
                                {product.stock}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell className="text-sage-300">{product.grower || product.artist}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingProduct(product._id)}
                                className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-sage-900 border-red-500 text-red-400 hover:bg-red-900/50 hover:text-red-300"
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Product */}
          <TabsContent value="add-product">
            <Card className="bg-sage-950 border-sage-800">
              <CardHeader>
                <CardTitle className="text-white font-display">Add New Product</CardTitle>
                <CardDescription className="text-sage-300">Add a new product to your inventory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="product-name" className="text-sage-300 font-medium">
                      Product Name *
                    </Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                      className="mt-2 bg-black border-sage-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-sage-300 font-medium">
                      Category *
                    </Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value, subcategory: "" })}
                    >
                      <SelectTrigger className="mt-2 bg-black border-sage-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-sage-950 border-sage-700">
                        <SelectItem value="flowers">Flowers</SelectItem>
                        <SelectItem value="glassware">Glassware</SelectItem>
                        <SelectItem value="artwork">Artwork</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newProduct.category && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="subcategory" className="text-sage-300 font-medium">
                        Subcategory
                      </Label>
                      <Select
                        value={newProduct.subcategory}
                        onValueChange={(value) => setNewProduct({ ...newProduct, subcategory: value })}
                      >
                        <SelectTrigger className="mt-2 bg-black border-sage-700 text-white">
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent className="bg-sage-950 border-sage-700">
                          {newProduct.category === "flowers" && (
                            <>
                              <SelectItem value="sativa">Sativa</SelectItem>
                              <SelectItem value="indica">Indica</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </>
                          )}
                          {newProduct.category === "glassware" && (
                            <>
                              <SelectItem value="bongs">Bongs</SelectItem>
                              <SelectItem value="pipes">Pipes</SelectItem>
                              <SelectItem value="accessories">Accessories</SelectItem>
                            </>
                          )}
                          {newProduct.category === "artwork" && (
                            <>
                              <SelectItem value="prints">Prints</SelectItem>
                              <SelectItem value="sculptures">Sculptures</SelectItem>
                              <SelectItem value="photography">Photography</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="creator" className="text-sage-300 font-medium">
                        {newProduct.category === "flowers" ? "Grower" : "Artist"}
                      </Label>
                      <Input
                        id="creator"
                        value={newProduct.category === "flowers" ? newProduct.grower : newProduct.artist}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            [newProduct.category === "flowers" ? "grower" : "artist"]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${newProduct.category === "flowers" ? "grower" : "artist"} name`}
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="price" className="text-sage-300 font-medium">
                      Price ($) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0.00"
                      className="mt-2 bg-black border-sage-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-sage-300 font-medium">
                      Stock Quantity *
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="0"
                      className="mt-2 bg-black border-sage-700 text-white"
                    />
                  </div>
                  {newProduct.category === "flowers" && (
                    <div>
                      <Label htmlFor="thc" className="text-sage-300 font-medium">
                        THC %
                      </Label>
                      <Input
                        id="thc"
                        value={newProduct.thc}
                        onChange={(e) => setNewProduct({ ...newProduct, thc: e.target.value })}
                        placeholder="e.g. 22%"
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                    </div>
                  )}
                </div>

                {newProduct.category === "flowers" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="cbd" className="text-sage-300 font-medium">
                        CBD %
                      </Label>
                      <Input
                        id="cbd"
                        value={newProduct.cbd}
                        onChange={(e) => setNewProduct({ ...newProduct, cbd: e.target.value })}
                        placeholder="e.g. 1%"
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                    </div>
                  </div>
                )}

                {newProduct.category === "flowers" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="sativa" className="text-sage-300 font-medium">
                        Sativa %
                      </Label>
                      <Input
                        id="sativa"
                        value={newProduct.sativa}
                        onChange={(e) => setNewProduct({ ...newProduct, sativa: e.target.value })}
                        placeholder="e.g. 60"
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="indica" className="text-sage-300 font-medium">
                        Indica %
                      </Label>
                      <Input
                        id="indica"
                        value={newProduct.indica}
                        onChange={(e) => setNewProduct({ ...newProduct, indica: e.target.value })}
                        placeholder="e.g. 40"
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Tags Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Beaker className="h-6 w-6 text-forest-500" />
                    <h3 className="text-xl font-semibold text-white">Product Tags</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="effects" className="text-sage-300 font-medium">
                        Effects (comma separated)
                      </Label>
                      <Input
                        id="effects"
                        value={newProduct.effects || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, effects: e.target.value })}
                        placeholder="e.g. Creative, Uplifting, Energetic"
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                      <p className="text-sage-400 text-xs mt-1">Separate multiple effects with commas</p>
                    </div>

                    <div>
                      <Label htmlFor="terpenes" className="text-sage-300 font-medium">
                        Terpenes (comma separated)
                      </Label>
                      <Input
                        id="terpenes"
                        value={newProduct.terpenes || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, terpenes: e.target.value })}
                        placeholder="e.g. Limonene, Myrcene, Pinene"
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                      <p className="text-sage-400 text-xs mt-1">Separate multiple terpenes with commas</p>
                    </div>
                  </div>

                  {newProduct.category === "flowers" && (
                    <div>
                      <Label htmlFor="flavors" className="text-sage-300 font-medium">
                        Flavors (comma separated)
                      </Label>
                      <Input
                        id="flavors"
                        value={newProduct.flavors || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, flavors: e.target.value })}
                        placeholder="e.g. Berry, Sweet, Citrus"
                        className="mt-2 bg-black border-sage-700 text-white"
                      />
                      <p className="text-sage-400 text-xs mt-1">Separate multiple flavors with commas</p>
                    </div>
                  )}
                </div>

                {/* Add Image Upload Section */}
                <div className="space-y-4">
                  <Label className="text-sage-300 font-medium">
                    Product Images (1-4 images)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="bg-black border-sage-700 text-white"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-sage-600 text-sage-300 hover:bg-sage-800"
                      onClick={() => {
                        const input = document.getElementById('image-upload');
                        if (input) (input as HTMLInputElement).click();
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                  </div>
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            width={100}
                            height={100}
                            className="rounded-md object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-sage-300 font-medium">
                    Product Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Enter product description..."
                    rows={3}
                    className="mt-2 bg-black border-sage-700 text-white"
                  />
                </div>

                <div className="flex items-end mt-6">
                  <Button className="w-full bg-gold-600 text-white hover:bg-gold-700" onClick={handleAddProduct} disabled={isLoading}>
                    {isLoading ? "Adding Product..." : "Add Product"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <Card className="bg-sage-950 border-sage-800">
              <CardHeader>
                <CardTitle className="text-white font-display">Order Management</CardTitle>
                <CardDescription className="text-sage-300">
                  View and manage all customer orders, update status, and add tracking information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-sage-800">
                        <TableHead className="text-sage-300">Order ID</TableHead>
                        <TableHead className="text-sage-300">Customer</TableHead>
                        <TableHead className="text-sage-300">Items</TableHead>
                        <TableHead className="text-sage-300">Total</TableHead>
                        <TableHead className="text-sage-300">Status</TableHead>
                        <TableHead className="text-sage-300">Date</TableHead>
                        <TableHead className="text-sage-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow 
                          key={order._id} 
                          className="border-sage-800 cursor-pointer hover:bg-sage-900/50 transition-colors"
                          onClick={() => handleOrderModalOpen(order)}
                        >
                          <TableCell className="text-white font-mono text-sm">
                            #{order._id.slice(-8)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-white font-medium">
                                {order.user?.firstName} {order.user?.lastName}
                              </div>
                              <div className="text-sage-300 text-sm">{order.user?.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sage-300">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </div>
                          </TableCell>
                          <TableCell className="text-white font-semibold">
                            ${order.totalAmount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {getOrderStatusBadge(order.status)}
                          </TableCell>
                          <TableCell className="text-sage-300 text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <div onClick={(e) => e.stopPropagation()}>
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => updateOrderStatus(order._id, value)}
                                >
                                  <SelectTrigger className="w-32 bg-black border-sage-700 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-sage-950 border-sage-700">
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {orders.length === 0 && (
                    <div className="text-center text-sage-300 py-8">
                      No orders found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-sage-950 border-sage-800">
                <CardHeader>
                  <CardTitle className="text-white font-display">Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">This Month</span>
                      <span className="font-semibold text-forest-400 text-xl">
                        ${formatNumber(stats.thisMonthRevenue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">Last Month</span>
                      <span className="font-semibold text-sage-300 text-xl">
                        ${formatNumber(stats.lastMonthRevenue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">Growth</span>
                      <span className={`font-semibold text-xl ${
                        stats.growthPercentage >= 0 ? 'text-gold-400' : 'text-red-400'
                      }`}>
                        {stats.growthPercentage >= 0 ? '+' : ''}{stats.growthPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">Total Orders</span>
                      <span className="font-semibold text-forest-400 text-xl">
                        {stats.totalOrders}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardHeader>
                  <CardTitle className="text-white font-display">Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.topProducts?.slice(0, 5).map((product: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-4 dark-glass rounded-lg">
                        <span className="text-sage-300">{product.name}</span>
                        <span className="font-semibold text-forest-400">{product.quantity} sold</span>
                      </div>
                    ))}
                    {(!analytics?.topProducts || analytics.topProducts.length === 0) && (
                      <div className="text-center text-sage-300 py-4">
                        No sales data available yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Sales */}
            {analytics?.categorySales && analytics.categorySales.length > 0 && (
              <Card className="bg-sage-950 border-sage-800 mt-6">
                <CardHeader>
                  <CardTitle className="text-white font-display">Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {analytics.categorySales.map((category: any, index: number) => (
                      <div key={index} className="p-4 dark-glass rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sage-300 font-medium capitalize">{category.category}</span>
                          <span className="text-white font-semibold">${formatNumber(category.revenue)}</span>
                        </div>
                        <div className="text-sm text-sage-400">
                          {category.quantity} items sold
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Orders */}
            {analytics?.recentOrders && analytics.recentOrders.length > 0 && (
              <Card className="bg-sage-950 border-sage-800 mt-6">
                <CardHeader>
                  <CardTitle className="text-white font-display">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.recentOrders.map((order: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 dark-glass rounded-lg">
                        <div>
                          <span className="text-white font-medium">Order #{order.id.slice(-8)}</span>
                          <div className="text-sm text-sage-400">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.itemCount} items
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-semibold">${formatNumber(order.totalAmount)}</span>
                          <div className="text-sm text-sage-400 capitalize">{getOrderStatusBadge(order.status)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={handleOrderModalClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sage-950 border-sage-800 text-white">
          {selectedOrder && (
            <>
              <DialogHeader className="border-b border-sage-800 pb-4 mb-6">
                <DialogTitle className="text-2xl font-display text-white flex items-center justify-between">
                  <span>Order #{selectedOrder._id.slice(-8)}</span>
                  {getOrderStatusBadge(selectedOrder.status)}
                </DialogTitle>
                <DialogDescription className="text-sage-300">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-forest-500" />
                      Customer Information
                    </h3>
                    <div className="bg-black p-4 rounded-lg border border-sage-800 space-y-3">
                      <div>
                        <span className="text-sage-300 text-sm">Name:</span>
                        <p className="text-white font-medium">
                          {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-sage-300 text-sm">Email:</span>
                        <p className="text-white">{selectedOrder.user?.email}</p>
                      </div>
                      <div>
                        <span className="text-sage-300 text-sm">Phone:</span>
                        <p className="text-white">{selectedOrder.user?.phone || selectedOrder.user?.phoneNumber || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-forest-500" />
                      Shipping Address
                    </h3>
                    <div className="bg-black p-4 rounded-lg border border-sage-800 space-y-2">
                      <p className="text-white">{selectedOrder.shippingAddress?.street}</p>
                      <p className="text-white">
                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Order Status & Tracking */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Truck className="h-5 w-5 text-forest-500" />
                      Order Status & Tracking
                    </h3>
                    <div className="bg-black p-4 rounded-lg border border-sage-800 space-y-4">
                      <div>
                        <Label className="text-sage-300 text-sm">Status</Label>
                        <Select
                          value={selectedOrder.status}
                          onValueChange={(value) => updateOrderStatus(selectedOrder._id, value)}
                        >
                          <SelectTrigger className="w-full bg-sage-900 border-sage-700 text-white mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-sage-950 border-sage-700">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedOrder.status === 'shipped' && (
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sage-300 text-sm">Tracking Number</Label>
                            <Input
                              placeholder="Enter tracking number"
                              value={trackingData.trackingNumber}
                              onChange={(e) => setTrackingData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                              className="bg-sage-900 border-sage-700 text-white mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sage-300 text-sm">Carrier</Label>
                            <Select
                              value={trackingData.carrier}
                              onValueChange={(value) => setTrackingData(prev => ({ ...prev, carrier: value }))}
                            >
                              <SelectTrigger className="w-full bg-sage-900 border-sage-700 text-white mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-sage-950 border-sage-700">
                                <SelectItem value="USPS">USPS</SelectItem>
                                <SelectItem value="FedEx">FedEx</SelectItem>
                                <SelectItem value="UPS">UPS</SelectItem>
                                <SelectItem value="DHL">DHL</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            onClick={() => {
                              if (!trackingData.trackingNumber.trim()) {
                                toast({
                                  title: "Error",
                                  description: "Please enter a tracking number",
                                  variant: "destructive",
                                });
                                return;
                              }
                              updateOrderStatus(selectedOrder._id, 'shipped', {
                                trackingNumber: trackingData.trackingNumber,
                                carrier: trackingData.carrier,
                                shippedAt: new Date()
                              });
                            }}
                            className="w-full bg-forest-600 hover:bg-forest-700 text-white"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Tracking Information
                          </Button>
                        </div>
                      )}

                      {selectedOrder.tracking?.trackingNumber && (
                        <div className="pt-3 border-t border-sage-800">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sage-300 text-sm">Tracking Number:</span>
                              <span className="text-white font-mono">{selectedOrder.tracking.trackingNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sage-300 text-sm">Carrier:</span>
                              <span className="text-white">{selectedOrder.tracking.carrier}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sage-300 text-sm">Shipped Date:</span>
                              <span className="text-white">
                                {selectedOrder.tracking.shippedAt 
                                  ? new Date(selectedOrder.tracking.shippedAt).toLocaleDateString() 
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-forest-500" />
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="bg-black p-4 rounded-lg border border-sage-800">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-medium">
                              {item.product?.name || 'Product not found'}
                            </p>
                            <p className="text-sage-300 text-sm">
                              Qty: {item.quantity} × ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        {item.product?.category && (
                          <Badge variant="outline" className="border-forest-500 text-forest-400 text-xs">
                            {item.product.category}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 bg-black p-4 rounded-lg border border-sage-800">
                    <h4 className="text-white font-semibold mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sage-300">Subtotal:</span>
                        <span className="text-white">${selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-300">Payment Status:</span>
                        <Badge className={selectedOrder.paymentStatus === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}>
                          {selectedOrder.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sage-300">Payment Method:</span>
                        <span className="text-white capitalize">{selectedOrder.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
