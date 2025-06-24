"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Beaker,
  Brain,
  Flower,
  Heart,
  Package,
  Scissors,
  User,
  Clock,
  Star,
  Eye,
  Calendar,
} from "lucide-react"
import { Article } from "../data/education"

// Import custom article components
import HarvestCuring from "./growing/harvestcuring"
import AnxietyRelief from "./health-benefit/AnxientyRelief"
import TerpeneGuide from "./terpene-guide/page"
import IndoorGuide from "./indoor-cultivating-guide/page"
import CBDGuide from "./health-benefit/CBDpainmanagement"
import VaporizerGuide from "./tools-eqiuipment/vaporizer2024"
import MicrodosingGuide from "./health-benefit/Microdosing-guide"
import LightingGuide from "./growing/lightningforyield"
import MyrceneGuide from "./terpenes/myrcenevslimonene"
import SleepGuide from "./health-benefit/CannabisSleep"
import SoilGuide from "./growing/soilvshydroponic"
import NutrientGuide from "./growing/nutrient"

interface ContentManagerProps {
  article: Article
}

// Map of article slugs to their custom components
const customComponents: Record<string, React.ComponentType> = {
  "harvestcuring": HarvestCuring,
  "AnxientyRelief": AnxietyRelief,
  "terpene-guide": TerpeneGuide,
  "indoor-cultivating-guide": IndoorGuide,
  "CBDpainmanagement": CBDGuide,
  "vaporizer2024": VaporizerGuide,
  "Microdosing-guide": MicrodosingGuide,
  "lightningforyield": LightingGuide,
  "myrcenevslimonene": MyrceneGuide,
  "CannabisSleep": SleepGuide,
  "soilvshydroponic": SoilGuide,
  "nutrient": NutrientGuide,
}

export default function ContentManager({ article }: ContentManagerProps) {
  // Check if this article has a custom component
  const CustomComponent = customComponents[article.slug]

  if (CustomComponent) {
    return <CustomComponent />
  }

  // Fallback to data-driven content
  return <DataDrivenContent article={article} />
}

function DataDrivenContent({ article }: { article: Article }) {
  // Sample content structure - you can expand this based on article type
  const contentSections = [
    {
      type: "intro",
      content: `This comprehensive guide covers everything you need to know about ${article.title.toLowerCase()}. Whether you're a beginner or experienced enthusiast, you'll find valuable insights and practical tips.`
    },
    {
      type: "key-points",
      title: "Key Takeaways",
      points: [
        "Important foundational knowledge",
        "Practical applications and techniques",
        "Expert tips and best practices",
        "Common mistakes to avoid"
      ]
    },
    {
      type: "detailed-content",
      title: "In-Depth Analysis",
      content: `The ${article.category.toLowerCase()} field is constantly evolving with new research and techniques. Understanding the fundamentals is crucial for success. This section provides detailed information about the topic, including scientific background, practical applications, and expert recommendations.`
    }
  ]

  return (
    <div className="prose prose-invert max-w-none">
      <div className="text-sage-300 leading-relaxed space-y-6">
        {/* Introduction */}
        <p className="text-lg">
          {contentSections[0].content}
        </p>

        {/* Key Points Section */}
        <div className="bg-gradient-to-r from-sage-950 to-forest-950 border border-sage-800 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-forest-400" />
            {contentSections[1].title}
          </h3>
          <ul className="text-sage-300 space-y-2">
            {contentSections[1].points.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>
        </div>

        {/* Detailed Content */}
        <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">
          {contentSections[2].title}
        </h2>
        <p>
          {contentSections[2].content}
        </p>

        {/* Additional sections can be added here based on article type */}
        {article.categorySlug === 'growing' && (
          <GrowingSpecificContent />
        )}
        
        {article.categorySlug === 'health' && (
          <HealthSpecificContent />
        )}

        {article.categorySlug === 'terpenes' && (
          <TerpeneSpecificContent />
        )}

        {article.categorySlug === 'tools' && (
          <ToolsSpecificContent />
        )}
      </div>
    </div>
  )
}

// Category-specific content components
function GrowingSpecificContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">
        Growing Techniques
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-sage-950 border-sage-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Indoor Growing</h3>
            <ul className="space-y-2 text-sage-300 text-sm">
              <li>• Climate control systems</li>
              <li>• Lighting optimization</li>
              <li>• Nutrient management</li>
              <li>• Pest prevention</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-sage-950 border-sage-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Outdoor Growing</h3>
            <ul className="space-y-2 text-sage-300 text-sm">
              <li>• Site selection</li>
              <li>• Natural pest control</li>
              <li>• Weather protection</li>
              <li>• Harvest timing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function HealthSpecificContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">
        Health Benefits
      </h2>
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-emerald-400" />
          Therapeutic Applications
        </h3>
        <p className="text-emerald-100">
          Cannabis has shown promising results in various therapeutic applications, from pain management to anxiety relief. Understanding the science behind these benefits helps users make informed decisions.
        </p>
      </div>
    </div>
  )
}

function TerpeneSpecificContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">
        Terpene Science
      </h2>
      <div className="bg-gradient-to-r from-purple-950 to-purple-900 border border-purple-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Flower className="h-5 w-5 text-purple-400" />
          The Entourage Effect
        </h3>
        <p className="text-purple-100">
          Terpenes work synergistically with cannabinoids to create unique effects. This entourage effect is what makes each strain unique and why understanding terpene profiles is crucial.
        </p>
      </div>
    </div>
  )
}

function ToolsSpecificContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">
        Equipment Guide
      </h2>
      <div className="bg-gradient-to-r from-amber-950 to-amber-900 border border-amber-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-amber-400" />
          Essential Tools
        </h3>
        <p className="text-amber-100">
          Having the right tools and equipment is essential for successful cannabis cultivation and consumption. Quality equipment can make a significant difference in results.
        </p>
      </div>
    </div>
  )
} 