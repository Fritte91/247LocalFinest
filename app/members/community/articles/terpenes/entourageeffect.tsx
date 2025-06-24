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
  Brain,
  Flower,
  Layers,
} from "lucide-react"

export default function EntourageEffect() {
  const components = [
    {
      name: "Cannabinoids",
      contribution: 70,
      role: "Primary psychoactive, therapeutic effects",
      examples: "THC, CBD, CBN",
      color: "purple",
      description: "Core compounds driving cannabis effects.",
    },
    {
      name: "Terpenes",
      contribution: 60,
      role: "Modulate effects, add aroma",
      examples: "Myrcene, Limonene, Pinene",
      color: "emerald",
      description: "Aromatic compounds enhancing synergy.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            The entourage effect is the theory that cannabis compounds work better together than in isolation, creating
            enhanced therapeutic and sensory effects.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">What is the Entourage Effect?</h2>

          <p>
            The entourage effect describes the synergistic interaction between cannabinoids, terpenes, and other cannabis
            compounds, resulting in effects greater than the sum of their parts.
          </p>

          <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-purple-400" />
              The Science Behind Synergy
            </h3>
            <p className="text-purple-100">
              Terpenes modulate cannabinoid activity by interacting with receptors or enhancing absorption, while
              cannabinoids like THC and CBD amplify each other's effects.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Components</h2>

          <div className="space-y-6 my-8">
            {components.map((component, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{component.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{component.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Role: {component.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">Examples: {component.examples}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Contribution to Effect</span>
                        <span className={`text-${component.color}-400 font-semibold`}>{component.contribution}%</span>
                      </div>
                      <Progress value={component.contribution} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${component.color}-500 to-${component.color}-700 rounded-full flex items-center justify-center`}
                      >
                        <Flower className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Benefits of the Entourage Effect</h2>

          <p>
            The entourage effect enhances therapeutic outcomes, reduces side effects, and creates strain-specific
            experiences, making whole-plant cannabis more effective than isolated compounds.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Therapeutic Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Enhanced pain relief</li>
                  <li>• Reduced anxiety</li>
                  <li>• Improved mood regulation</li>
                  <li>• Better sleep quality</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Practical Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Minimizes THC side effects</li>
                  <li>• Enhances strain uniqueness</li>
                  <li>• Supports targeted therapies</li>
                  <li>• Improves user experience</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Maximizing the Entourage Effect</h2>

          <p>
            Use whole-plant products, preserve terpenes during curing, and choose strains with diverse terpene profiles
            to maximize the entourage effect.
          </p>

          <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tips for Enhancing Synergy</h3>
            <ul className="space-y-2 text-sage-300">
              <li>• Opt for full-spectrum extracts</li>
              <li>• Preserve terpenes during curing</li>
              <li>• Choose lab-tested strains</li>
              <li>• Experiment with strain combinations</li>
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
              <h3 className="text-xl font-semibold text-white mb-2">Dr. Sarah Rodriguez</h3>
              <p className="text-sage-300 mb-4">
                Dr. Rodriguez is a cannabis scientist with a PhD in Plant Biology. She specializes in terpene research
                and has published numerous papers on the entourage effect and cannabis chemistry.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  PhD Plant Biology
                </Badge>
                <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                  Terpene Specialist
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
