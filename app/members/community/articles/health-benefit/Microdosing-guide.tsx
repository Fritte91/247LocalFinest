
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
  Scale,
} from "lucide-react"

export default function MicrodosingGuidelines() {
  const methods = [
    {
      name: "Sublingual Tinctures",
      precision: 85,
      pros: "Accurate dosing, fast onset",
      cons: "Requires calibration",
      color: "emerald",
      description: "Drops placed under the tongue for quick absorption.",
    },
    {
      name: "Edibles",
      precision: 70,
      pros: "Long-lasting, discreet",
      cons: "Slower onset, variable absorption",
      color: "amber",
      description: "Low-dose gummies or capsules for sustained effects.",
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
            <Badge className="bg-emerald-600 text-white">Microdosing</Badge>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              Health
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Microdosing Guidelines: Small Doses, Big Benefits
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Learn how to microdose cannabis for therapeutic benefits without psychoactivity, including methods, dosing
            strategies, and safety tips.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Dr. Michael Chen</div>
                <div className="text-sage-400 text-sm">Pain Management Specialist</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>9 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: June 10, 2025</div>
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
              Like (65)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Microdosing Guidelines" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Microdosing involves taking small amounts of cannabis to achieve therapeutic benefits without the high,
              ideal for pain, anxiety, or focus enhancement.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">What is Microdosing?</h2>

            <p>
              Microdosing cannabis typically involves doses of 1-5 mg THC or 5-10 mg CBD, taken to provide subtle effects
              while maintaining normal function.
            </p>

            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-emerald-400" />
                The Science of Microdosing
              </h3>
              <p className="text-emerald-100">
                Low doses stimulate the endocannabinoid system without overwhelming it, promoting benefits like pain relief
                and mood enhancement with minimal side effects.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Microdosing Methods</h2>

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
                            <Droplet className="h-4 w-4 text-sage-400" />
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
                          <span className="text-sage-400 text-sm">Dosing Precision</span>
                          <span className={`text-${method.color}-400 font-semibold`}>{method.precision}%</span>
                        </div>
                        <Progress value={method.precision} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${method.color}-500 to-${method.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Scale className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Benefits of Microdosing</h2>

            <p>
              Microdosing offers therapeutic effects like pain relief, reduced anxiety, and improved focus without
              impairing daily activities.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Therapeutic Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Relieves mild pain</li>
                    <li>• Reduces anxiety</li>
                    <li>• Enhances mood</li>
                    <li>• Improves focus</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Practical Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• No psychoactivity</li>
                    <li>• Discreet use</li>
                    <li>• Minimal side effects</li>
                    <li>• Easy to integrate daily</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Microdosing Safely</h2>

            <p>
              Start with 1-2 mg THC or 5 mg CBD, wait 1-2 hours for effects, and adjust gradually. Keep a journal to track
              responses and consult a healthcare provider.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Microdosing</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Use precise dosing methods</li>
                <li>• Start low and go slow</li>
                <li>• Track effects in a journal</li>
                <li>• Choose lab-tested products</li>
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
                <h3 className="text-xl font-semibold text-white mb-2">Dr. Michael Chen</h3>
                <p className="text-sage-300 mb-4">
                  Dr. Chen is a pain management specialist with a focus on cannabinoid-based therapies. He has over 15
                  years of experience in treating chronic pain.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                    Pain Specialist
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Cannabinoid Researcher
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
