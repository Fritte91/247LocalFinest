
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
  Scissors,
  Brain,
  Package,
} from "lucide-react"

export default function HarvestCuring() {
  const techniques = [
    {
      name: "Wet Trimming",
      quality: 75,
      pros: "Easier cuts, faster drying",
      cons: "Sticky hands, messier",
      color: "emerald",
      description: "Trimming buds immediately after harvest before drying.",
    },
    {
      name: "Dry Trimming",
      quality: 80,
      pros: "Cleaner trim, better flavor",
      cons: "Time-consuming, harder cuts",
      color: "purple",
      description: "Trimming buds after drying for better preservation.",
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
            <Badge className="bg-emerald-600 text-white">Harvest</Badge>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              Postharvest
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Harvest & Curing Techniques: Perfecting Your Buds
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Discover the best practices for harvesting and curing to preserve cannabis quality and potency. Learn
            timing, trimming, and curing methods for optimal results.
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
              <span>11 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: April 25, 2025</div>
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
              Like (64)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Harvest Curing" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Harvesting and curing cannabis properly is essential to preserve potency, flavor, and aroma. This guide
              covers timing, trimming techniques, and curing methods to ensure top-quality buds.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Understanding Harvest & Curing</h2>

            <p>
              Harvesting involves cutting the plant at the right time, while curing is the controlled drying and aging
              process to enhance flavor and smoothness. Both require precision to maximize quality and avoid degradation
              of cannabinoids and terpenes.
            </p>

            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-emerald-400" />
                The Science of Curing
              </h3>
              <p className="text-emerald-100">
                Curing breaks down chlorophyll and sugars, enhancing terpene profiles and reducing harshness. Controlled
                humidity (50-60%) and temperature (60-70°F) are critical to prevent mold and preserve potency.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Trimming Techniques</h2>

            <div className="space-y-6 my-8">
              {techniques.map((technique, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{technique.name}</h3>
                        <p className="text-sage-300 text-sm mb-4">{technique.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Scissors className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Pros: {technique.pros}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Cons: {technique.cons}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400 text-sm">Quality Impact</span>
                          <span className={`text-${technique.color}-400 font-semibold`}>{technique.quality}%</span>
                        </div>
                        <Progress value={technique.quality} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${technique.color}-500 to-${technique.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Package className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Harvest Timing</h2>

            <p>
              Harvest when 70-90% of pistils are dark and trichomes are mostly cloudy (checked with a jeweler’s loupe).
              Cloudy trichomes indicate peak potency, while amber trichomes suggest a more sedative effect.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Wet Trimming Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Faster drying process</li>
                    <li>• Easier to remove large leaves</li>
                    <li>• Ideal for humid climates</li>
                    <li>• Reduces mold risk</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Dry Trimming Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Preserves terpenes</li>
                    <li>• Neater appearance</li>
                    <li>• Better for dry climates</li>
                    <li>• Enhances flavor</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Curing Process</h2>

            <p>
              After trimming, dry buds in a controlled environment (60-70°F, 45-55% humidity) for 7-14 days. Then, cure
              in airtight jars for 2-4 weeks, burping daily for the first two weeks to release moisture and prevent mold.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Curing Success</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Use a hygrometer to monitor jar humidity</li>
                <li>• Maintain 60-65% humidity in jars</li>
                <li>• Burp jars daily for the first 2 weeks</li>
                <li>• Store in a cool, dark place</li>
                <li>• Use humidity packs for long-term storage</li>
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
