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
  Lock,
} from "lucide-react"

export default function StorageSolutionsGuide() {
  const solutions = [
    {
      name: "CVault Glass Jars",
      effectiveness: 90,
      pros: "Airtight, humidity control",
      cons: "Bulky for travel",
      color: "emerald",
      description: "Ideal for long-term cannabis storage.",
    },
    {
      name: "Tools420 Keychain",
      effectiveness: 80,
      pros: "Smell-proof, portable",
      cons: "Limited capacity",
      color: "gray",
      description: "Discreet storage for on-the-go use.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            Proper storage preserves cannabis potency, flavor, and aroma. This guide explores solutions to keep your
            herb fresh and effective.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Why Storage Matters</h2>

          <p>
            Exposure to air, light, and heat degrades cannabinoids and terpenes. Effective storage maintains quality and
            prevents mold growth.
          </p>

          <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-purple-400" />
              The Science of Cannabis Storage
            </h3>
            <p className="text-purple-100">
              Airtight containers with 58-62% humidity and cool, dark conditions slow oxidation and preserve terpenes,
              ensuring long-term freshness.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Top Storage Solutions</h2>

          <div className="space-y-6 my-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{solution.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{solution.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Pros: {solution.pros}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Cons: {solution.cons}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Effectiveness</span>
                        <span className={`text-${solution.color}-400 font-semibold`}>{solution.effectiveness}%</span>
                      </div>
                      <Progress value={solution.effectiveness} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${solution.color}-500 to-${solution.color}-700 rounded-full flex items-center justify-center`}
                      >
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Benefits of Proper Storage</h2>

          <p>
            Effective storage solutions extend cannabis shelf life, preserve potency, and enhance user experience by
            maintaining flavor and aroma.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Long-Term Storage</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Prevents terpene loss</li>
                  <li>• Maintains potency</li>
                  <li>• Reduces mold risk</li>
                  <li>• Preserves aroma</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Portable Storage</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Smell-proof design</li>
                  <li>• Discreet for travel</li>
                  <li>• Compact and durable</li>
                  <li>• Easy to carry</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing Storage Solutions</h2>

          <p>
            Select storage based on usage: glass jars for home, smell-proof containers for travel. Always use humidity
            packs for long-term preservation.
          </p>

          <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tips for Storage</h3>
            <ul className="space-y-2 text-sage-300">
              <li>• Use airtight containers</li>
              <li>• Store in cool, dark places</li>
              <li>• Include humidity packs</li>
              <li>• Choose smell-proof options</li>
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
