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
  SnailIcon as Water,
  Brain,
  Sprout,
} from "lucide-react"

export default function SoilVsHydroponics() {
  const systems = [
    {
      name: "Soil",
      efficiency: 70,
      pros: "Natural, forgiving, flavor-rich",
      cons: "Slower growth, pest risks",
      color: "emerald",
      description: "Traditional growing medium using organic or amended soil.",
    },
    {
      name: "Hydroponics",
      efficiency: 90,
      pros: "Faster growth, higher yields",
      cons: "Complex setup, maintenance",
      color: "blue",
      description: "Soilless system using nutrient-rich water solutions.",
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
            <Badge className="bg-emerald-600 text-white">Growing Systems</Badge>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              Cultivation
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Soil vs Hydroponic Systems: Which is Right for You?
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Explore the differences between soil and hydroponic growing systems to determine the best method for your
            cannabis cultivation goals, from flavor to yield.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Dr. James Carter</div>
                <div className="text-sage-400 text-sm">Horticulture Expert</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>10 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: February 15, 2025</div>
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
              Like (72)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Soil vs Hydroponics" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Choosing between soil and hydroponic systems is a critical decision for cannabis growers. Each method has
              unique advantages and challenges, impacting growth rates, yields, and plant quality. This guide breaks down
              the key differences to help you make an informed choice.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">What Are Soil and Hydroponic Systems?</h2>

            <p>
              Soil systems use natural or amended soil as the growing medium, providing nutrients and support to plants.
              Hydroponic systems, on the other hand, grow plants in a soilless medium, delivering nutrients directly
              through water solutions. Both methods can produce high-quality cannabis, but their approaches differ
              significantly.
            </p>

            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-emerald-400" />
                The Science Behind Growing Systems
              </h3>
              <p className="text-emerald-100">
                Soil systems rely on microbial activity to break down organic matter into plant-available nutrients.
                Hydroponics delivers precise nutrient solutions, allowing for faster nutrient uptake and controlled growth
                conditions.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Comparing Soil and Hydroponics</h2>

            <div className="space-y-6 my-8">
              {systems.map((system, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{system.name}</h3>
                        <p className="text-sage-300 text-sm mb-4">{system.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Water className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Pros: {system.pros}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Cons: {system.cons}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400 text-sm">Efficiency</span>
                          <span className={`text-${system.color}-400 font-semibold`}>{system.efficiency}%</span>
                        </div>
                        <Progress value={system.efficiency} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${system.color}-500 to-${system.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Sprout className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Considerations</h2>

            <p>
              Soil is ideal for beginners due to its simplicity and forgiving nature, producing robust flavors through
              organic processes. Hydroponics suits advanced growers seeking maximum yields and faster growth, requiring
              precise control and investment in equipment.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Soil Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Enhances terpene profiles</li>
                    <li>• Lower setup costs</li>
                    <li>• Sustainable with organic inputs</li>
                    <li>• Less frequent monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Hydroponic Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Up to 30% faster growth</li>
                    <li>• Higher yields per square foot</li>
                    <li>• Precise nutrient control</li>
                    <li>• Reduced pest issues</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing Your System</h2>

            <p>
              Consider your experience level, budget, and goals. Soil is best for small-scale, flavor-focused grows, while
              hydroponics excels in commercial or high-yield setups. Hybrid systems like coco coir can offer a middle
              ground.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Success</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Test soil pH (6.0-6.5) or hydroponic solution (5.5-6.0)</li>
                <li>• Invest in quality nutrients</li>
                <li>• Monitor environmental conditions</li>
                <li>• Start small to learn the system</li>
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
                <h3 className="text-xl font-semibold text-white mb-2">Dr. James Carter</h3>
                <p className="text-sage-300 mb-4">
                  Dr. Carter is a horticulture expert with over 20 years of experience in cannabis cultivation. He
                  specializes in optimizing growing systems for yield and quality.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                    Horticulture PhD
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Hydroponics Specialist
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