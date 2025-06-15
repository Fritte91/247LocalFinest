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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-purple-600 text-white">Terpenes</Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Science
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Understanding Cannabis Terpenes: The Complete Guide
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Discover the aromatic compounds that give cannabis its unique scents and effects. Learn how terpenes work
            synergistically with cannabinoids to create the entourage effect.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Dr. Sarah Rodriguez</div>
                <div className="text-sage-400 text-sm">Cannabis Scientist</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>12 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: January 20, 2024</div>
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
              Like (89)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Cannabis Terpenes" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
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

        <Separator className="my-8 bg-sage-800" />

        {/* Author Bio */}
        <Card className="bg-sage-950 border-sage-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Dr. Sarah Rodriguez</h3>
                <p className="text-sage-300 mb-4">
                  Dr. Rodriguez is a cannabis scientist with a PhD in Plant Biology. She specializes in terpene research
                  and has published numerous papers on the entourage effect and cannabis chemistry.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    PhD Plant Biology
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                    Terpene Specialist
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
