"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Clock,
  ArrowLeft,
  Star,
  Flame,
  BookOpen,
  Heart,
  Wrench,
  Beaker,
  Leaf,
  ShoppingCart,
} from "lucide-react"
import {
  articleCategories,
  articles,
  type ArticleCategory,
  type Article,
} from "../data/education"
import { useApp, type CartItem } from "@/app/hooks/use-app"
import { MobileNav } from "@/app/components/mobile-nav"

const iconMap: Record<string, any> = {
  Sprout: Flame,
  Beaker: Beaker,
  Heart: Heart,
  Wrench: Wrench,
  BookOpen: BookOpen,
}

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { cart } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const categoryParam = searchParams.get("category")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Find the selected category from URL or default to first
  const selectedCategory: ArticleCategory = useMemo(() => {
    return (
      articleCategories.find((cat) => cat.id === categoryParam) || articleCategories[0]
    )
  }, [categoryParam])

  // Filter articles by selected category
  const filteredArticles: Article[] = useMemo(() => {
    return articles.filter((a) => a.categorySlug === selectedCategory.id)
  }, [selectedCategory])

  // Sidebar click handler
  const handleCategoryClick = (cat: ArticleCategory) => {
    router.push(`/members/community/articles?category=${cat.id}`)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-sage-950 to-black">
      {/* Main Navbar/Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl md:text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/members" className="text-sage-300 hover:text-white font-medium transition-colors">
                Shop
              </Link>
              <Link href="/members/community" className="text-white font-medium border-b-2 border-forest-500 pb-1">
                Community
              </Link>
              <Link href="/members/growers" className="text-sage-300 hover:text-white font-medium transition-colors">
                Growers
              </Link>
              <Link href="/members/cart">
                <Button variant="outline" className="relative bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 transition-all duration-300">
                  <ShoppingCart className="h-4 w-4" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 gold-gradient text-white text-xs animate-pulse">
                      {cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/members/profile">
                <Button variant="outline" className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 transition-all duration-300">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </nav>
            <MobileNav 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              cartItemCount={cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
              currentPath="/members/community/articles"
            />
          </div>
        </div>
      </header>
      {/* Hero/Intro Section */}
      <div className="relative w-full py-12 md:py-16 mb-8 md:mb-12 bg-gradient-to-r from-forest-900 via-sage-950 to-black overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
              Explore Cannabis Knowledge
            </h1>
            <p className="text-lg md:text-2xl text-sage-300 max-w-2xl mb-4 md:mb-6">
              Discover premium articles, guides, and tips from expert growers, scientists, and wellness professionals. Browse by category or dive into trending topics.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {articleCategories.map((cat) => (
                <Badge
                  key={cat.id}
                  className={`cursor-pointer px-4 py-2 text-base font-semibold ${cat.id === selectedCategory.id ? "premium-gradient text-white" : "bg-sage-900 text-sage-300 hover:bg-sage-800"}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat.title}
                </Badge>
              ))}
            </div>
          </div>
          <div className="hidden md:block flex-1 relative h-56 w-full max-w-md">
            <Image
              src="/images/indoor.webp"
              alt="Cannabis Knowledge"
              fill
              sizes="(max-width: 768px) 100vw, 50vw" // Adjust as needed
              className="object-cover rounded-2xl shadow-2xl border-4 border-forest-700/40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0 mb-8 md:mb-0">
          <div className="sticky top-24">
            <div className="rounded-2xl bg-sage-950/80 border border-sage-800 shadow-lg p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Categories</h3>
              <div className="flex flex-col gap-2">
                {articleCategories.map((cat) => {
                  const Icon = iconMap[cat.icon] || BookOpen
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-base border-2 ${
                        cat.id === selectedCategory.id
                          ? "border-forest-500 bg-gradient-to-r from-forest-900 via-sage-900 to-black text-white shadow-lg"
                          : "border-transparent bg-sage-900/60 text-sage-300 hover:bg-sage-800/80 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="flex-1">{cat.title}</span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-sage-800 text-sage-300 ml-2">
                        {articles.filter((a) => a.categorySlug === cat.id).length}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              {selectedCategory.title}
            </h2>
            <Link href="/members/community">
              <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Community
              </Button>
            </Link>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <Link key={article.id} href={`/members/community/articles/${article.slug}`} className="group">
                <Card className="relative bg-sage-950/90 border border-sage-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.025] group-hover:border-forest-500 group-hover:shadow-forest-900/30">
                  {/* Article Image */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                      <Badge className={`text-xs font-semibold px-3 py-1 ${
                        article.categorySlug === 'growing' ? 'premium-gradient text-white' :
                        article.categorySlug === 'terpenes' ? 'bg-purple-600 text-white' :
                        article.categorySlug === 'health' ? 'bg-emerald-600 text-white' :
                        'bg-amber-600 text-white'
                      }`}>
                        {article.category}
                      </Badge>
                      <Badge variant="outline" className="border-gold-500 text-gold-400 text-xs w-fit">
                        {article.difficulty}
                      </Badge>
                      {article.trending && (
                        <Badge className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs w-fit animate-pulse">Trending</Badge>
                      )}
                      {article.featured && (
                        <Badge className="gold-gradient text-white text-xs w-fit">Featured</Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sage-300 text-sm mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-sage-400" />
                        <span className="text-sage-300 text-xs font-medium truncate">{article.author}</span>
                      </div>
                      <span className="text-sage-500 text-xs">•</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-sage-400" />
                        <span className="text-sage-300 text-xs font-medium">{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* No articles fallback */}
          {filteredArticles.length === 0 && (
            <div className="text-center text-sage-400 py-16 text-lg">
              No articles found in this category yet.
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 