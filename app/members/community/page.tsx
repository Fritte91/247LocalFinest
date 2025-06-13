"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, User, Users, Calendar, BookOpen, MessageCircle, Trophy, Video } from "lucide-react"

export default function CommunityPage() {
  const upcomingEvents = [
    {
      title: "Cannabis Cup 2024",
      date: "March 15-17, 2024",
      location: "Los Angeles, CA",
      type: "Competition",
      description: "Join us at the premier cannabis competition",
    },
    {
      title: "Cultivation Workshop",
      date: "April 5, 2024",
      location: "Virtual Event",
      type: "Education",
      description: "Advanced growing techniques masterclass",
    },
    {
      title: "Community Meetup",
      date: "April 20, 2024",
      location: "San Francisco, CA",
      type: "Social",
      description: "Connect with fellow cannabis enthusiasts",
    },
  ]

  const recentAwards = [
    {
      title: "Best Indoor Flower",
      event: "Cannabis Cup 2023",
      winner: "Marcus Chen",
      strain: "Purple Haze Premium",
    },
    {
      title: "Sustainable Grower",
      event: "Green Awards 2023",
      winner: "Sarah Rodriguez",
      strain: "Organic OG",
    },
    {
      title: "Innovation Award",
      event: "Industry Summit 2023",
      winner: "David Thompson",
      strain: "Hybrid Balance",
    },
  ]

  const growerProfiles = [
    {
      name: "Marcus Chen",
      specialty: "Hydroponic Systems",
      experience: "12 years",
      achievements: 15,
      followers: 2400,
      bio: "Pioneering hydroponic cultivation techniques with a focus on maximizing potency and yield.",
    },
    {
      name: "Sarah Rodriguez",
      specialty: "Organic Cultivation",
      experience: "8 years",
      achievements: 12,
      followers: 1800,
      bio: "Dedicated to sustainable, organic growing practices that respect the environment.",
    },
    {
      name: "David Thompson",
      specialty: "Genetics & Breeding",
      experience: "15 years",
      achievements: 20,
      followers: 3200,
      bio: "Master breeder developing new strains with unique cannabinoid profiles.",
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
              <span className="text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/members" className="text-sage-300 hover:text-white font-medium transition-colors">
                Shop
              </Link>
              <Link href="/members/community" className="text-white font-medium border-b-2 border-forest-500 pb-1">
                Community
              </Link>
              <Link href="/members/growers" className="text-sage-300 hover:text-white font-medium transition-colors">
                Growers
              </Link>
              <Button variant="outline" className="border-sage-600 text-sage-300">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Community Hub</h1>
          <p className="text-xl text-sage-300">Connect, learn, and grow with fellow cannabis enthusiasts</p>
        </div>

        {/* Community Tabs */}
        <Tabs defaultValue="events" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-sage-950 border border-sage-700">
            <TabsTrigger value="events" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="awards" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Trophy className="h-4 w-4 mr-2" />
              Awards
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Education
            </TabsTrigger>
            <TabsTrigger value="growers" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Growers
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800 hover-lift">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white font-display">{event.title}</CardTitle>
                      <Badge className="premium-gradient text-white">{event.type}</Badge>
                    </div>
                    <CardDescription className="text-sage-300">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-forest-400 font-semibold">{event.date}</p>
                      <p className="text-sage-400">{event.location}</p>
                    </div>
                    <Button className="w-full premium-gradient text-white">Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Awards Tab */}
          <TabsContent value="awards" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAwards.map((award, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800 hover-lift">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 gold-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white font-display">{award.title}</CardTitle>
                    <CardDescription className="text-gold-400 font-semibold">{award.event}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-forest-400 font-semibold mb-2">{award.winner}</p>
                    <p className="text-sage-300">{award.strain}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-sage-950 border-sage-800 hover-lift">
                <CardHeader className="text-center">
                  <BookOpen className="h-16 w-16 text-forest-500 mx-auto mb-4" />
                  <CardTitle className="text-white font-display">Cannabis Basics</CardTitle>
                  <CardDescription className="text-sage-300">Understanding cannabinoids and terpenes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full premium-gradient">Read Articles</Button>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800 hover-lift">
                <CardHeader className="text-center">
                  <Video className="h-16 w-16 text-forest-500 mx-auto mb-4" />
                  <CardTitle className="text-white font-display">Growing Guides</CardTitle>
                  <CardDescription className="text-sage-300">Step-by-step cultivation tutorials</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full premium-gradient">Watch Videos</Button>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800 hover-lift">
                <CardHeader className="text-center">
                  <MessageCircle className="h-16 w-16 text-forest-500 mx-auto mb-4" />
                  <CardTitle className="text-white font-display">Community Q&A</CardTitle>
                  <CardDescription className="text-sage-300">Ask questions and share knowledge</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full premium-gradient">Join Discussion</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Growers Tab */}
          <TabsContent value="growers" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {growerProfiles.map((grower, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800 hover-lift">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 premium-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-white font-display">{grower.name}</CardTitle>
                    <CardDescription className="text-forest-400 font-semibold">{grower.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sage-300 text-sm">{grower.bio}</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{grower.experience}</div>
                        <div className="text-xs text-sage-400">Experience</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gold-400">{grower.achievements}</div>
                        <div className="text-xs text-sage-400">Awards</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-forest-400">{grower.followers}</div>
                        <div className="text-xs text-sage-400">Followers</div>
                      </div>
                    </div>
                    <Link href={`/members/growers/${index + 1}`}>
                      <Button className="w-full premium-gradient">View Profile</Button>
                    </Link>
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
