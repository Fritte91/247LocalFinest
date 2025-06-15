
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
            <Badge className="bg-emerald-600 text-white">Terpenes</Badge>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              Postharvest
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Preserving Terpenes in Curing: Best Practices
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Learn how to preserve terpenes during curing to maintain cannabis aroma, flavor, and potency. Discover
            techniques to protect these volatile compounds.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Dr. Rachel Lee</div>
                <div className="text-sage-400 text-sm">Postharvest Expert</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>10 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: May 20, 2025</div>
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
              Like (70)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Preserving Terpenes" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

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
              enhances the final product’s sensory profile and potency.
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
      </div>
    </div>
  )
}
