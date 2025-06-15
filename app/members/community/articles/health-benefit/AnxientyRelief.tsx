
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
  Flower,
  Brain,
  Heart,
} from "lucide-react"

export default function AnxietyReliefStrains() {
  const strains = [
    {
      name: "Granddaddy Purple",
      relief: 80,
      terpenes: "Myrcene, Caryophyllene",
      effects: "Relaxing, Calming",
      color: "purple",
      description: "Indica strain known for deep relaxation.",
    },
    {
      name: "Lemon Haze",
      relief: 75,
      terpenes: "Limonene, Pinene",
      effects: "Uplifting, Mood-Enhancing",
      color: "amber",
      description: "Sativa strain for gentle mood elevation.",
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
            <Badge className="bg-purple-600 text-white">Anxiety</Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Health
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Anxiety Relief Strains: Finding Calm with Cannabis
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Discover cannabis strains that help relieve anxiety, with insights into their terpene profiles, effects, and
            best practices for use.
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
              <span>10 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: June 15, 2025</div>
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
          <Image src="/placeholder.svg?height=400&width=800" alt="Anxiety Relief Strains" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Certain cannabis strains can help manage anxiety by promoting relaxation or uplifting mood, guided by their
              cannabinoid and terpene profiles.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Cannabis for Anxiety Relief</h2>

            <p>
              Strains high in CBD or with calming terpenes like myrcene or uplifting ones like limonene can reduce anxiety
              without overwhelming psychoactive effects.
            </p>

            <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-purple-400" />
                The Science of Anxiety Relief
              </h3>
              <p className="text-purple-100">
                CBD modulates serotonin receptors to reduce anxiety, while terpenes like limonene enhance mood and myrcene
                promotes sedation, creating a calming effect.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Top Anxiety Relief Strains</h2>

            <div className="space-y-6 my-8">
              {strains.map((strain, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{strain.name}</h3>
                        <p className="text-sage-300 text-sm mb-4">{strain.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Flower className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Terpenes: {strain.terpenes}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-sage-400" />
                            <span className="text-sage-300 text-sm">Effects: {strain.effects}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sage-400 text-sm">Anxiety Relief</span>
                          <span className={`text-${strain.color}-400 font-semibold`}>{strain.relief}%</span>
                        </div>
                        <Progress value={strain.relief} className="h-3" />
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${strain.color}-500 to-${strain.color}-700 rounded-full flex items-center justify-center`}
                        >
                          <Heart className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Benefits of Anxiety Relief Strains</h2>

            <p>
              These strains offer a natural way to manage anxiety, providing calming or uplifting effects tailored to
              individual needs.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Indica Strain Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Deep relaxation</li>
                    <li>• Reduces physical tension</li>
                    <li>• Promotes calm</li>
                    <li>• Ideal for evening use</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Sativa Strain Benefits</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Uplifts mood</li>
                    <li>• Enhances focus</li>
                    <li>• Reduces mental stress</li>
                    <li>• Suitable for daytime use</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing and Using Strains</h2>

            <p>
              Select strains based on terpene profiles and CBD/THC ratios. Start with low doses and use lab-tested products
              to ensure safety and efficacy.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Anxiety Relief</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Check terpene profiles</li>
                <li>• Start with microdoses</li>
                <li>• Use in a calm environment</li>
                <li>• Consult a healthcare provider</li>
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
                  Dr. Watson is a sleep specialist with expertise in cannabinoid therapies for mental health and sleep
                  disorders. She has published research on cannabis and anxiety.
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