"use client"

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
  Beaker,
  Heart,
  Wrench,
} from "lucide-react"

const categories = [
  {
    name: "Growing & Cultivation",
    slug: "growing",
    icon: Leaf,
    color: "emerald",
    articles: [
      {
        title: "Harvest & Curing Techniques",
        slug: "harvestcuring",
        description: "Learn the best practices for harvesting and curing.",
        author: "Dr. Rachel Lee",
        readTime: "11 min read",
      },
      {
        title: "Nutrient Schedules & Feeding",
        slug: "nutrient",
        description: "Optimize your feeding schedule for healthy plants.",
        author: "Marcus Chen",
        readTime: "14 min read",
      },
      {
        title: "Lighting for Maximum Yield",
        slug: "lightningforyield",
        description: "Master the art of grow lighting for maximum yields.",
        author: "Dr. Emily Nguyen",
        readTime: "12 min read",
      },
      {
        title: "Soil vs Hydroponic Systems",
        slug: "soilvshydroponic",
        description: "A complete comparison of soil and hydroponic growing.",
        author: "Sarah Rodriguez",
        readTime: "13 min read",
      },
    ]
  },
  {
    name: "Terpenes & Science",
    slug: "terpenes",
    icon: Beaker,
    color: "purple",
    articles: [
      {
        title: "Myrcene vs Limonene: Understanding the Differences",
        slug: "myrcenevslimonene",
        description: "Compare two of the most important cannabis terpenes.",
        author: "David Thompson",
        readTime: "10 min read",
      },
      {
        title: "The Entourage Effect",
        slug: "entourageeffect",
        description: "How cannabinoids and terpenes work together.",
        author: "Sarah Rodriguez",
        readTime: "9 min read",
      },
      {
        title: "Preserving Terpenes in Curing",
        slug: "preservinterpenes",
        description: "Best practices for keeping your terpenes intact.",
        author: "Marcus Chen",
        readTime: "8 min read",
      },
      {
        title: "Terpene Profiles Explained",
        slug: "terpenesprofiles",
        description: "Understanding cannabis terpenes and their effects.",
        author: "Sarah Rodriguez",
        readTime: "8 min read",
      },
    ]
  },
  {
    name: "Health & Benefits",
    slug: "health-benefit",
    icon: Heart,
    color: "rose",
    articles: [
      {
        title: "Microdosing: A Beginner's Guide",
        slug: "Microdosing-guide",
        description: "Learn the art of microdosing cannabis for therapeutic benefits.",
        author: "Dr. Lisa Chen",
        readTime: "7 min read",
      },
      {
        title: "Anxiety Relief Strains",
        slug: "AnxientyRelief",
        description: "Strains and tips for managing anxiety with cannabis.",
        author: "Sarah Rodriguez",
        readTime: "9 min read",
      },
      {
        title: "Cannabis and Sleep Quality",
        slug: "CannabisSleep",
        description: "Discover which strains work best for sleep.",
        author: "Marcus Chen",
        readTime: "10 min read",
      },
      {
        title: "CBD for Pain Management",
        slug: "CBDpainmanagement",
        description: "Learn how CBD can help manage different types of pain.",
        author: "Dr. Lisa Chen",
        readTime: "12 min read",
      },
    ]
  },
  {
    name: "Tools & Equipment",
    slug: "tools-eqiuipment",
    icon: Wrench,
    color: "amber",
    articles: [
      {
        title: "Growing Equipment Reviews",
        slug: "growingequipment",
        description: "Our top picks for grow room equipment.",
        author: "Equipment Team",
        readTime: "11 min read",
      },
      {
        title: "Storage Solutions Guide",
        slug: "storagesolutions",
        description: "How to store your cannabis for maximum freshness.",
        author: "Alex Carter",
        readTime: "10 min read",
      },
      {
        title: "Glass vs Metal Pipes: Which is Right for You?",
        slug: "glassvsmetal",
        description: "A comparison of popular pipe materials.",
        author: "Equipment Team",
        readTime: "9 min read",
      },
      {
        title: "Vaporizer Buying Guide 2024",
        slug: "vaporizer2024",
        description: "Find the perfect vaporizer for your needs.",
        author: "Equipment Team",
        readTime: "13 min read",
      },
    ]
  }
]

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl font-display font-bold text-white">GreenCraft</span>
            </Link>
            <Link href="/members/community">
              <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Community
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        category.slug === selectedCategory.slug
                          ? "bg-sage-800 text-white"
                          : "text-sage-300 hover:bg-sage-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {category.name}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-display font-bold text-white mb-8">
              {selectedCategory.name}
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              {selectedCategory.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/members/community/articles/${selectedCategory.slug}/${article.slug}`}
                >
                  <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sage-300 text-sm mb-4">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-sage-400">
                        <span>{article.author}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 