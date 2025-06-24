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
  Droplet,
  Brain,
  Wheat,
} from "lucide-react"

export default function NutrientSchedules() {
  const nutrients = [
    {
      name: "Nitrogen (N)",
      importance: 80,
      role: "Leaf growth, photosynthesis",
      deficiency: "Yellowing leaves, stunted growth",
      color: "green",
      description: "Essential for vegetative growth and chlorophyll production.",
    },
    {
      name: "Phosphorus (P)",
      importance: 70,
      role: "Root development, flowering",
      deficiency: "Purple stems, slow growth",
      color: "purple",
      description: "Crucial for energy transfer and bud formation.",
    },
    {
      name: "Potassium (K)",
      importance: 65,
      role: "Water uptake, enzyme activation",
      deficiency: "Brown leaf edges, weak stems",
      color: "amber",
      description: "Supports overall plant health and resilience.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            Nutrients are the fuel for cannabis growth, and a proper feeding schedule ensures plants thrive through
            vegetative and flowering stages. This guide covers essential nutrients and feeding strategies.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Understanding Nutrients</h2>
          <p>
            Cannabis requires macronutrients (N, P, K) in large amounts and micronutrients (e.g., calcium, magnesium) in
            trace amounts. Nutrient needs change with growth stages, with higher nitrogen during vegetative growth
            and phosphorus and potassium during flowering.
          </p>

          <div className="bg-gradient-to-r from-green-950 to-green-900 border border-green-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-green-400" />
              The Science of Nutrient Uptake
            </h3>
            <p className="text-green-100">
              Plants absorb nutrients through their roots, influenced by pH and medium. Optimal pH (5.5-6.5) ensures
              nutrient availability, preventing lockout or deficiencies.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Macronutrients</h2>
          <div className="space-y-6">
            {nutrients.map((nutrient, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{nutrient.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{nutrient.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Droplet className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Role: {nutrient.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Deficiency: {nutrient.deficiency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Importance</span>
                        <span className={`text-${nutrient.color}-400 font-semibold`}>{nutrient.importance}%</span>
                      </div>
                      <Progress value={nutrient.importance} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div className={`w-16 h-16 bg-gradient-to-br from-${nutrient.color}-600 to-${nutrient.color}-800 rounded-full flex items-center justify-center`}>
                        <Wheat className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Creating a Feeding Schedule</h2>
          <p>
            Feeding schedules vary by growth stage. Use high-nitrogen fertilizers during vegetative growth (2-3 weeks)
            and switch to phosphorus-rich formulas during flowering (6-6 weeks). Flush plants with plain water in the
            2 weeks before the last 2 weeks to enhance flavor.
          </p>

          <div className="grid md:grid-cols-2 gap-2">
            <Card className="bg-sage-500 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Vegetative Feeding</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>NPK ratio: 3:1:1</li>
                  <li>Feed every 2-3 days</li>
                  <li>EC: 1.0-1.4</li>
                  <li>pH: 6.0-6.5</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-sage-500 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Flowering Feeding</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>NPK ratio: 1:2:3</li>
                  <li>Feed every 2-3 days</li>
                  <li>EC: 1.4-2.0</li>
                  <li>pH: 5.5-6.0</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing Nutrients</h2>
          <p>
            Choose reputable nutrient brands and consider organic options for soil or synthetic blends for hydroponics.
            Supplements like bloom boosters or calmag can address specific needs.
          </p>

          <div className="bg-sage-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-6">Tips for Nutrient Success</h3>
            <ul className="space-y-2 text-sage-300">
              <li>Test pH and EC regularly</li>
              <li>Use filtered water</li>
              <li>Start with 50% recommended strength</li>
              <li>Flush every 2-3 weeks</li>
            </ul>
          </div>
        </div>
      </div>
      <Separator className="my-8 bg-sage-800" />
      {/* Author Bio */}
      <div className="bg-sage-950 border-sage-800 rounded-lg p-6 mt-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-700 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Dr. Lisa Patel</h3>
            <p className="text-sage-300 mb-4">
              Dr. Lisa Patel is a plant nutritionist with a PhD in Soil Science. She
              specializes in nutrient management for cannabis and has developed feeding schedules for commercial
              cultivation.
            </p>
            <div className="flex gap-2">
              <Badge className="border-green-500 text-green-400">PhD in Soil Science</Badge>
              <Badge className="border-green-600 text-green-400">Nutrient Specialist</Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}