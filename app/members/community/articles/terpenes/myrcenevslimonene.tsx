
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

export default function MyrceneVsLimonene() {
  const terpenes = [
    {
      name: "Myrcene",
      prevalence: 65,
      aroma: "Earthy, Musky, Herbal",
      effects: "Relaxing, Sedating",
      color: "emerald",
      description: "Promotes relaxation and enhances THC absorption.",
    },
    {
      name: "Limonene",
      prevalence: 45,
      aroma: "Citrus, Lemon, Orange",
      effects: "Uplifting, Mood Enhancement",
      color: "amber",
      description: "Boosts mood and provides stress relief.",
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
            Myrcene vs Limonene Effects: A Comparative Guide
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Compare myrcene and limonene, two dominant cannabis terpenes, to understand their effects, aromas, and
            therapeutic potential in shaping your cannabis experience.
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
              <span>9 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: May 15, 2025</div>
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
              Like (82)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Myrcene vs Limonene" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Myrcene and limonene are two of the most prevalent terpenes in cannabis, each offering distinct effects and
              aromas. This guide compares their properties to help you choose the right strain.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Myrcene vs Limonene Overview</h2>

            <p>
              Myrcene is known for its sedative, relaxing effects, while limonene is uplifting and mood-enhancing. Both
              interact with cannabinoids to influence the overall cannabis experience.
            </p>

            <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-purple-400" />
                The Science of Terpene Effects
              </h3>
              <p className="text-purple-100">
                Myrcene may increase THC’s psychoactive effects by enhancing blood-brain barrier permeability, while
                limonene interacts with serotonin receptors to boost mood.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Comparing Myrcene and Limonene</h2>

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
                          <span className={`text-${terpene.color}-400 font-semibold`}>{terpene.prevalence}%</span>
                        </div>
                        <Progress value={terpene.prevalence} className="h-3" />
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

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Therapeutic Applications</h2>

            <p>
              Myrcene is ideal for evening use, promoting relaxation and sleep, while limonene suits daytime use, enhancing
              focus and mood. Their effects can guide strain selection for specific needs.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Myrcene Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Enhances relaxation</li>
                    <li>• Promotes sedation</li>
                    <li>• May reduce pain</li>
                    <li>• Supports sleep disorders</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Limonene Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Elevates mood</li>
                    <li>• Reduces stress</li>
                    <li>• Supports focus</li>
                    <li>• Anti-anxiety properties</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing Between Them</h2>

            <p>
              Select myrcene-dominant strains for relaxation and limonene-dominant strains for energy. Lab-tested terpene
              profiles can help identify the best strains for your needs.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Selection</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Check lab reports for terpene dominance</li>
                <li>• Use myrcene strains at night</li>
                <li>• Choose limonene for daytime use</li>
                <li>• Store properly to preserve effects</li>
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
                  and has published numerous papers on cannabis chemistry.
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
