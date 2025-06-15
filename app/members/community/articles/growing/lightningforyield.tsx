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
  Sun,
  Brain,
  Lightbulb,
} from "lucide-react"

export default function LightingForYield() {
  const lights = [
    {
      name: "LED",
      efficiency: 85,
      pros: "Energy-efficient, low heat",
      cons: "High upfront cost",
      color: "blue",
      description: "Modern full-spectrum lights for all growth stages.",
    },
    {
      name: "HPS",
      efficiency: 60,
      pros: "Proven yields, affordable",
      cons: "High heat, energy use",
      color: "amber",
      description: "Traditional high-pressure sodium lights for flowering.",
    },
    {
      name: "CMH",
      efficiency: 75,
      pros: "Balanced spectrum, efficient",
      cons: "Bulb replacement costs",
      color: "purple",
      description: "Ceramic metal halide lights for vegetative growth.",
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
            <Badge className="bg-amber-600 text-white">Lighting</Badge>
            <Badge variant="outline" className="border-amber-500 text-amber-400">
              Technology
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Lighting for Maximum Yield: Optimizing Cannabis Growth
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Learn how to choose and use grow lights to maximize cannabis yields, from LED to HPS, and understand the
            science behind light spectrums and intensity.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Dr. Emily Nguyen</div>
                <div className="text-sage-400 text-sm">Lighting Specialist</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>11 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: March 10, 2025</div>
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
              Like (95)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Grow Lighting" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Lighting is one of the most critical factors in cannabis cultivation, influencing growth rates, yields, and
              plant health. This guide explores the types of grow lights, their spectrums, and how to optimize them for
              maximum yield.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Understanding Grow Lights</h2>

            <p>
              Grow lights mimic sunlight, providing the energy plants need for photosynthesis. The type, spectrum, and
              intensity of light affect vegetative growth, flowering, and cannabinoid production. Common options include
              LED, HPS, and CMH lights.
            </p>

            <div className="bg-gradient-to-r from-amber-950 to-amber-900 border border-amber-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-amber-400" />
                The Science of Light Spectrums
              </h3>
              <p className="text-amber-100">
                Blue light (400-500 nm) promotes vegetative growth, while red light (600-700 nm) encourages flowering.
                Full-spectrum lights combine both for optimal results across all stages.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Types of Grow Lights</h2>

            <div className="space-y-6 my-8">
              {lights.map((light, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{light.name}</h3>
                        <p className="text-sage-300 text-sm mb-4">{light.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Pros: {light.pros}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Cons: {light.cons}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400 text-sm">Efficiency</span>
                          <span className={`text-${light.color}-400 font-semibold`}>{light.efficiency}%</span>
                        </div>
                        <Progress value={light.efficiency} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${light.color}-500 to-${light.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Lightbulb className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Optimizing Light Usage</h2>

            <p>
              Proper light placement, intensity, and schedules are crucial. Maintain 18-24 hours of light during vegetative
              growth and 12 hours during flowering. Adjust light height to avoid burn while ensuring sufficient intensity.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Light Intensity Tips</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Use 400-600 µmol/m²/s for vegetative stage</li>
                    <li>• Increase to 800-1000 µmol/m²/s for flowering</li>
                    <li>• Monitor with a PAR meter</li>
                    <li>• Adjust height based on plant response</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Light Schedule Tips</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• 18/6 for vegetative growth</li>
                    <li>• 12/12 for flowering</li>
                    <li>• Use timers for consistency</li>
                    <li>• Avoid light leaks during dark periods</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing Your Lights</h2>

            <p>
              LEDs are ideal for energy efficiency and versatility, HPS for budget-conscious growers, and CMH for balanced
              performance. Consider wattage, coverage area, and cooling needs when selecting lights.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Lighting Success</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Invest in quality brands</li>
                <li>• Ensure proper ventilation</li>
                <li>• Clean reflectors regularly</li>
                <li>• Upgrade to LEDs for long-term savings</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-sage-800" />

        {/* Author Bio */}
        <Card className="bg-sage-950 border-sage-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Dr. Emily Nguyen</h3>
                <p className="text-sage-300 mb-4">
                  Dr. Nguyen is a lighting specialist with a PhD in Agricultural Engineering. She focuses on optimizing
                  grow light systems for cannabis and other crops.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-amber-500 text-amber-400">
                    PhD Agricultural Engineering
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Lighting Expert
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