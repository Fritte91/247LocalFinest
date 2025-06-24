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
  Package,
  Brain,
  Flower,
} from "lucide-react"

export default function PreservingTerpenes() {
  const methods = [
    {
      name: "Low-Temperature Drying",
      preservation: 85,
      pros: "Retains terpenes, preserves flavor",
      cons: "Longer drying time",
      color: "emerald",
      description: "Drying at 60-70°F to maintain terpene integrity.",
    },
    {
      name: "Controlled Curing",
      preservation: 80,
      pros: "Enhances flavor, smooths smoke",
      cons: "Requires precise humidity",
      color: "purple",
      description: "Curing in airtight jars with humidity control.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            Terpenes are delicate compounds that can degrade during curing if not handled properly. This guide explores
            methods to preserve terpenes for optimal cannabis quality.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Why Preserve Terpenes?</h2>

          <p>
            Terpenes contribute to cannabis aroma, flavor, and therapeutic effects. Preserving them during curing
            enhances the final product's sensory profile and potency.
          </p>

          <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-emerald-400" />
              The Science of Terpene Preservation
            </h3>
            <p className="text-emerald-100">
              Terpenes are volatile and sensitive to heat, light, and oxidation. Low temperatures and controlled humidity
              during curing minimize degradation and maintain potency.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Preservation Methods</h2>

          <div className="space-y-6 my-8">
            {methods.map((method, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{method.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{method.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Pros: {method.pros}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Cons: {method.cons}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Preservation Effectiveness</span>
                        <span className={`text-${method.color}-400 font-semibold`}>{method.preservation}%</span>
                      </div>
                      <Progress value={method.preservation} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${method.color}-500 to-${method.color}-700 rounded-full flex items-center justify-center`}
                      >
                        <Flower className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Curing Best Practices</h2>

          <p>
            Proper curing involves drying buds slowly and storing them in airtight containers with controlled humidity
            (60-65%) at 60-70°F to lock in terpenes and prevent degradation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Drying Tips</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Dry at 60-70°F with 45-55% humidity</li>
                  <li>• Use dark, well-ventilated spaces</li>
                  <li>• Avoid direct heat sources</li>
                  <li>• Monitor drying progress daily</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Curing Tips</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Use airtight glass jars</li>
                  <li>• Burp jars daily for 2 weeks</li>
                  <li>• Maintain 60-65% humidity</li>
                  <li>• Store in cool, dark places</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Maximizing Terpene Retention</h2>

          <p>
            Use humidity packs, avoid over-drying, and store cannabis away from light and heat to preserve terpenes.
            Lab testing post-curing can verify terpene retention.
          </p>

          <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tips for Terpene Preservation</h3>
            <ul className="space-y-2 text-sage-300">
              <li>• Use hygrometers to monitor humidity</li>
              <li>• Avoid plastic storage containers</li>
              <li>• Cure for at least 2-4 weeks</li>
              <li>• Test terpene levels post-curing</li>
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
              <h3 className="text-xl font-semibold text-white mb-2">Dr. Rachel Lee</h3>
              <p className="text-sage-300 mb-4">
                Dr. Rachel Lee is a postharvest expert with a PhD in Plant Pathology. She specializes in harvest and
                curing methods to optimize cannabis quality.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                  PhD Plant Pathology
                </Badge>
                <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                  Postharvest Specialist
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
