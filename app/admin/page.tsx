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
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
  sativaRatio: string;
  indicaRatio: string;
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
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
    sativaRatio: "",
    indicaRatio: ""
  })
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [totalMembers, setTotalMembers] = useState<number>(0)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  // Fetch products and user count on component mount
  useEffect(() => {
    fetchProducts()
    fetchTotalMembers()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
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
      const response = await fetch('/api/admin/users')
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
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock || !newProduct.thc || !newProduct.cbd || !newProduct.description || !newProduct.grower || !newProduct.artist || !newProduct.effects || !newProduct.terpenes || !newProduct.flavors || !newProduct.sativaRatio || !newProduct.indicaRatio) {
      toast({
        title: "Error",
        description: "All fields are required",
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

      const productData = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock) || 0,
        images: imageUrls,
        status: Number.parseInt(newProduct.stock) > 10 ? "active" : 
                Number.parseInt(newProduct.stock) > 0 ? "low_stock" : "out_of_stock",
        sativaRatio: Number.parseInt(newProduct.sativaRatio),
        indicaRatio: Number.parseInt(newProduct.indicaRatio)
      }

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (!response.ok) throw new Error('Failed to create product')
      
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
        sativaRatio: "",
        indicaRatio: ""
      })
      setSelectedImages([])

      toast({
        title: "Success",
        description: "Product created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product",
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
    totalRevenue: 12450.0,
    totalMembers: totalMembers,
    lowStockItems: products.filter((p) => p.status === "low_stock").length,
    outOfStockItems: products.filter((p) => p.status === "out_of_stock").length,
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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl font-display font-bold text-white">GreenCraft Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button asChild variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Store
                  </span>
                </Button>
              </Link>
              <Link href="/members/profile">
                <Button asChild variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                  <span>Admin Profile</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
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
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-sage-950 border border-sage-700 h-12">
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
                                className="border-sage-600 text-sage-300 hover:bg-sage-800"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-900"
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
                    <Label htmlFor="productName" className="text-sage-300 font-medium">
                      Product Name *
                    </Label>
                    <Input
                      id="productName"
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

                <div className="space-y-2">
                  <Label htmlFor="sativaRatio" className="text-sage-300">Sativa %</Label>
                  <Input
                    id="sativaRatio"
                    type="number"
                    placeholder="e.g. 60"
                    value={newProduct.sativaRatio}
                    onChange={e => setNewProduct(prev => ({ ...prev, sativaRatio: e.target.value }))}
                    className="bg-sage-900 border-sage-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indicaRatio" className="text-sage-300">Indica %</Label>
                  <Input
                    id="indicaRatio"
                    type="number"
                    placeholder="e.g. 40"
                    value={newProduct.indicaRatio}
                    onChange={e => setNewProduct(prev => ({ ...prev, indicaRatio: e.target.value }))}
                    className="bg-sage-900 border-sage-700 text-white"
                  />
                </div>

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
                      <span className="font-semibold text-forest-400 text-xl">$4,250</span>
                    </div>
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">Last Month</span>
                      <span className="font-semibold text-sage-300 text-xl">$3,890</span>
                    </div>
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">Growth</span>
                      <span className="font-semibold text-gold-400 text-xl">+9.3%</span>
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
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">OG Kush Indoor</span>
                      <span className="font-semibold text-forest-400">45 sold</span>
                    </div>
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">Purple Haze Premium</span>
                      <span className="font-semibold text-forest-400">38 sold</span>
                    </div>
                    <div className="flex justify-between items-center p-4 dark-glass rounded-lg">
                      <span className="text-sage-300">Artisan Glass Pipe</span>
                      <span className="font-semibold text-forest-400">22 sold</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
