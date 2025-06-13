"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Leaf, Search, ShoppingCart, Star, User, Grid, List, Filter, Clock, Award, MapPin, Heart } from "lucide-react"
import type { ChangeEvent, MouseEvent } from "react"
import { useApp } from "@/lib/context"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

// Define types for products
interface Grower {
  name: string;
  experience: string;
  specialty: string;
  location: string;
}

interface Product {
  id: number;
  name: string;
  category: "flowers" | "glassware" | "artwork";
  subcategory?: string;
  price: number;
  thc?: number;
  cbd?: number;
  strain?: string;
  indicaPercent?: number;
  sativaPercent?: number;
  rating: number;
  reviews: number;
  inStock: number;
  lowStock: boolean;
  grower?: Grower;
  images: string[];
  description: string;
  effects?: string[];
  terpenes?: string[];
  flavors?: string[];
  harvestDate?: string;
  artist?: string;
  materials?: string[];
  dimensions?: string;
  size?: string;
  edition?: string;
}

export default function MembersShop() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const { data: session, status } = useSession()
  const router = useRouter()

  const categories = {
    all: { name: "All Products", subcategories: [] },
    flowers: {
      name: "Flowers",
      subcategories: [
        { id: "sativa", name: "Sativa" },
        { id: "indica", name: "Indica" },
        { id: "hybrid", name: "Hybrid" },
      ],
    },
    glassware: {
      name: "Glassware",
      subcategories: [
        { id: "bongs", name: "Bongs" },
        { id: "pipes", name: "Pipes" },
        { id: "accessories", name: "Accessories" },
      ],
    },
    artwork: {
      name: "Artwork",
      subcategories: [
        { id: "prints", name: "Prints" },
        { id: "sculptures", name: "Sculptures" },
        { id: "photography", name: "Photography" },
      ],
    },
  }

  const { addToCart, cart } = useApp()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        // Map API data to Product interface
        setProducts(
          data.map((item: any) => ({
            id: item._id,
            name: item.name,
            category: item.category,
            subcategory: item.subcategory,
            price: item.price,
            thc: item.thc ? parseFloat(item.thc) : undefined,
            cbd: item.cbd ? parseFloat(item.cbd) : undefined,
            strain: item.strain,
            indicaPercent: item.indicaRatio ? parseInt(item.indicaRatio) : undefined,
            sativaPercent: item.sativaRatio ? parseInt(item.sativaRatio) : undefined,
            rating: item.rating || 4.5,
            reviews: item.reviews || 0,
            inStock: item.stock,
            lowStock: item.status === "low_stock",
            grower: item.grower ? { name: item.grower, experience: "", specialty: "", location: "" } : undefined,
            images: item.images || [],
            description: item.description,
            effects: item.effects ? item.effects.split(",").map((e: string) => e.trim()) : [],
            terpenes: item.terpenes ? item.terpenes.split(",").map((e: string) => e.trim()) : [],
            flavors: item.flavors ? item.flavors.split(",").map((e: string) => e.trim()) : [],
            harvestDate: item.harvestDate,
            artist: item.artist,
            materials: item.materials ? item.materials.split(",").map((e: string) => e.trim()) : [],
            dimensions: item.dimensions,
            size: item.size,
            edition: item.edition,
          }))
        )
      } catch (err) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSubCategory = selectedSubCategory === "all" || product.subcategory === selectedSubCategory
    return matchesSearch && matchesCategory && matchesSubCategory
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedSubCategory("all")
  }

  const addToCartHandler = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || '',
      category: product.category,
      grower: product.grower?.name,
      artist: product.artist,
      thc: product.thc,
      cbd: product.cbd,
      strain: product.strain,
    }
    addToCart(cartItem)
  }

  const ProductDetailDialog = ({ product, onClose }: { product: Product | null; onClose: () => void }) => {
    if (!product) return null;
    
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
      <Dialog open={!!product} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sage-950 border-sage-800 text-white">
          <DialogHeader className="border-b border-sage-800 pb-4 mb-6">
            <DialogTitle className="text-2xl font-display text-white flex items-center justify-between">
              <span>{product.name}</span>
              <Badge className="bg-forest-900 text-forest-400 font-semibold capitalize px-3 py-1">
                {product.category}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg border border-sage-800">
                <Image
                  src={product.images?.[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
                {product.lowStock && (
                  <Badge className="absolute top-3 right-3 bg-gold-600 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    Low Stock!
                  </Badge>
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((image: string, index: number) => (
                    <div 
                      key={index}
                      className={`border-2 cursor-pointer rounded-md overflow-hidden ${
                        selectedImageIndex === index ? 'border-forest-500' : 'border-sage-800 hover:border-sage-700'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 2}`}
                        width={120}
                        height={120}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
                      <span className="text-lg font-semibold">{product.rating}</span>
                      <span className="text-sage-400">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">${product.price}</div>
                    <div className={`text-sm ${product.inStock > 0 ? 'text-forest-400' : 'text-red-400'}`}>
                      {product.inStock > 0 ? `${product.inStock} in stock` : "Out of stock"}
                    </div>
                  </div>
                </div>

                <div className="bg-sage-900/50 rounded-lg p-4 my-6">
                  <p className="text-sage-300 leading-relaxed">{product.description}</p>
                </div>
              </div>

              {/* Cannabis-specific info */}
              {product.category === "flowers" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sage-900/30 rounded-lg p-4 border border-sage-800/50">
                      <div className="text-sm text-sage-400 mb-1">THC Content</div>
                      <div className="flex items-center gap-2">
                        <Progress value={product.thc} max={30} className="flex-1" />
                        <span className="text-forest-400 font-bold">{product.thc}%</span>
                      </div>
                    </div>
                    <div className="bg-sage-900/30 rounded-lg p-4 border border-sage-800/50">
                      <div className="text-sm text-sage-400 mb-1">CBD Content</div>
                      <div className="flex items-center gap-2">
                        <Progress value={product.cbd} max={20} className="flex-1" />
                        <span className="text-forest-400 font-bold">{product.cbd}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sage-900/30 rounded-lg p-4 border border-sage-800/50">
                    <div className="text-sm text-sage-400 mb-2">Strain Composition</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-300">Indica</span>
                        <span className="text-purple-400 font-bold">{product.indicaPercent}%</span>
                      </div>
                      <Progress value={product.indicaPercent} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sage-300">Sativa</span>
                        <span className="text-forest-400 font-bold">{product.sativaPercent}%</span>
                      </div>
                      <Progress value={product.sativaPercent} className="h-2" />
                    </div>
                  </div>

                  {product.effects && (
                    <div className="mb-4">
                      <div className="text-sm text-sage-400 mb-2">Effects</div>
                      <div className="flex flex-wrap gap-2">
                        {product.effects.map((effect: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-forest-500 text-forest-400 px-3 py-1">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.terpenes && (
                    <div className="mb-4">
                      <div className="text-sm text-sage-400 mb-2">Terpenes</div>
                      <div className="flex flex-wrap gap-2">
                        {product.terpenes.map((terpene: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-purple-500 text-purple-400 px-3 py-1">
                            {terpene}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.flavors && (
                    <div className="mb-4">
                      <div className="text-sm text-sage-400 mb-2">Flavors</div>
                      <div className="flex flex-wrap gap-2">
                        {product.flavors.map((flavor: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-gold-500 text-gold-400 px-3 py-1">
                            {flavor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grower Info */}
                  {product.grower && (
                    <div className="bg-gradient-to-r from-sage-900/50 to-sage-950 rounded-lg p-4 border border-sage-800/50">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="h-5 w-5 text-gold-500" />
                        <span className="font-semibold text-white">Master Grower</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sage-400">Name:</span>
                          <span className="text-white font-semibold">{product.grower.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-400">Experience:</span>
                          <span className="text-forest-400">{product.grower.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-400">Specialty:</span>
                          <span className="text-sage-300">{product.grower.specialty}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400">Location:</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gold-500" />
                            <span className="text-sage-300">{product.grower.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Glassware/Artwork info */}
              {(product.category === "glassware" || product.category === "artwork") && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-sage-900/50 to-sage-950 rounded-lg p-4 border border-sage-800/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="h-5 w-5 text-gold-500" />
                      <span className="font-semibold text-white">Artist</span>
                    </div>
                    <div className="text-lg text-gold-400 font-semibold">{product.artist}</div>
                  </div>

                  {product.materials && (
                    <div>
                      <div className="text-sm text-sage-400 mb-2">Materials</div>
                      <div className="flex flex-wrap gap-2">
                        {product.materials.map((material: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-sage-500 text-sage-400 px-3 py-1">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-sage-400">Dimensions:</span>
                      <span className="text-white">{product.dimensions}</span>
                    </div>
                  )}

                  {product.edition && (
                    <div className="flex justify-between">
                      <span className="text-sage-400">Edition:</span>
                      <span className="text-gold-400">{product.edition}</span>
                    </div>
                  )}
                </div>
              )}

              <Button
                className={`w-full mt-6 ${product.inStock > 0 ? "premium-gradient" : "bg-gray-600"} text-white py-4 text-lg hover:shadow-lg hover:shadow-forest-900/30 transition-all duration-300`}
                disabled={product.inStock === 0}
                onClick={() => {
                  addToCartHandler(product)
                  onClose()
                }}
              >
                {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

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
              <Link href="/members" className="text-white font-medium border-b-2 border-forest-500 pb-1">
                Shop
              </Link>
              <Link href="/members/community" className="text-sage-300 hover:text-white font-medium transition-colors">
                Community
              </Link>
              <Link href="/members/growers" className="text-sage-300 hover:text-white font-medium transition-colors">
                Growers
              </Link>
              <Link href="/members/cart">
                <Button variant="outline" className="relative border-sage-600 text-sage-300 hover:bg-sage-800/50 hover:text-white transition-all duration-300">
                  <ShoppingCart className="h-4 w-4" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 gold-gradient text-white text-xs animate-pulse">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/members/profile">
                <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800/50 hover:text-white transition-all duration-300">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Banner */}
        <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-forest-900 to-sage-900">
          <div className="absolute inset-0 opacity-20 bg-grid"></div>
          <div className="relative z-10 py-12 px-8 md:px-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 animate-fade-in-down">
              Premium Cannabis <span className="text-forest-400 bg-clip-text text-transparent bg-gradient-to-r from-forest-400 to-gold-400">Collection</span>
            </h1>
            <p className="text-xl text-sage-300 max-w-2xl mb-8 animate-fade-in-up animation-delay-300">
              Explore our curated selection of top-quality products from award-winning growers and artisans.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="bg-sage-950/70 backdrop-blur-sm border border-sage-800/50 rounded-xl p-6 shadow-lg animate-fade-in animation-delay-500 max-w-3xl">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                  <Input
                    placeholder="Search by name, strain, or effect..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-sage-900/50 border-sage-700 text-white placeholder-sage-400 h-12 backdrop-blur-sm hover:border-forest-500 transition-colors duration-300 w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setSelectedCategory("flowers")} 
                    className="border-sage-700 text-sage-300 hover:bg-forest-700 hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    Flowers
                  </Button>
                  <Button 
                    onClick={() => setSelectedCategory("glassware")} 
                    className="border-sage-700 text-sage-300 hover:bg-forest-700 hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    Glassware
                  </Button>
                  <Button 
                    onClick={() => setSelectedCategory("artwork")} 
                    className="border-sage-700 text-sage-300 hover:bg-forest-700 hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    Artwork
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Navigation - Modern Tab Style */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-sage-950/80 backdrop-blur-sm border border-sage-700 h-14 rounded-xl overflow-hidden">
              {Object.entries(categories).map(([key, category]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-forest-600 data-[state=active]:to-forest-700 data-[state=active]:text-white text-sage-300 h-full text-lg font-medium transition-all duration-300"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Subcategory Navigation - Improved Integration */}
          {selectedCategory !== "all" && categories[selectedCategory]?.subcategories.length > 0 && (
            <div className="my-6">
              <div className="bg-sage-950/50 backdrop-blur-sm border border-sage-800/50 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-forest-400 to-forest-600 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-white">{categories[selectedCategory].name} Categories</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={selectedSubCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubCategory("all")}
                    className={
                      selectedSubCategory === "all"
                        ? "gold-gradient text-white font-medium text-base px-6 py-2 shadow-lg shadow-gold-900/20"
                        : "border-sage-700 text-sage-400 hover:bg-sage-900 hover:text-sage-300 text-base px-6 py-2"
                    }
                  >
                    All {categories[selectedCategory].name}
                  </Button>
                  {categories[selectedCategory].subcategories.map((sub: { id: string; name: string }) => (
                    <Button
                      key={sub.id}
                      variant={selectedSubCategory === sub.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSubCategory(sub.id)}
                      className={
                        selectedSubCategory === sub.id
                          ? "gold-gradient text-white font-medium text-base px-6 py-2 shadow-lg shadow-gold-900/20"
                          : "border-sage-700 text-sage-400 hover:bg-sage-900 hover:text-sage-300 text-base px-6 py-2"
                      }
                    >
                      {sub.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters and View Toggle */}
        <div className="flex justify-between items-center mb-8 bg-sage-950/30 backdrop-blur-sm border border-sage-800/30 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-forest-400" />
            <p className="text-sage-300">
              Showing <span className="text-white font-semibold">{filteredProducts.length}</span> of <span className="text-white font-semibold">{products.length}</span> products
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "premium-gradient shadow-lg shadow-forest-900/20" : "border-sage-600 text-sage-300 hover:bg-sage-900"}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "premium-gradient shadow-lg shadow-forest-900/20" : "border-sage-600 text-sage-300 hover:bg-sage-900"}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`bg-sage-950/70 border-sage-800/70 hover:border-forest-600 hover:shadow-xl hover:shadow-forest-900/10 transition-all duration-300 overflow-hidden group cursor-pointer backdrop-blur-sm ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className={viewMode === "list" ? "w-56 flex-shrink-0 relative" : "relative"}>
                <div className="absolute top-0 right-0 z-10 p-2">
                  <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 bg-black/40 backdrop-blur-sm text-sage-300 hover:text-white hover:bg-forest-700/60 transition-colors duration-300">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="overflow-hidden">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                      viewMode === "list" ? "w-full h-56" : "w-full h-64"
                    }`}
                  />
                </div>
                {product.lowStock && (
                  <Badge className="absolute top-3 right-3 bg-gold-600 text-white shadow-lg shadow-gold-900/30 animate-pulse">
                    <Clock className="h-3 w-3 mr-1" />
                    Low Stock!
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className="absolute top-3 right-3 bg-red-600 text-white shadow-lg shadow-red-900/30">Out of Stock</Badge>
                )}
                <Badge className="absolute top-3 left-3 premium-gradient text-white capitalize shadow-lg shadow-forest-900/30 backdrop-blur-sm">
                  {product.category}
                </Badge>
              </div>

              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex justify-between items-start mb-3">
                  <CardTitle className="text-white font-display text-xl group-hover:text-forest-400 transition-colors duration-300">{product.name}</CardTitle>
                  <div className="flex items-center gap-1 bg-sage-900/60 px-2 py-1 rounded-md backdrop-blur-sm">
                    <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                    <span className="text-sm font-medium text-white">{product.rating}</span>
                  </div>
                </div>

                <CardDescription className="text-sage-300 mb-5 line-clamp-2 group-hover:text-sage-200 transition-colors duration-300">{product.description}</CardDescription>

                {product.category === "flowers" && (
                  <div className="flex gap-2 mb-5 flex-wrap">
                    <Badge variant="outline" className="border-forest-500 text-forest-400 text-xs px-3 py-1 rounded-md">
                      THC: {product.thc}%
                    </Badge>
                    <Badge variant="outline" className="border-sage-500 text-sage-400 text-xs px-3 py-1 rounded-md">
                      CBD: {product.cbd}%
                    </Badge>
                    <Badge variant="outline" className="border-gold-500 text-gold-400 text-xs px-3 py-1 rounded-md">
                      {product.strain}
                    </Badge>
                  </div>
                )}

                {(product.category === "glassware" || product.category === "artwork") && (
                  <p className="text-sm text-gold-400 mb-5">By {product.artist}</p>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">${product.price}</span>
                  <Button
                    className={product.inStock > 0 ? "premium-gradient shadow-lg shadow-forest-900/20 hover:shadow-xl hover:shadow-forest-900/30 transition-all duration-300" : "bg-gray-700"}
                    disabled={product.inStock === 0}
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCartHandler(product)
                    }}
                  >
                    {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-sage-950/30 backdrop-blur-sm border border-sage-800/50 rounded-xl my-12">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-sage-900/80 flex items-center justify-center mb-2">
                <Filter className="h-8 w-8 text-sage-500" />
              </div>
              <p className="text-sage-300 text-xl mb-4">No products found matching your criteria.</p>
              <Button
                className="premium-gradient text-white px-8 py-6 text-lg shadow-lg shadow-forest-900/20 hover:shadow-xl hover:shadow-forest-900/30 transition-all duration-300"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedSubCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-grid {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>

      {/* Product Detail Dialog */}
      <ProductDetailDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
