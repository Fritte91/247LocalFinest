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
  Thermometer,
  Brain,
  Zap,
} from "lucide-react"

export default function BestVaporizers2024() {
  const vaporizers = [
    {
      name: "POTV Lobo",
      rating: 85,
      pros: "Great value, replaceable battery",
      cons: "Bulky glass add-ons",
      color: "emerald",
      description: "Delivers potent, flavorful vapor for versatile use.",
    },
    {
      name: "Venty",
      rating: 90,
      pros: "Fast heat-up, high airflow",
      cons: "Large size, premium price",
      color: "purple",
      description: "Luxury vaporizer with unmatched vapor production.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            Vaporizers provide a healthier alternative to smoking, preserving cannabis flavor and potency. This guide
            highlights the best models for 2024, balancing performance and value.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Why Choose a Vaporizer?</h2>

          <p>
            Vaporizers heat cannabis to release cannabinoids and terpenes without combustion, reducing harmful toxins.
            Modern models offer precise temperature control and portability.
          </p>

          <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-emerald-400" />
              The Science of Vaporization
            </h3>
            <p className="text-emerald-100">
              Vaporizers operate at 350-400°F, below the combustion point (450°F+), preserving terpenes and reducing
              carcinogenic byproducts for a cleaner experience.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Top Vaporizers for 2024</h2>

          <div className="space-y-6 my-8">
            {vaporizers.map((vaporizer, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{vaporizer.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{vaporizer.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Pros: {vaporizer.pros}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Cons: {vaporizer.cons}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Performance Rating</span>
                        <span className={`text-${vaporizer.color}-400 font-semibold`}>{vaporizer.rating}%</span>
                      </div>
                      <Progress value={vaporizer.rating} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${vaporizer.color}-500 to-${vaporizer.color}-700 rounded-full flex items-center justify-center`}
                      >
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Features to Consider</h2>

          <p>
            Look for vaporizers with replaceable batteries, adjustable airflow, and hybrid heating systems for
            versatility. Price and portability also play a role in selection.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Precise temperature control</li>
                  <li>• High-quality vapor production</li>
                  <li>• Long battery life</li>
                  <li>• Compatibility with accessories</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Practical Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Portability for on-the-go use</li>
                  <li>• Easy maintenance</li>
                  <li>• Durable build quality</li>
                  <li>• Budget-friendly options</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing the Right Vaporizer</h2>

          <p>
            Select a vaporizer based on your needs: budget models like the XMAX Starry V4 for beginners, or premium
            options like the Venty for enthusiasts.
          </p>

          <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tips for Selection</h3>
            <ul className="space-y-2 text-sage-300">
              <li>• Match features to usage habits</li>
              <li>• Check battery life for portability</li>
              <li>• Read user reviews for reliability</li>
              <li>• Invest in trusted brands</li>
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
