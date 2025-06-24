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
  Sprout,
  Brain,
  Lightbulb,
} from "lucide-react"

export default function GrowingEquipmentReviews() {
  const equipment = [
    {
      name: "Spider Farmer SF-4000",
      performance: 90,
      pros: "Energy-efficient, full-spectrum",
      cons: "High initial cost",
      color: "emerald",
      description: "LED grow light for robust cannabis yields.",
    },
    {
      name: "AC Infinity Cloudline T6",
      performance: 85,
      pros: "Quiet, smart controls",
      cons: "Requires ducting setup",
      color: "blue",
      description: "Inline fan for optimal ventilation.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            Quality growing equipment is essential for successful cannabis cultivation. This guide reviews top tools to
            enhance your grow setup.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Importance of Growing Equipment</h2>

          <p>
            Lights, ventilation, and nutrients shape plant health and yield. Investing in reliable equipment ensures
            consistent results and potency.
          </p>

          <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-emerald-400" />
              The Science of Cultivation Tools
            </h3>
            <p className="text-emerald-100">
              LED lights mimic sunlight for photosynthesis, while ventilation controls temperature and humidity, preventing
              mold and optimizing growth.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Top Growing Equipment</h2>

          <div className="space-y-6 my-8">
            {equipment.map((item, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{item.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Pros: {item.pros}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Cons: {item.cons}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Performance</span>
                        <span className={`text-${item.color}-400 font-semibold`}>{item.performance}%</span>
                      </div>
                      <Progress value={item.performance} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${item.color}-500 to-${item.color}-700 rounded-full flex items-center justify-center`}
                      >
                        <Lightbulb className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Benefits of Quality Equipment</h2>

          <p>
            High-quality tools improve yield, potency, and efficiency, making cultivation easier and more rewarding for
            growers of all levels.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Grow Light Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Enhances photosynthesis</li>
                  <li>• Adjustable spectrum</li>
                  <li>• Energy-efficient</li>
                  <li>• Increases bud density</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ventilation Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Prevents mold growth</li>
                  <li>• Regulates temperature</li>
                  <li>• Improves air quality</li>
                  <li>• Boosts plant health</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Selecting Growing Equipment</h2>

          <p>
            Choose equipment based on grow space, budget, and goals. Prioritize trusted brands and scalable solutions
            for long-term success.
          </p>

          <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tips for Growers</h3>
            <ul className="space-y-2 text-sage-300">
              <li>• Match equipment to grow size</li>
              <li>• Invest in reliable brands</li>
              <li>• Monitor environmental factors</li>
              <li>• Start with scalable tools</li>
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
              <h3 className="text-xl font-semibold text-white mb-2">Alex Carter</h3>
              <p className="text-sage-300 mb-4">
                Alex Carter is a cannabis technology reviewer with over a decade of experience testing vaporizers and
                cultivation tools.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-emerald-500 text-emerald-400">
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
