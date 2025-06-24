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
  Beaker,
  Brain,
  Heart,
  Package,
} from "lucide-react"

export default function ArticleTemplate() {
  // Sample data for demonstration
  const sampleData = [
    {
      name: "Sample Item 1",
      value: 75,
      description: "This is a sample item for demonstration",
      color: "emerald",
    },
    {
      name: "Sample Item 2", 
      value: 60,
      description: "Another sample item with different data",
      color: "purple",
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
            <Link href="/members/community">
              <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Community
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-emerald-600 text-white">Category</Badge>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              Subcategory
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Your Article Title Here
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Your article description goes here. This should be a compelling summary of what readers will learn.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Author Name</div>
                <div className="text-sage-400 text-sm">Expert Title</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>10 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: January 1, 2024</div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like (42)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Article Image" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Your article introduction goes here. This should hook the reader and provide context for what they're about to learn.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Main Section Title</h2>

            <p>
              Your main content goes here. This is where you provide detailed information, explanations, and insights.
            </p>

            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-emerald-400" />
                Key Information Box
              </h3>
              <p className="text-emerald-100">
                Use these highlighted boxes for important information, tips, or scientific explanations.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Data Section</h2>

            <div className="space-y-6 my-8">
              {sampleData.map((item, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                        <p className="text-sage-300 text-sm mb-4">{item.description}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400 text-sm">Value</span>
                          <span className={`text-${item.color}-400 font-semibold`}>{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${item.color}-500 to-${item.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Package className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Comparison Section</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Option A</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Benefit 1</li>
                    <li>• Benefit 2</li>
                    <li>• Benefit 3</li>
                    <li>• Benefit 4</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Option B</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Benefit 1</li>
                    <li>• Benefit 2</li>
                    <li>• Benefit 3</li>
                    <li>• Benefit 4</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Tips Section</h2>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Pro Tips</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Tip 1: Important advice for readers</li>
                <li>• Tip 2: Another valuable insight</li>
                <li>• Tip 3: Expert recommendation</li>
                <li>• Tip 4: Best practice to follow</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-sage-800" />

        {/* Author Bio */}
        <Card className="bg-sage-950 border-sage-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Author Name</h3>
                <p className="text-sage-300 mb-4">
                  Author bio goes here. Describe the author's expertise, credentials, and experience in the field.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                    Expert Title
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                    Years of Experience
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 