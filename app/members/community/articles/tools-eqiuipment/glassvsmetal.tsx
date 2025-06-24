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
  GlassWater,
  Brain,
  Wrench,
} from "lucide-react"

export default function GlassVsMetalPipes() {
  const pipes = [
    {
      name: "Glass Pipes",
      suitability: 80,
      pros: "Pure flavor, aesthetic designs",
      cons: "Fragile, requires careful handling",
      color: "blue",
      description: "Ideal for savoring cannabis terpenes at home.",
    },
    {
      name: "Metal Pipes",
      suitability: 75,
      pros: "Durable, portable",
      cons: "Slight metallic taste, conducts heat",
      color: "gray",
      description: "Perfect for travel and rugged use.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            Glass and metal pipes offer distinct experiences for cannabis users. This guide compares their features to
            help you choose the right one.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Glass vs Metal Pipes Overview</h2>

          <p>
            Glass pipes prioritize flavor and aesthetics, while metal pipes focus on durability and portability. Your
            choice depends on usage habits and priorities.
          </p>

          <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-purple-400" />
              The Science of Pipe Materials
            </h3>
            <p className="text-purple-100">
              Glass is inert, preserving cannabis flavor, while metal's conductivity can affect taste and temperature,
              impacting the smoking experience.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Comparing Pipe Types</h2>

          <div className="space-y-6 my-8">
            {pipes.map((pipe, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{pipe.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{pipe.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <GlassWater className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Pros: {pipe.pros}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Cons: {pipe.cons}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Suitability</span>
                        <span className={`text-${pipe.color}-400 font-semibold`}>{pipe.suitability}%</span>
                      </div>
                      <Progress value={pipe.suitability} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${pipe.color}-500 to-${pipe.color}-700 rounded-full flex items-center justify-center`}
                      >
                        <Wrench className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">When to Choose Each</h2>

          <p>
            Glass pipes are best for home use where flavor and design shine, while metal pipes suit outdoor or travel
            scenarios due to their ruggedness.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Glass Pipe Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Pure, clean flavor</li>
                  <li>• Artistic, unique designs</li>
                  <li>• Easy to clean</li>
                  <li>• Enhances terpene experience</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Metal Pipe Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Highly durable</li>
                  <li>• Compact and portable</li>
                  <li>• Discreet for travel</li>
                  <li>• Built-in storage options</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Making Your Choice</h2>

          <p>
            Consider your environment and priorities. Test both types if possible, and invest in quality materials like
            borosilicate glass or stainless steel.
          </p>

          <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tips for Selection</h3>
            <ul className="space-y-2 text-sage-300">
              <li>• Prioritize flavor or durability</li>
              <li>• Check for ease of cleaning</li>
              <li>• Opt for trusted brands</li>
              <li>• Match pipe to usage context</li>
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
              <h3 className="text-xl font-semibold text-white mb-2">Alex Carter</h3>
              <p className="text-sage-300 mb-4">
                Alex Carter is a cannabis technology reviewer with over a decade of experience testing vaporizers and
                cultivation tools.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  Tech Reviewer
                </Badge>
                <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                  Cannabis Expert
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
