"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Leaf, User, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp, Sprout, Lightbulb, Thermometer } from "lucide-react"

export default function IndoorCultivationGuide() {
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
            <Badge className="premium-gradient text-white">Growing Guide</Badge>
            <Badge variant="outline" className="border-gold-500 text-gold-400">
              Expert Level
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            The Complete Guide to Indoor Cannabis Cultivation
          </h1>

          <p className="text-xl text-sage-300 mb-6 leading-relaxed">
            Master the art of indoor growing with our comprehensive guide covering everything from setup to harvest.
            Learn the secrets that our award-winning growers use to produce premium cannabis.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 premium-gradient rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Marcus Chen</div>
                <div className="text-sage-400 text-sm">Master Grower</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sage-300">
              <Clock className="h-4 w-4" />
              <span>15 min read</span>
            </div>
            <div className="text-sage-400 text-sm">Published: January 15, 2024</div>
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
              Like (47)
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Indoor Cannabis Cultivation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Indoor cannabis cultivation offers complete control over your growing environment, allowing you to produce
              premium quality cannabis year-round. Whether you're a beginner or looking to refine your techniques, this
              comprehensive guide will walk you through every aspect of successful indoor growing.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">
              Getting Started: Essential Equipment
            </h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="h-6 w-6 text-gold-500" />
                    <h3 className="text-lg font-semibold text-white">Lighting Systems</h3>
                  </div>
                  <p className="text-sage-300 text-sm">
                    LED lights are the gold standard for indoor growing. They provide full spectrum light while
                    maintaining low heat output and energy efficiency.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Thermometer className="h-6 w-6 text-red-500" />
                    <h3 className="text-lg font-semibold text-white">Climate Control</h3>
                  </div>
                  <p className="text-sage-300 text-sm">
                    Maintain temperatures between 70-80°F during the day and 65-75°F at night. Humidity should be 40-60%
                    during flowering.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p>
              The foundation of any successful indoor grow starts with proper equipment selection. Your grow tent or
              room should be completely light-proof during dark periods, as even small light leaks can disrupt the
              flowering cycle and cause hermaphroditism in your plants.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Choosing Your Growing Medium</h2>

            <p>
              The choice between soil and hydroponic systems depends on your experience level and desired outcomes. Soil
              provides a more forgiving environment for beginners, while hydroponic systems offer faster growth and
              potentially higher yields for experienced growers.
            </p>

            <div className="bg-sage-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-forest-500" />
                Pro Tip from Marcus Chen
              </h3>
              <p className="text-sage-300 italic">
                "I always recommend starting with a high-quality organic soil mix for your first few grows. Once you
                understand how cannabis plants respond to different conditions, you can experiment with hydroponic
                systems for maximum control and yield."
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Nutrient Management</h2>

            <p>
              Cannabis plants have different nutritional needs during vegetative and flowering stages. During
              vegetation, plants require higher nitrogen levels to support leaf and stem growth. As they transition to
              flowering, phosphorus and potassium become more important for bud development.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="text-center p-4 dark-glass rounded-lg">
                <div className="text-2xl font-bold text-forest-400 mb-2">3-1-2</div>
                <div className="text-sage-300 text-sm">Vegetative Stage NPK Ratio</div>
              </div>
              <div className="text-center p-4 dark-glass rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-2">1-3-2</div>
                <div className="text-sage-300 text-sm">Flowering Stage NPK Ratio</div>
              </div>
              <div className="text-center p-4 dark-glass rounded-lg">
                <div className="text-2xl font-bold text-gold-400 mb-2">6.0-6.5</div>
                <div className="text-sage-300 text-sm">Optimal pH Range</div>
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Training Techniques</h2>

            <p>
              Plant training techniques like LST (Low Stress Training), SCROG (Screen of Green), and topping can
              significantly increase your yields by creating more bud sites and ensuring even light distribution across
              the canopy.
            </p>

            <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Harvest and Curing</h2>

            <p>
              Timing your harvest correctly is crucial for potency and flavor. Trichomes should be mostly cloudy with
              some amber when viewed under a jeweler's loupe. After harvest, proper drying and curing will preserve
              terpenes and improve the overall quality of your cannabis.
            </p>

            <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-sage-300">
                <li>• Start with quality genetics from reputable sources</li>
                <li>• Maintain consistent environmental conditions</li>
                <li>• Monitor pH and nutrient levels regularly</li>
                <li>• Be patient during the curing process</li>
                <li>• Keep detailed records of your grows</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-sage-800" />

        {/* Author Bio */}
        <Card className="bg-sage-950 border-sage-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Marcus Chen</h3>
                <p className="text-sage-300 mb-4">
                  Marcus is a master grower with over 12 years of experience in cannabis cultivation. He specializes in
                  hydroponic systems and has won multiple Cannabis Cup awards for his innovative growing techniques.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-forest-500 text-forest-400">
                    12 Years Experience
                  </Badge>
                  <Badge variant="outline" className="border-gold-500 text-gold-400">
                    Cannabis Cup Winner
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-display font-bold text-white mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer">
              <div className="relative h-32">
                <Image
                  src="/placeholder.svg?height=150&width=300"
                  alt="Related Article"
                  fill
                  className="object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 premium-gradient text-white text-xs">Growing</Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="text-white font-semibold mb-2">Hydroponic Systems Explained</h4>
                <p className="text-sage-300 text-sm">Learn about different hydroponic setups...</p>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer">
              <div className="relative h-32">
                <Image
                  src="/placeholder.svg?height=150&width=300"
                  alt="Related Article"
                  fill
                  className="object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-purple-600 text-white text-xs">Science</Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="text-white font-semibold mb-2">Understanding Plant Nutrients</h4>
                <p className="text-sage-300 text-sm">Deep dive into NPK ratios and micronutrients...</p>
              </CardContent>
            </Card>

            <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer">
              <div className="relative h-32">
                <Image
                  src="/placeholder.svg?height=150&width=300"
                  alt="Related Article"
                  fill
                  className="object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-amber-600 text-white text-xs">Tools</Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="text-white font-semibold mb-2">Best LED Lights for Growing</h4>
                <p className="text-sage-300 text-sm">Our top picks for cannabis cultivation lighting...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
