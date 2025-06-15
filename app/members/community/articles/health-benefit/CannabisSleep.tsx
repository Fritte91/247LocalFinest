
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
  Moon,
  Brain,
  Flower,
} from "lucide-react"

export default function CannabisSleepQuality() {
  const compounds = [
    {
      name: "THC",
      sleepImpact: 75,
      pros: "Induces sleep, reduces REM",
      cons: "May cause grogginess",
      color: "purple",
      description: "Psychoactive cannabinoid that promotes sedation.",
    },
    {
      name: "CBD",
      sleepImpact: 65,
      pros: "Improves sleep quality, non-psychoactive",
      cons: "Less sedative, variable effects",
      color: "emerald",
      description: "Calms the mind to support restful sleep.",
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
            <Badge className="bg-purple-600 text-white">Sleep</Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Health
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Cannabis and Sleep Quality: A Restful Solution
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Explore how cannabis can improve sleep quality, from reducing insomnia to enhancing rest, with insights into
            THC, CBD, and best practices for use.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Dr. Emily Watson</div>
                <div className="text-sage-400 text-sm">Sleep Specialist</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>11 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: June 5, 2025</div>
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
              Like (73)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Cannabis Sleep Quality" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Cannabis has been used for centuries to promote sleep. Modern research highlights its potential to improve
              sleep quality, particularly for those with insomnia or anxiety-related sleep issues.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Cannabis and Sleep</h2>

            <p>
              THC can reduce the time it takes to fall asleep and decrease REM sleep, while CBD promotes relaxation and
              improves overall sleep quality without psychoactivity.
            </p>

            <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-purple-400" />
                The Science of Cannabis for Sleep
              </h3>
              <p className="text-purple-100">
                THC interacts with CB1 receptors to induce sedation, while CBD reduces anxiety and stabilizes sleep cycles,
                supporting deeper, restorative rest.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Compounds for Sleep</h2>

            <div className="space-y-6 my-8">
              {compounds.map((compound, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{compound.name}</h3>
                        <p className="text-sage-300 text-sm mb-4">{compound.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Pros: {compound.pros}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Cons: {compound.cons}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400 text-sm">Sleep Impact</span>
                          <span className={`text-${compound.color}-400 font-semibold`}>{compound.sleepImpact}%</span>
                        </div>
                        <Progress value={compound.sleepImpact} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${compound.color}-500 to-${compound.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Flower className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Benefits for Sleep</h2>

            <p>
              Cannabis can reduce sleep latency, alleviate insomnia, and improve sleep continuity, particularly for those
              with chronic pain or anxiety.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">THC Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Reduces time to fall asleep</li>
                    <li>• Decreases nightmares</li>
                    <li>• Helps with insomnia</li>
                    <li>• Promotes deep sleep</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">CBD Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Reduces anxiety</li>
                    <li>• Improves sleep quality</li>
                    <li>• Non-psychoactive</li>
                    <li>• Stabilizes sleep cycles</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Using Cannabis for Sleep</h2>

            <p>
              Choose indica strains or CBD-heavy products for evening use, starting with low doses (2.5-5 mg THC or 10-20
              mg CBD). Avoid overuse to prevent tolerance.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Better Sleep</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Use 1-2 hours before bedtime</li>
                <li>• Choose lab-tested products</li>
                <li>• Combine with good sleep hygiene</li>
                <li>• Consult a doctor for sleep disorders</li>
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
                <h3 className="text-xl font-semibold text-white mb-2">Dr. Emily Watson</h3>
                <p className="text-sage-300 mb-4">
                  Dr. Watson is a sleep specialist with expertise in cannabinoid therapies for sleep disorders. She has
                  published research on cannabis and sleep quality.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    Sleep Specialist
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">
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
