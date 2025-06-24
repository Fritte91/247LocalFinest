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
    <>
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
    </>
  )
}
