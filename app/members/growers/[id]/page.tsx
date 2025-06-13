"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf, Award, MapPin, Calendar, Users, ArrowLeft, Beaker, Sprout } from "lucide-react"

export default function GrowerProfilePage({ params }) {
  // Mock data - in real app this would come from API based on params.id
  const grower = {
    id: 1,
    name: "Marcus Chen",
    specialty: "Hydroponic Systems",
    experience: "12 years",
    location: "Northern California",
    bio: "Marcus is a pioneering cannabis cultivator who has dedicated over a decade to perfecting hydroponic growing techniques. His passion for innovation and sustainable practices has earned him recognition throughout the cannabis community.",
    image: "/images/beam.jpg",
    coverImage: "/images/weed2.jpg",
    followers: 2400,
    totalHarvests: 156,
    avgThc: 23.5,
    awards: [
      {
        title: "Cannabis Cup Winner 2023",
        category: "Best Indoor Flower",
        year: "2023",
        strain: "Purple Haze Premium",
      },
      {
        title: "Master Grower Award",
        category: "Innovation in Hydroponics",
        year: "2022",
        strain: "OG Kush Indoor",
      },
      {
        title: "Sustainable Cultivation",
        category: "Environmental Excellence",
        year: "2021",
        strain: "Green Dream",
      },
    ],
    strains: [
      {
        name: "Purple Haze Premium",
        type: "Sativa Dominant",
        thc: 22,
        cbd: 1,
        yield: "High",
        difficulty: "Advanced",
        flowerTime: "9-10 weeks",
        description: "Marcus's signature strain with exceptional terpene profiles",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "OG Kush Indoor",
        type: "Indica Dominant",
        thc: 24,
        cbd: 0.5,
        yield: "Medium-High",
        difficulty: "Intermediate",
        flowerTime: "8-9 weeks",
        description: "Classic OG genetics perfected through hydroponic cultivation",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Hybrid Balance",
        type: "Balanced Hybrid",
        thc: 20,
        cbd: 3,
        yield: "Medium",
        difficulty: "Beginner",
        flowerTime: "8 weeks",
        description: "Perfect introduction strain for new growers",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    techniques: [
      {
        name: "Deep Water Culture",
        description: "Advanced hydroponic system for maximum nutrient uptake",
        expertise: 95,
      },
      {
        name: "LED Optimization",
        description: "Precision lighting for enhanced cannabinoid production",
        expertise: 90,
      },
      {
        name: "Climate Control",
        description: "Environmental management for consistent quality",
        expertise: 88,
      },
      {
        name: "Organic Nutrients",
        description: "Sustainable feeding programs for premium results",
        expertise: 85,
      },
    ],
  }

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

      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={grower.coverImage || "/placeholder.svg"}
          alt={`${grower.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 premium-gradient rounded-full p-1">
              <Image
                src={grower.image || "/placeholder.svg"}
                alt={grower.name}
                width={160}
                height={160}
                className="w-full h-full rounded-full object-cover bg-black"
              />
            </div>
            <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 gold-gradient text-white">
              Master Grower
            </Badge>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-display font-bold text-white mb-2">{grower.name}</h1>
            <p className="text-xl text-forest-400 font-semibold mb-4">{grower.specialty}</p>
            <p className="text-sage-300 text-lg leading-relaxed mb-6">{grower.bio}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-400">{grower.experience}</div>
                <div className="text-sage-400 text-sm">Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-400">{grower.awards.length}</div>
                <div className="text-sage-400 text-sm">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-400">{grower.followers}</div>
                <div className="text-sage-400 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-400">{grower.totalHarvests}</div>
                <div className="text-sage-400 text-sm">Harvests</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button className="premium-gradient text-white px-8">
                <Users className="h-4 w-4 mr-2" />
                Follow Grower
              </Button>
              <div className="flex items-center gap-4 text-sage-300">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{grower.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Growing since 2012</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="strains" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-sage-950 border border-sage-700 h-12">
            <TabsTrigger value="strains" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Sprout className="h-4 w-4 mr-2" />
              Signature Strains
            </TabsTrigger>
            <TabsTrigger value="awards" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Award className="h-4 w-4 mr-2" />
              Awards
            </TabsTrigger>
            <TabsTrigger
              value="techniques"
              className="data-[state=active]:bg-forest-600 data-[state=active]:text-white"
            >
              <Beaker className="h-4 w-4 mr-2" />
              Techniques
            </TabsTrigger>
          </TabsList>

          {/* Strains Tab */}
          <TabsContent value="strains">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grower.strains.map((strain, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800 hover-lift">
                  <CardHeader className="text-center">
                    <Image
                      src={strain.image || "/placeholder.svg"}
                      alt={strain.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="text-white font-display">{strain.name}</CardTitle>
                    <CardDescription className="text-forest-400 font-semibold">{strain.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sage-300 text-sm">{strain.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-forest-400">{strain.thc}%</div>
                        <div className="text-xs text-sage-400">THC</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-sage-400">{strain.cbd}%</div>
                        <div className="text-xs text-sage-400">CBD</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-sage-400">Yield:</span>
                        <span className="text-sage-300">{strain.yield}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-sage-400">Difficulty:</span>
                        <span className="text-sage-300">{strain.difficulty}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-sage-400">Flower Time:</span>
                        <span className="text-sage-300">{strain.flowerTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Awards Tab */}
          <TabsContent value="awards">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grower.awards.map((award, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800 hover-lift">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 gold-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white font-display">{award.title}</CardTitle>
                    <CardDescription className="text-gold-400 font-semibold">{award.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <Badge className="premium-gradient text-white">{award.year}</Badge>
                    <p className="text-sage-300">
                      <span className="text-forest-400 font-semibold">Winning Strain:</span> {award.strain}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Techniques Tab */}
          <TabsContent value="techniques">
            <div className="grid md:grid-cols-2 gap-6">
              {grower.techniques.map((technique, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800">
                  <CardHeader>
                    <CardTitle className="text-white font-display flex items-center gap-3">
                      <Beaker className="h-6 w-6 text-forest-500" />
                      {technique.name}
                    </CardTitle>
                    <CardDescription className="text-sage-300">{technique.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sage-400">Expertise Level</span>
                        <span className="text-forest-400 font-bold">{technique.expertise}%</span>
                      </div>
                      <Progress value={technique.expertise} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
