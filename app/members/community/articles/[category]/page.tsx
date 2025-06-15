"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { articleCategories } from "../data"

export default function CategoryPage() {
  const params = useParams()
  const { category } = params

  const currentCategory = articleCategories.find(cat => cat.slug === category)

  if (!currentCategory) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
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

      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-white mb-4">{currentCategory.name}</h1>
          <p className="text-xl text-sage-300 max-w-2xl mx-auto">{currentCategory.description}</p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCategory.articles.map((article) => (
            <Link
              key={article.id}
              href={`/members/community/articles/${category}/${article.slug}`}
            >
              <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                  <Badge className={`absolute top-3 left-3 bg-${currentCategory.color}-600 text-white text-xs`}>
                    {article.tags[0]}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sage-300 text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-sage-400">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 