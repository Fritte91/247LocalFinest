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
  SnailIcon as Nose,
  Brain,
  Flower,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileNav } from "@/app/components/mobile-nav"
import ContentManager from "../content-manager"

export default function TerpeneGuide() {
  const terpenes = [
    {
      name: "Myrcene",
      percentage: 65,
      aroma: "Earthy, Musky, Herbal",
      effects: "Relaxing, Sedating",
      color: "emerald",
      description: "The most common terpene in cannabis, known for its relaxing effects.",
    },
    {
      name: "Limonene",
      percentage: 45,
      aroma: "Citrus, Lemon, Orange",
      effects: "Uplifting, Mood Enhancement",
      color: "amber",
      description: "Found in citrus fruits, promotes alertness and stress relief.",
    },
    {
      name: "Pinene",
      percentage: 35,
      aroma: "Pine, Fresh, Woody",
      effects: "Alertness, Memory Retention",
      color: "forest",
      description: "The most common terpene in nature, found in pine trees and rosemary.",
    },
    {
      name: "Linalool",
      percentage: 25,
      aroma: "Floral, Lavender, Spicy",
      effects: "Calming, Anti-anxiety",
      color: "purple",
      description: "Also found in lavender, known for its calming and anti-anxiety properties.",
    },
  ]
  // Simulate article data for this static article
  const article = {
    category: "Terpenes",
    categorySlug: "terpenes",
    difficulty: "Science",
    title: "Understanding Cannabis Terpenes: The Complete Guide",
    description: "Discover the aromatic compounds that give cannabis its unique scents and effects. Learn how terpenes work synergistically with cannabinoids to create the entourage effect.",
    author: "Dr. Sarah Rodriguez",
    publishDate: "January 20, 2024",
    readTime: "12 min read",
    views: 980,
    rating: 4.8,
    tags: ["Terpenes", "Science"],
    image: "/placeholder.svg?height=400&width=800",
    content: null // not used, content is below
  }
  const relatedArticles = [
    {
      slug: "myrcenevslimonene",
      image: "/images/placeholder.svg",
      title: "Myrcene vs Limonene: Understanding the Differences",
      description: "Compare two of the most important cannabis terpenes and their unique effects."
    },
    {
      slug: "preservinterpenes",
      image: "/images/placeholder.svg",
      title: "Preserving Terpenes",
      description: "Tips and tricks for keeping your terpenes fresh and potent."
    },
    {
      slug: "entourageeffect",
      image: "/images/placeholder.svg",
      title: "The Entourage Effect",
      description: "How cannabinoids and terpenes work together for unique effects."
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
            <Badge className="bg-purple-600 text-white">{article.category}</Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400">{article.difficulty}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-sage-300 mb-8 leading-relaxed">{article.description}</p>
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">{article.author}</div>
                <div className="text-sage-400 text-sm">Cannabis Scientist</div>
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
            <Button variant="default" className="bg-purple-700 hover:bg-purple-600 text-white border-none shadow-md">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="default" className="bg-purple-700 hover:bg-purple-600 text-white border-none shadow-md">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="default" className="bg-purple-700 hover:bg-purple-600 text-white border-none shadow-md">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-purple-500 text-purple-400">{tag}</Badge>
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
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Terpenes are aromatic compounds found in many plants, including cannabis. These molecules are responsible
              for the distinctive scents and flavors of different cannabis strains, but their influence extends far
              beyond just aroma. Research suggests that terpenes play a crucial role in the overall effects of cannabis
              through what's known as the entourage effect.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">What Are Terpenes?</h2>

            <p>
              Terpenes are organic compounds produced by a wide variety of plants as a defense mechanism against
              herbivores and to attract pollinators. In cannabis, terpenes are synthesized in the same glands that
              produce cannabinoids like THC and CBD - the trichomes.
            </p>

            <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-purple-400" />
                The Science Behind Terpenes
              </h3>
              <p className="text-purple-100">
                Over 200 different terpenes have been identified in cannabis, though most strains contain only a handful
                in significant concentrations. The specific combination and concentration of terpenes in a strain
                contribute to its unique "fingerprint" of effects and aromas.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Major Cannabis Terpenes</h2>

            <div className="space-y-6 my-8">
              {terpenes.map((terpene, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{terpene.name}</h3>
                        <p className="text-sage-300 text-sm mb-4">{terpene.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Nose className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">{terpene.aroma}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">{terpene.effects}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400 text-sm">Prevalence in Cannabis</span>
                          <span className={`text-${terpene.color}-400 font-semibold`}>{terpene.percentage}%</span>
                        </div>
                        <Progress value={terpene.percentage} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${terpene.color}-500 to-${terpene.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Flower className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">The Entourage Effect</h2>

            <p>
              The entourage effect is a theory that suggests cannabis compounds work better together than in isolation.
              This means that the combination of cannabinoids, terpenes, and other compounds creates a more complex and
              potentially more beneficial effect than any single compound alone.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Synergistic Effects</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Terpenes may enhance cannabinoid absorption</li>
                    <li>• Different combinations create unique effects</li>
                    <li>• May reduce unwanted side effects</li>
                    <li>• Enhances therapeutic potential</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Research Findings</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Myrcene may increase THC's psychoactive effects</li>
                    <li>• Pinene may counteract THC-induced memory impairment</li>
                    <li>• Linalool may enhance CBD's anti-anxiety effects</li>
                    <li>• Limonene may improve mood and reduce stress</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Preserving Terpenes</h2>

            <p>
              Terpenes are volatile compounds that can be easily lost during processing. Proper harvesting, drying, and
              storage techniques are crucial for preserving these valuable compounds. Low-temperature extraction methods
              and proper curing can help maintain terpene profiles.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Preserving Terpenes</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Store cannabis in airtight containers</li>
                <li>• Keep away from light and heat</li>
                <li>• Use low-temperature vaporization</li>
                <li>• Avoid over-drying during cure</li>
                <li>• Consider live resin products for maximum terpene content</li>
              </ul>
            </div>
          </div>
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
                    <Badge className="absolute top-2 left-2 bg-purple-600 text-white text-xs">{article.category}</Badge>
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
