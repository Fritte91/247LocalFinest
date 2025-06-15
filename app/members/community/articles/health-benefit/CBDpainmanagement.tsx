
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
  Heart,
  Brain,
  Droplet,
} from "lucide-react"

export default function CBDPainManagement() {
  const methods = [
    {
      name: "Topical CBD",
      effectiveness: 70,
      pros: "Targeted relief, no psychoactivity",
      cons: "Limited systemic effects",
      color: "emerald",
      description: "Creams or balms applied directly to painful areas.",
    },
    {
      name: "Oral CBD",
      effectiveness: 80,
      pros: "Systemic relief, long-lasting",
      cons: "Slower onset, variable absorption",
      color: "blue",
      description: "Tinctures, capsules, or edibles taken orally.",
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
            <Badge className="bg-emerald-600 text-white">CBD</Badge>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              Health
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            CBD for Pain Management: A Natural Approach
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Discover how CBD can help manage pain, from chronic conditions to acute injuries, with insights into methods,
            benefits, and science-backed effectiveness.
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
              <span>10 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: June 1, 2025</div>
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
              Like (68)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="CBD Pain Management" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              CBD, a non-psychoactive cannabinoid, is gaining popularity for its potential to manage pain without the side
              effects of traditional medications. This guide explores its use for pain relief.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">How CBD Helps with Pain</h2>

            <p>
              CBD interacts with the endocannabinoid system to reduce inflammation and modulate pain signals, offering
              relief for conditions like arthritis, neuropathy, and muscle soreness.
            </p>

            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-emerald-400" />
                The Science of CBD for Pain
              </h3>
              <p className="text-emerald-100">
                CBD influences CB2 receptors to reduce inflammation and interacts with TRPV1 receptors to desensitize pain
                pathways, providing relief without intoxication.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">CBD Delivery Methods</h2>

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
                            <Heart className="h-4 w-4 text-sage-400" />
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
                          <span className="text-sage-400 text-sm">Effectiveness</span>
                          <span className={`text-${method.color}-400 font-semibold`}>{method.effectiveness}%</span>
                        </div>
                        <Progress value={method.effectiveness} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${method.color}-500 to-${method.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Droplet className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Benefits of CBD for Pain</h2>

            <p>
              CBD offers a natural alternative to opioids, with fewer side effects and no risk of addiction. It can be
              used for both acute and chronic pain management.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Acute Pain Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Relieves muscle soreness</li>
                    <li>• Reduces post-injury pain</li>
                    <li>• Soothes joint discomfort</li>
                    <li>• Fast-acting with topicals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Chronic Pain Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Manages arthritis pain</li>
                    <li>• Reduces neuropathic pain</li>
                    <li>• Improves quality of life</li>
                    <li>• Long-lasting with oral use</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Using CBD Safely</h2>

            <p>
              Start with a low dose (10-20 mg), monitor effects, and consult a healthcare provider, especially if taking
              other medications. Choose lab-tested, high-quality CBD products.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Pain Management</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Use lab-tested CBD products</li>
                <li>• Start with low doses</li>
                <li>• Combine topicals and oral methods</li>
                <li>• Consult a doctor for chronic pain</li>
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