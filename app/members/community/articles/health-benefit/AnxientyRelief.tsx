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
    <>
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
    </>
  )
}