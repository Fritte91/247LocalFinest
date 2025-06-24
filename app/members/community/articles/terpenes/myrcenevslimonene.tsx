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
  SnailIcon as Nose,
  Brain,
  Flower,
} from "lucide-react"

export default function MyrceneVsLimonene() {
  const terpenes = [
    {
      name: "Myrcene",
      prevalence: 65,
      aroma: "Earthy, Musky, Herbal",
      effects: "Relaxing, Sedating",
      color: "emerald",
      description: "Promotes relaxation and enhances THC absorption.",
    },
    {
      name: "Limonene",
      prevalence: 45,
      aroma: "Citrus, Lemon, Orange",
      effects: "Uplifting, Mood Enhancement",
      color: "amber",
      description: "Boosts mood and provides stress relief.",
    },
  ]

  return (
    <>
      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-sage-300 leading-relaxed space-y-6">
          <p className="text-lg">
            Myrcene and limonene are two of the most prevalent terpenes in cannabis, each offering distinct effects and
            aromas. This guide compares their properties to help you choose the right strain.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Myrcene vs Limonene Overview</h2>

          <p>
            Myrcene is known for its sedative, relaxing effects, while limonene is uplifting and mood-enhancing. Both
            interact with cannabinoids to influence the overall cannabis experience.
          </p>

          <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-purple-400" />
              The Science of Terpene Effects
            </h3>
            <p className="text-purple-100">
              Myrcene may increase THC's psychoactive effects by enhancing blood-brain barrier permeability, while
              limonene interacts with serotonin receptors to boost mood.
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Comparing Myrcene and Limonene</h2>

          <div className="space-y-6 my-8">
            {terpenes.map((terpene, index) => (
              <Card key={index} className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{terpene.name}</h3>
                      <p className="text-sage-300 text-sm mb-4">{terpene.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Nose className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">{terpene.aroma}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-sage-400" />
                          <span className="text-sage-300 text-sm">{terpene.effects}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400 text-sm">Prevalence in Cannabis</span>
                        <span className={`text-${terpene.color}-400 font-semibold`}>{terpene.prevalence}%</span>
                      </div>
                      <Progress value={terpene.prevalence} className="h-3" />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${terpene.color}-500 to-${terpene.color}-700 rounded-full flex items-center justify-center`}
                      >
                        <Flower className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Therapeutic Applications</h2>

          <p>
            Myrcene is ideal for evening use, promoting relaxation and sleep, while limonene suits daytime use, enhancing
            focus and mood. Their effects can guide strain selection for specific needs.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Myrcene Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Enhances relaxation</li>
                  <li>• Promotes sedation</li>
                  <li>• May reduce pain</li>
                  <li>• Supports sleep disorders</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Limonene Benefits</h3>
                <ul className="space-y-2 text-sage-300 text-sm">
                  <li>• Elevates mood</li>
                  <li>• Reduces stress</li>
                  <li>• Supports focus</li>
                  <li>• Anti-anxiety properties</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing Between Them</h2>

          <p>
            Select myrcene-dominant strains for relaxation and limonene-dominant strains for energy. Lab-tested terpene
            profiles can help identify the best strains for your needs.
          </p>

          <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tips for Selection</h3>
            <ul className="space-y-2 text-sage-300">
              <li>• Check lab reports for terpene dominance</li>
              <li>• Use myrcene strains at night</li>
              <li>• Choose limonene for daytime use</li>
              <li>• Store properly to preserve effects</li>
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
                and has published numerous papers on cannabis chemistry.
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
