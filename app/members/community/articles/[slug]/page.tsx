"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  Beaker,
  Star,
  Eye,
  Calendar,
  ShoppingCart,
} from "lucide-react"
import { getArticleBySlug, getArticlesByCategory, articleCategories } from "../../data/education"
import { useApp, type CartItem } from "@/app/hooks/use-app"
import { MobileNav } from "@/app/components/mobile-nav"
import ContentManager from "../content-manager"

export default function ArticlePage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { cart } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const article = getArticleBySlug(params.slug)

  // Find the category for the article
  const category = articleCategories.find(cat => cat.id === article?.categorySlug)

  // Premium error/fallback if not found
  if (!article || !category) {
    return (
      <div className="min-h-screen bg-transparent">
        {/* Main Navbar/Header */}
        <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Leaf className="h-8 w-8 text-forest-500" />
                <span className="text-2xl md:text-2xl font-display font-bold text-white">247LocalFinest</span>
              </Link>
              <MobileNav 
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                cartItemCount={cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
                currentPath="/members/community/articles"
              />
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-sage-400 mb-6">Sorry, we couldn't find the article you were looking for.</p>
          <Link href="/members/community/articles">
            <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedArticles = getArticlesByCategory(article.categorySlug)
    .filter(a => a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-transparent">
      {/* Main Navbar/Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl md:text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            <MobileNav 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              cartItemCount={cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
              currentPath="/members/community/articles"
            />
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className={`$ {
              article.categorySlug === 'growing' ? 'premium-gradient text-white' :
              article.categorySlug === 'terpenes' ? 'bg-purple-600 text-white' :
              article.categorySlug === 'health' ? 'bg-emerald-600 text-white' :
              'bg-amber-600 text-white'
            }`}>
              {article.category}
            </Badge>
            <Badge variant="outline" className="border-gold-500 text-gold-400">
              {article.difficulty}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-sage-300 mb-8 leading-relaxed">
            {article.description}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-forest-500 to-forest-700 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">{article.author}</div>
                <div className="text-sage-400 text-sm">Expert Contributor</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Calendar className="h-4 w-4" />
              <span>{article.publishDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Eye className="h-4 w-4" />
              <span>{article.views?.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2 text-gold-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold">{article.rating}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button variant="default" className="bg-forest-700 hover:bg-forest-600 text-white border-none shadow-md">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="default" className="bg-forest-700 hover:bg-forest-600 text-white border-none shadow-md">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="default" className="bg-forest-700 hover:bg-forest-600 text-white border-none shadow-md">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-sage-600 text-sage-300">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content - Now using ContentManager */}
        <div className="mb-12">
          <ContentManager article={article} />
        </div>

        <Separator className="bg-sage-800 mb-8" />

        {/* Related Articles */}
        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold text-white mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle, index) => (
              <Link key={index} href={`/members/community/articles/${relatedArticle.slug}`} className="group">
                <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                  <div className="relative h-40">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <Badge className={`absolute top-2 left-2 text-xs ${
                      relatedArticle.categorySlug === 'growing' ? 'premium-gradient text-white' :
                      relatedArticle.categorySlug === 'terpenes' ? 'bg-purple-600 text-white' :
                      relatedArticle.categorySlug === 'health' ? 'bg-emerald-600 text-white' :
                      'bg-amber-600 text-white'
                    }`}>
                      {relatedArticle.category}
                    </Badge>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white font-semibold text-sm line-clamp-2">{relatedArticle.title}</h4>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sage-300 text-xs mb-3 line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-sage-400">
                      <span className="truncate">{relatedArticle.author}</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Community */}
        <div className="text-center">
          <Link href={`/members/community?tab=education${category ? `&category=${category.id}` : ''}`}>
            <Button className="premium-gradient text-white font-semibold px-6 py-3 rounded-lg shadow-md">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Education Hub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 