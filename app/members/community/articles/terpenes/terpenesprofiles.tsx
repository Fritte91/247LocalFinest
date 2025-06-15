
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

export default function TerpeneProfiles() {
  const terpenes = [
    {
      name: "Caryophyllene",
      prevalence: 55,
      aroma: "Spicy, Peppery, Woody",
      effects: "Anti-inflammatory, Stress Relief",
      color: "red",
      description: "A spicy terpene with potential anti-inflammatory properties.",
    },
    {
      name: "Terpinolene",
      prevalence: 30,
      aroma: "Floral, Herbal, Fruity",
      effects: "Uplifting, Antioxidant",
      color: "orange",
      description: "Less common, known for its uplifting and energizing effects.",
    },
    {
      name: "Humulene",
      prevalence: 40,
      aroma: "Earthy, Hoppy, Herbal",
      effects: "Anti-bacterial, Appetite Suppressant",
      color: "green",
      description: "Found in hops, contributes to anti-inflammatory effects.",
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
            <Badge className="bg-purple-600 text-white">Terpenes</Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Science
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Terpene Profiles Explained: Unlocking Cannabis Aromas
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Dive into the world of terpene profiles to understand how these compounds shape cannabis aromas, flavors, and
            effects, creating unique strain characteristics.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Dr. Sarah Rodriguez</div>
                <div className="text-sage-400 text-sm">Cannabis Scientist</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>10 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: May 10, 2025</div>
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
              Like (78)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src="/placeholder.svg?height=400&width=800" alt="Terpene Profiles" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Terpene profiles define the unique sensory and therapeutic characteristics of cannabis strains. These
              aromatic compounds create distinct aromas and flavors while influencing the plant’s effects.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">What Are Terpene Profiles?</h2>

            <p>
              A terpene profile is the specific combination and concentration of terpenes in a cannabis strain. Over 200
              terpenes exist in cannabis, but each strain typically features a few dominant ones, creating its unique
              “fingerprint” of aroma and effects.
            </p>

            <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-purple-400" />
                The Science of Terpene Profiles
              </h3>
              <p className="text-purple-100">
                Terpenes are volatile organic compounds produced in cannabis trichomes alongside cannabinoids. Their
                concentrations vary based on genetics, growing conditions, and curing methods.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Key Terpene Profiles</h2>

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

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Impact of Terpene Profiles</h2>

            <p>
              Terpene profiles influence not only aroma and flavor but also the therapeutic effects of cannabis. They
              interact with cannabinoids to modulate effects, a phenomenon known as the entourage effect.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Sensory Impact</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Defines strain aroma and flavor</li>
                    <li>• Enhances user experience</li>
                    <li>• Varies by strain genetics</li>
                    <li>• Influences consumer preference</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Therapeutic Impact</h3>
                  <ul className="space-y-2 text-sage-300 text-sm">
                    <li>• Modulates cannabinoid effects</li>
                    <li>• Contributes to strain-specific benefits</li>
                    <li>• Supports targeted therapies</li>
                    <li>• Enhances entourage effect</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Analyzing Terpene Profiles</h2>

            <p>
              Lab testing can identify a strain’s terpene profile, helping growers and consumers choose strains based on
              desired effects. Proper cultivation and curing preserve these profiles for maximum impact.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tips for Understanding Profiles</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Request lab-tested terpene data</li>
                <li>• Match profiles to desired effects</li>
                <li>• Experiment with strain combinations</li>
                <li>• Store cannabis properly to preserve terpenes</li>
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
      </div>
    </div>
  )
}
