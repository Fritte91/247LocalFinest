"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  Sprout,
  Lightbulb,
  Thermometer,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileNav } from "@/app/components/mobile-nav"
import ContentManager from "../content-manager"

export default function IndoorCultivationGuide() {
  // Simulate article data for this static article
  const article = {
    category: "Growing Guide",
    categorySlug: "growing",
    difficulty: "Expert Level",
    title: "The Complete Guide to Indoor Cannabis Cultivation",
    description: "Master the art of indoor growing with our comprehensive guide covering everything from setup to harvest. Learn the secrets that our award-winning growers use to produce premium cannabis.",
    author: "Marcus Chen",
    publishDate: "January 15, 2024",
    readTime: "15 min read",
    views: 1200,
    rating: 4.9,
    tags: ["Growing", "Indoor", "Cultivation"],
    image: "/placeholder.svg?height=400&width=800",
    content: null // not used, content is below
  }
  const relatedArticles = [
    {
      slug: "hydroponic-systems-explained",
      image: "/placeholder.svg?height=150&width=300",
      title: "Hydroponic Systems Explained",
      description: "Learn about different hydroponic setups..."
    },
    {
      slug: "understanding-plant-nutrients",
      image: "/placeholder.svg?height=150&width=300",
      title: "Understanding Plant Nutrients",
      description: "Deep dive into NPK ratios and micronutrients..."
    },
    {
      slug: "best-led-lights-for-growing",
      image: "/placeholder.svg?height=150&width=300",
      title: "Best LED Lights for Growing",
      description: "Our top picks for cannabis cultivation lighting..."
    }
  ]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-950 via-forest-950 to-black">
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
              cartItemCount={0}
              currentPath="/members/community/articles"
            />
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="premium-gradient text-white">{article.category}</Badge>
            <Badge variant="outline" className="border-gold-500 text-gold-400">{article.difficulty}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-sage-300 mb-8 leading-relaxed">{article.description}</p>
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
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <span>Published: {article.publishDate}</span>
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
              <Badge key={index} variant="outline" className="border-sage-600 text-sage-300">{tag}</Badge>
            ))}
          </div>
        </div>
        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src={article.image} alt={article.title} fill className="object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        {/* Article Content */}
        <div className="mb-12">
          {/* Inline content, not ContentManager for this static article */}
          {/* ...existing article content here... */}
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
                      className="object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 premium-gradient text-white text-xs">{article.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="text-white font-semibold mb-2">{relatedArticle.title}</h4>
                    <p className="text-sage-300 text-sm">{relatedArticle.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
