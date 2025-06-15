"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Leaf,
  User,
  Users,
  Calendar,
  BookOpen,
  Trophy,
  MapPin,
  Clock,
  Star,
  Medal,
  Crown,
  Sprout,
  Beaker,
  Heart,
  Flame,
  Microscope,
  Wrench,
} from "lucide-react"

// Helper to format dates consistently for SSR/CSR
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function CommunityPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedAward, setSelectedAward] = useState(null)

  const events = [
    {
      id: 1,
      title: "Cannabis Cup 2023",
      date: "2023-11-15",
      endDate: "2023-11-17",
      location: "Los Angeles, CA",
      type: "Competition",
      status: "past",
      description:
        "The premier cannabis competition where we showcased our finest strains and connected with industry leaders.",
      longDescription:
        "Cannabis Cup 2023 was an incredible experience where our team presented three award-winning strains. The event featured over 200 exhibitors, educational seminars, and networking opportunities with cannabis professionals from around the world.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      highlights: [
        "Won Best Indoor Flower with Purple Haze Premium",
        "Networked with 50+ industry professionals",
        "Featured in Cannabis Business Times",
        "Secured 3 new distribution partnerships",
      ],
      attendees: ["Marcus Chen", "Sarah Rodriguez", "David Thompson"],
      awards: ["Best Indoor Flower", "People's Choice Award"],
    },
    {
      id: 2,
      title: "Green Tech Summit 2024",
      date: "2024-03-20",
      endDate: "2024-03-22",
      location: "Denver, CO",
      type: "Conference",
      status: "upcoming",
      description: "Join us at the leading cannabis technology conference where innovation meets cultivation.",
      longDescription:
        "We'll be presenting our latest hydroponic innovations and sustainable growing practices. This summit brings together the brightest minds in cannabis technology and cultivation science.",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=300&width=400"],
      highlights: [
        "Presenting 'Future of Hydroponic Systems'",
        "Booth #47 - Live cultivation demos",
        "Panel discussion on sustainability",
        "Product launch: EcoGrow System 3.0",
      ],
      attendees: ["Marcus Chen", "Innovation Team"],
      expectedOutcomes: ["Launch new product line", "Secure investment partnerships"],
    },
    {
      id: 3,
      title: "Harvest Festival 2023",
      date: "2023-09-10",
      endDate: "2023-09-10",
      location: "Emerald Triangle, CA",
      type: "Festival",
      status: "past",
      description:
        "Celebrating the harvest season with the cannabis community in the heart of California's growing region.",
      longDescription:
        "A beautiful celebration of cannabis culture and community. We shared our knowledge through workshops and connected with local growers and enthusiasts.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      highlights: [
        "Hosted 'Organic Growing Workshop'",
        "50+ attendees at our educational booth",
        "Featured local grower partnerships",
        "Raised $2,000 for cannabis research",
      ],
      attendees: ["Sarah Rodriguez", "Community Team"],
      awards: ["Community Impact Award"],
    },
    {
      id: 4,
      title: "Cannabis Business Expo 2024",
      date: "2024-05-15",
      endDate: "2024-05-17",
      location: "Las Vegas, NV",
      type: "Business",
      status: "upcoming",
      description:
        "The largest cannabis business event where we'll showcase our premium products and business innovations.",
      longDescription:
        "Three days of business networking, product showcases, and industry insights. We'll be launching our new premium line and announcing major partnerships.",
      images: ["/placeholder.svg?height=400&width=600"],
      highlights: [
        "Launch of Premium Reserve Collection",
        "Major partnership announcements",
        "Investor meetups and presentations",
        "Live product demonstrations",
      ],
      attendees: ["Full Executive Team"],
      expectedOutcomes: ["$500K in new partnerships", "National distribution deals"],
    },
  ]

  const awards = [
    {
      id: 1,
      title: "Cannabis Cup Winner 2023",
      category: "Best Indoor Flower",
      year: "2023",
      event: "Cannabis Cup Los Angeles",
      winner: "Marcus Chen",
      strain: "Purple Haze Premium",
      description: "Awarded for exceptional quality, potency, and terpene profile in the indoor flower category.",
      certificateImage: "/placeholder.svg?height=600&width=800",
      eventImages: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      significance:
        "This award represents the pinnacle of indoor cultivation excellence and validates our innovative hydroponic techniques.",
      judgeComments:
        "Exceptional terpene profile with perfect cure and outstanding visual appeal. A true masterpiece of indoor cultivation.",
      competitionStats: {
        totalEntries: 247,
        categories: 12,
        judges: 15,
      },
    },
    {
      id: 2,
      title: "Sustainable Grower Award",
      category: "Environmental Excellence",
      year: "2023",
      event: "Green Cannabis Awards",
      winner: "Sarah Rodriguez",
      strain: "Organic Dream",
      description:
        "Recognized for outstanding commitment to sustainable and environmentally conscious growing practices.",
      certificateImage: "/placeholder.svg?height=600&width=800",
      eventImages: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=300&width=400"],
      significance:
        "This award highlights our dedication to environmental stewardship and sustainable cannabis cultivation.",
      judgeComments:
        "Exemplary use of renewable energy, water conservation, and organic practices. A model for the industry.",
      competitionStats: {
        totalEntries: 89,
        categories: 6,
        judges: 8,
      },
    },
    {
      id: 3,
      title: "Innovation in Genetics",
      category: "Breeding Excellence",
      year: "2022",
      event: "Cannabis Science Conference",
      winner: "David Thompson",
      strain: "Hybrid Balance",
      description: "Awarded for breakthrough achievements in cannabis genetics and strain development.",
      certificateImage: "/placeholder.svg?height=600&width=800",
      eventImages: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      significance: "Recognition of our cutting-edge research in cannabinoid profiles and terpene expression.",
      judgeComments:
        "Revolutionary approach to balanced cannabinoid ratios with exceptional stability across generations.",
      competitionStats: {
        totalEntries: 156,
        categories: 8,
        judges: 12,
      },
    },
    {
      id: 4,
      title: "People's Choice Award",
      category: "Community Favorite",
      year: "2023",
      event: "Cannabis Cup Los Angeles",
      winner: "GreenCraft Collective",
      strain: "Purple Haze Premium",
      description: "Voted by the community as their favorite strain at the Cannabis Cup 2023.",
      certificateImage: "/placeholder.svg?height=600&width=800",
      eventImages: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=300&width=400"],
      significance: "This award represents the voice of the cannabis community and their appreciation for our work.",
      judgeComments: "Overwhelming community support with 847 votes. Truly captures what cannabis enthusiasts love.",
      competitionStats: {
        totalVotes: 2341,
        categories: 5,
        participants: 1200,
      },
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

  const EventDetailDialog = ({ event, onClose }) => {
    if (!event) return null

    return (
      <Dialog open={!!event} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sage-950 border-sage-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-white flex items-center gap-3">
              {event.status === "past" ? (
                <Trophy className="h-6 w-6 text-gold-500" />
              ) : (
                <Calendar className="h-6 w-6 text-forest-500" />
              )}
              {event.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src={event.images[0] || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <Badge
                      className={event.status === "past" ? "bg-gold-600 text-white" : "premium-gradient text-white"}
                    >
                      {event.type}
                    </Badge>
                    <div className="flex items-center gap-2 mt-2 text-white">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="text-right text-white">
                    <div className="text-lg font-semibold">
                      {formatDate(event.date)}
                      {event.endDate &&
                        event.endDate !== event.date &&
                        ` - ${formatDate(event.endDate)}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Event Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">About This Event</h3>
                  <p className="text-sage-300 leading-relaxed">{event.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Highlights</h4>
                  <div className="space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Star className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sage-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.attendees.map((attendee, index) => (
                      <Badge key={index} variant="outline" className="border-forest-500 text-forest-400">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>

                {event.awards && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Awards Won</h4>
                    <div className="space-y-2">
                      {event.awards.map((award, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Trophy className="h-4 w-4 text-gold-500" />
                          <span className="text-gold-400 font-semibold">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.expectedOutcomes && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Expected Outcomes</h4>
                    <div className="space-y-2">
                      {event.expectedOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Clock className="h-4 w-4 text-forest-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sage-300">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Event Gallery</h4>
                <div className="grid grid-cols-2 gap-3">
                  {event.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${event.title} ${index + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const AwardDetailDialog = ({ award, onClose }) => {
    if (!award) return null

    return (
      <Dialog open={!!award} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sage-950 border-sage-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-white flex items-center gap-3">
              <Crown className="h-6 w-6 text-gold-500" />
              {award.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Certificate Display */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/20 p-6 rounded-lg border border-gold-500/30">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={award.certificateImage || "/placeholder.svg"}
                    alt={`${award.title} Certificate`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="absolute top-8 right-8">
                  <Badge className="gold-gradient text-white text-lg px-4 py-2">{award.year}</Badge>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Award Details */}
              <div className="space-y-4">
                <div className="dark-glass rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Award Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sage-400">Category:</span>
                      <span className="text-gold-400 font-semibold">{award.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sage-400">Event:</span>
                      <span className="text-white">{award.event}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sage-400">Winner:</span>
                      <span className="text-forest-400 font-semibold">{award.winner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sage-400">Winning Strain:</span>
                      <span className="text-white">{award.strain}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                  <p className="text-sage-300 leading-relaxed">{award.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Significance</h4>
                  <p className="text-sage-300 leading-relaxed">{award.significance}</p>
                </div>

                {/* Competition Stats */}
                <div className="dark-glass rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Competition Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-400">
                        {award.competitionStats.totalEntries || award.competitionStats.totalVotes}
                      </div>
                      <div className="text-sage-400 text-sm">
                        {award.competitionStats.totalVotes ? "Total Votes" : "Total Entries"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold-400">{award.competitionStats.categories}</div>
                      <div className="text-sage-400 text-sm">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-400">
                        {award.competitionStats.judges || award.competitionStats.participants}
                      </div>
                      <div className="text-sage-400 text-sm">
                        {award.competitionStats.participants ? "Participants" : "Judges"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold-400">1st</div>
                      <div className="text-sage-400 text-sm">Place</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Judge Comments & Gallery */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Judge Comments</h4>
                  <div className="dark-glass rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-gold-500 text-2xl">"</div>
                      <p className="text-sage-300 italic leading-relaxed">{award.judgeComments}</p>
                      <div className="text-gold-500 text-2xl">"</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Event Photos</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {award.eventImages.map((image, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${award.title} Event ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
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

          {/* Events Tab - Interactive Timeline */}
          <TabsContent value="events" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Our Journey Through Cannabis Events</h2>
              <p className="text-sage-300 text-lg">
                From competitions to conferences, see how we're shaping the cannabis industry
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-forest-500 via-gold-500 to-forest-500 rounded-full hidden md:block shadow-lg shadow-forest-500/30"></div>

              {/* Mobile Timeline Line */}
              <div className="absolute left-8 w-1 h-full bg-gradient-to-b from-forest-500 via-gold-500 to-forest-500 rounded-full md:hidden"></div>

              <div className="space-y-12">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-sage-950 hidden md:flex items-center justify-center z-10 shadow-lg shadow-gold-500/50">
                      <div
                        className={`w-3 h-3 rounded-full ${event.status === "past" ? "bg-gold-500" : "bg-forest-500"}`}
                      ></div>
                    </div>

                    {/* Mobile Timeline Dot */}
                    <div className="absolute left-8 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-sage-950 flex items-center justify-center z-10 md:hidden">
                      <div
                        className={`w-3 h-3 rounded-full ${event.status === "past" ? "bg-gold-500" : "bg-forest-500"}`}
                      ></div>
                    </div>

                    {/* Event Card */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                      <Card
                        className="bg-sage-950 border-sage-800 hover-lift cursor-pointer overflow-hidden group"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="relative h-48">
                          <Image
                            src={event.images[0] || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <Badge
                              className={
                                event.status === "past" ? "bg-gold-600 text-white" : "premium-gradient text-white"
                              }
                            >
                              {event.status === "past" ? "Completed" : "Upcoming"}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-display font-bold text-white mb-1">{event.title}</h3>
                            <div className="flex items-center gap-2 text-sage-200">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
                              <MapPin className="h-4 w-4 ml-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <p className="text-sage-300 mb-4">{event.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="border-forest-500 text-forest-400">
                              {event.type}
                            </Badge>
                            <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Date Badge for Desktop */}
                    <div className={`hidden md:block w-2/12 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <div className="inline-block">
                        <div className="text-2xl font-bold text-white">{new Date(event.date).getDate()}</div>
                        <div className="text-sage-400 text-sm">{formatDate(event.date)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Awards Tab - Trophy Showcase */}
          <TabsContent value="awards" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Hall of Excellence</h2>
              <p className="text-sage-300 text-lg">
                Celebrating our achievements and recognition in the cannabis industry
              </p>
            </div>

            {/* Awards Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {awards.map((award, index) => (
                <Card
                  key={award.id}
                  className="bg-sage-950 border-sage-800 hover-lift cursor-pointer overflow-hidden group relative"
                  onClick={() => setSelectedAward(award)}
                >
                  {/* Award Rank Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center animate-pulse">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="relative h-64">
                    <Image
                      src={award.certificateImage || "/placeholder.svg"}
                      alt={`${award.title} Certificate`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Award Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge className="gold-gradient text-white mb-3">{award.year}</Badge>
                      <h3 className="text-xl font-display font-bold text-white mb-2">{award.title}</h3>
                      <p className="text-gold-400 font-semibold mb-1">{award.category}</p>
                      <p className="text-sage-200 text-sm">{award.event}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Medal className="h-5 w-5 text-gold-500" />
                        <span className="text-white font-semibold">{award.winner}</span>
                      </div>
                      <Badge variant="outline" className="border-forest-500 text-forest-400">
                        {award.strain}
                      </Badge>
                    </div>

                    <p className="text-sage-300 text-sm mb-4 line-clamp-2">{award.description}</p>

                    {/* Competition Stats Preview */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-forest-400">
                          {award.competitionStats.totalEntries || award.competitionStats.totalVotes}
                        </div>
                        <div className="text-xs text-sage-400">
                          {award.competitionStats.totalVotes ? "Votes" : "Entries"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gold-400">{award.competitionStats.categories}</div>
                        <div className="text-xs text-sage-400">Categories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-forest-400">1st</div>
                        <div className="text-xs text-sage-400">Place</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-sage-600 text-sage-300 hover:bg-sage-800">
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Cannabis Knowledge Hub</h2>
              <p className="text-sage-300 text-lg">
                Explore our comprehensive collection of cannabis articles and guides
              </p>
            </div>

            {/* Featured Article Hero */}
            <Card className="bg-gradient-to-r from-sage-950 to-forest-950 border-sage-800 overflow-hidden hover-lift cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Featured Article"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 premium-gradient text-white">Featured Article</Badge>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="outline" className="border-forest-500 text-forest-400 mb-2">
                      Growing Guide
                    </Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    The Complete Guide to Indoor Cannabis Cultivation
                  </h3>
                  <p className="text-sage-300 mb-6 leading-relaxed">
                    Master the art of indoor growing with our comprehensive guide covering everything from setup to
                    harvest. Learn the secrets that our award-winning growers use to produce premium cannabis.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-sage-400" />
                      <span className="text-sage-300 text-sm">Marcus Chen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-sage-400" />
                      <span className="text-sage-300 text-sm">15 min read</span>
                    </div>
                    <Badge variant="outline" className="border-gold-500 text-gold-400">
                      Expert Level
                    </Badge>
                  </div>
                  <Button className="premium-gradient text-white w-fit">Read Full Article</Button>
                </div>
              </div>
            </Card>

            {/* Article Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Growing & Cultivation */}
              <Card className="bg-sage-950 border-sage-800 hover-lift group cursor-pointer">
                <CardHeader className="text-center relative overflow-hidden">
                  <div className="w-20 h-20 premium-gradient rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sprout className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white font-display">Growing & Cultivation</CardTitle>
                  <CardDescription className="text-sage-300">Master the art of cannabis cultivation</CardDescription>
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-forest-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-400">24</div>
                      <div className="text-sage-400 text-sm">Articles</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sage-300 text-sm">• Soil vs Hydroponic Systems</div>
                    <div className="text-sage-300 text-sm">• Lighting for Maximum Yield</div>
                    <div className="text-sage-300 text-sm">• Nutrient Schedules & Feeding</div>
                    <div className="text-sage-300 text-sm">• Harvest & Curing Techniques</div>
                  </div>
                  <Button className="w-full premium-gradient">Explore Articles</Button>
                </CardContent>
              </Card>

              {/* Terpenes & Science */}
              <Card className="bg-sage-950 border-sage-800 hover-lift group cursor-pointer">
                <CardHeader className="text-center relative overflow-hidden">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Beaker className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white font-display">Terpenes & Science</CardTitle>
                  <CardDescription className="text-sage-300">Understanding cannabis chemistry</CardDescription>
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">18</div>
                      <div className="text-sage-400 text-sm">Articles</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sage-300 text-sm">• Terpene Profiles Explained</div>
                    <div className="text-sage-300 text-sm">• Myrcene vs Limonene Effects</div>
                    <div className="text-sage-300 text-sm">• Preserving Terpenes in Curing</div>
                    <div className="text-sage-300 text-sm">• The Entourage Effect</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white">
                    Explore Articles
                  </Button>
                </CardContent>
              </Card>

              {/* Health & Benefits */}
              <Card className="bg-sage-950 border-sage-800 hover-lift group cursor-pointer">
                <CardHeader className="text-center relative overflow-hidden">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white font-display">Health & Benefits</CardTitle>
                  <CardDescription className="text-sage-300">Medical applications and wellness</CardDescription>
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-emerald-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">16</div>
                      <div className="text-sage-400 text-sm">Articles</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sage-300 text-sm">• CBD for Pain Management</div>
                    <div className="text-sage-300 text-sm">• Cannabis and Sleep Quality</div>
                    <div className="text-sage-300 text-sm">• Microdosing Guidelines</div>
                    <div className="text-sage-300 text-sm">• Anxiety Relief Strains</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white">
                    Explore Articles
                  </Button>
                </CardContent>
              </Card>

              {/* Tools & Equipment */}
              <Card className="bg-sage-950 border-sage-800 hover-lift group cursor-pointer">
                <CardHeader className="text-center relative overflow-hidden">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wrench className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white font-display">Tools & Equipment</CardTitle>
                  <CardDescription className="text-sage-300">Gear reviews and recommendations</CardDescription>
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">21</div>
                      <div className="text-sage-400 text-sm">Articles</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sage-300 text-sm">• Best Vaporizers 2024</div>
                    <div className="text-sage-300 text-sm">• Glass vs Metal Pipes</div>
                    <div className="text-sage-300 text-sm">• Growing Equipment Reviews</div>
                    <div className="text-sage-300 text-sm">• Storage Solutions Guide</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white">
                    Explore Articles
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Latest Articles Grid */}
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">Latest Articles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Article 1 */}
                <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Article"
                      fill
                      className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <Badge className="absolute top-3 left-3 premium-gradient text-white text-xs">Growing</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-semibold text-sm">Understanding Cannabis Genetics</h4>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sage-300 text-sm mb-3 line-clamp-2">
                      Dive deep into the world of cannabis genetics and learn how different strains develop their unique
                      characteristics.
                    </p>
                    <div className="flex items-center justify-between text-xs text-sage-400">
                      <span>David Thompson</span>
                      <span>8 min read</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Article 2 */}
                <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Article"
                      fill
                      className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <Badge className="absolute top-3 left-3 bg-purple-600 text-white text-xs">Terpenes</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-semibold text-sm">The Power of Pinene Terpenes</h4>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sage-300 text-sm mb-3 line-clamp-2">
                      Explore how pinene terpenes contribute to the unique aroma and effects of various cannabis
                      strains.
                    </p>
                    <div className="flex items-center justify-between text-xs text-sage-400">
                      <span>Sarah Rodriguez</span>
                      <span>6 min read</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Article 3 */}
                <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Article"
                      fill
                      className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <Badge className="absolute top-3 left-3 bg-emerald-600 text-white text-xs">Health</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-semibold text-sm">Cannabis for Better Sleep</h4>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sage-300 text-sm mb-3 line-clamp-2">
                      Discover which strains and consumption methods work best for improving sleep quality and duration.
                    </p>
                    <div className="flex items-center justify-between text-xs text-sage-400">
                      <span>Marcus Chen</span>
                      <span>10 min read</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Article 4 */}
                <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Article"
                      fill
                      className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <Badge className="absolute top-3 left-3 bg-amber-600 text-white text-xs">Tools</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-semibold text-sm">Vaporizer Buying Guide 2024</h4>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sage-300 text-sm mb-3 line-clamp-2">
                      Our comprehensive review of the best vaporizers available this year, from budget to premium
                      options.
                    </p>
                    <div className="flex items-center justify-between text-xs text-sage-400">
                      <span>Equipment Team</span>
                      <span>12 min read</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Article 5 */}
                <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Article"
                      fill
                      className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <Badge className="absolute top-3 left-3 premium-gradient text-white text-xs">Growing</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-semibold text-sm">Organic vs Synthetic Nutrients</h4>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sage-300 text-sm mb-3 line-clamp-2">
                      Compare the benefits and drawbacks of organic versus synthetic nutrients for cannabis cultivation.
                    </p>
                    <div className="flex items-center justify-between text-xs text-sage-400">
                      <span>Sarah Rodriguez</span>
                      <span>9 min read</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Article 6 */}
                <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Article"
                      fill
                      className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <Badge className="absolute top-3 left-3 bg-emerald-600 text-white text-xs">Health</Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white font-semibold text-sm">Microdosing: A Beginner's Guide</h4>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sage-300 text-sm mb-3 line-clamp-2">
                      Learn the art of microdosing cannabis for therapeutic benefits without overwhelming psychoactive
                      effects.
                    </p>
                    <div className="flex items-center justify-between text-xs text-sage-400">
                      <span>Dr. Lisa Chen</span>
                      <span>7 min read</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Popular Topics */}
            <Card className="bg-gradient-to-r from-sage-950 to-black border-sage-800">
              <CardHeader className="text-center">
                <CardTitle className="text-white font-display text-2xl">Popular Topics</CardTitle>
                <CardDescription className="text-sage-300">Most read articles this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 premium-gradient rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Flame className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Consumption Methods</h4>
                    <p className="text-sage-300 text-sm mb-4">Smoking, vaping, edibles, and more</p>
                    <Badge variant="outline" className="border-sage-600 text-sage-300">
                      15 articles
                    </Badge>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Microscope className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Strain Reviews</h4>
                    <p className="text-sage-300 text-sm mb-4">In-depth strain analysis and effects</p>
                    <Badge variant="outline" className="border-sage-600 text-sage-300">
                      32 articles
                    </Badge>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Growing Tips</h4>
                    <p className="text-sage-300 text-sm mb-4">Expert cultivation advice and tricks</p>
                    <Badge variant="outline" className="border-sage-600 text-sage-300">
                      28 articles
                    </Badge>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Product Reviews</h4>
                    <p className="text-sage-300 text-sm mb-4">Honest reviews of cannabis products</p>
                    <Badge variant="outline" className="border-sage-600 text-sage-300">
                      19 articles
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Growers Tab */}
          <TabsContent value="growers" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Master Growers Collective</h2>
              <p className="text-sage-300 text-lg">
                Meet the legendary cultivators behind our award-winning strains
              </p>
            </div>

            {/* Featured Master Grower Hero */}
            <Card className="bg-gradient-to-r from-sage-950 via-forest-950 to-sage-950 border-sage-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-forest-500/5" />
              <div className="grid md:grid-cols-2 gap-0 relative z-10">
                <div className="relative h-80 md:h-auto">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Marcus Chen"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  <Badge className="absolute top-6 left-6 gold-gradient text-white text-sm px-4 py-2">
                    Master Grower of the Year
                  </Badge>
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">Currently Growing</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white">Marcus Chen</h3>
                      <p className="text-gold-400 font-semibold">Hydroponic Systems Specialist</p>
                    </div>
                  </div>
                  <p className="text-sage-300 mb-6 leading-relaxed">
                    "12 years of pushing the boundaries of indoor cultivation. My passion lies in creating the perfect
                    environment where cannabis can express its full genetic potential through advanced hydroponic systems."
                  </p>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold-400">15</div>
                      <div className="text-sage-400 text-xs">Awards</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-400">2.4K</div>
                      <div className="text-sage-400 text-xs">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">156</div>
                      <div className="text-sage-400 text-xs">Harvests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold-400">23.5%</div>
                      <div className="text-sage-400 text-xs">Avg THC</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/members/growers/1">
                      <Button className="premium-gradient text-white">View Portfolio</Button>
                    </Link>
                    <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                      Follow Grower
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Growers Showcase Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sarah Rodriguez */}
              <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group overflow-hidden relative">
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-emerald-600 text-white">Organic Expert</Badge>
                </div>
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Sarah Rodriguez"
                    fill
                    className="object-cover transition-transform group-hoverr:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Floating Stats */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-white text-sm font-medium">Sustainable Growing</span>
                      </div>
                    </div>
                  </div>
                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-display font-bold text-white mb-1">Sarah Rodriguez</h3>
                        <p className="text-emerald-400 font-semibold mb-2">Organic Cultivation</p>
                        <div className="flex items-center gap-4 text-sm text-sage-200">
                          <span>8 years exp</span>
                          <span>•</span>
                          <span>12 awards</span>
                          <span>•</span>
                          <span>1.8K followers</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sage-300 text-sm mb-4 leading-relaxed">
                    "Dedicated to sustainable, organic growing practices that respect the environment while producing
                    exceptional quality cannabis. Every plant tells a story of harmony with nature."
                  </p>
                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">Organic Nutrients</Badge>
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">Water Conservation</Badge>
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">Soil Health</Badge>
                  </div>
                  {/* Recent Achievement */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="h-4 w-4 text-emerald-500" />
                      <span className="text-emerald-400 text-sm font-medium">Recent Achievement</span>
                    </div>
                    <p className="text-sage-300 text-xs">Sustainable Grower Award 2023 - Environmental Excellence</p>
                  </div>
                  <Link href="/members/growers/2">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white">View Portfolio</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* David Thompson */}
              <Card className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group overflow-hidden relative">
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-purple-600 text-white">Genetics Master</Badge>
                </div>
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="David Thompson"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Floating Stats */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-white text-sm font-medium">Strain Development</span>
                      </div>
                    </div>
                  </div>
                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-display font-bold text-white mb-1">David Thompson</h3>
                        <p className="text-purple-400 font-semibold mb-2">Genetics & Breeding</p>
                        <div className="flex items-center gap-4 text-sm text-sage-200">
                          <span>15 years exp</span>
                          <span>•</span>
                          <span>20 awards</span>
                          <span>•</span>
                          <span>3.2K followers</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <Beaker className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sage-300 text-sm mb-4 leading-relaxed">
                    "Master breeder developing new strains with unique cannabinoid profiles. My work focuses on creating
                    stable genetics that express consistent therapeutic and recreational properties."
                  </p>
                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">Strain Development</Badge>
                    <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">Cannabinoid Research</Badge>
                    <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">Genetic Stability</Badge>
                  </div>
                  {/* Recent Achievement */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="h-4 w-4 text-purple-500" />
                      <span className="text-purple-400 text-sm font-medium">Recent Achievement</span>
                    </div>
                    <p className="text-sage-300 text-xs">Innovation in Genetics 2022 - Breeding Excellence</p>
                  </div>
                  <Link href="/members/growers/3">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white">View Portfolio</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Growing Team Stats */}
            <Card className="bg-gradient-to-r from-sage-950 to-black border-sage-800">
              <CardHeader className="text-center">
                <CardTitle className="text-white font-display text-2xl">Our Growing Collective</CardTitle>
                <CardDescription className="text-sage-300">Combined expertise and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center group">
                    <div className="w-20 h-20 premium-gradient rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gold-400 mb-2">47</div>
                    <div className="text-sage-300 font-medium">Total Awards</div>
                    <div className="text-sage-400 text-sm">Industry recognition</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-forest-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sprout className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-forest-400 mb-2">35</div>
                    <div className="text-sage-300 font-medium">Years Combined</div>
                    <div className="text-sage-400 text-sm">Growing experience</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Beaker className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">12</div>
                    <div className="text-sage-300 font-medium">Signature Strains</div>
                    <div className="text-sage-400 text-sm">Unique genetics</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-400 mb-2">7.4K</div>
                    <div className="text-sage-300 font-medium">Community</div>
                    <div className="text-sage-400 text-sm">Total followers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-forest-950 via-sage-950 to-forest-950 border-forest-500/30 text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-4">Join Our Growing Community</h3>
                <p className="text-sage-300 mb-6 max-w-2xl mx-auto">
                  Connect with master growers, learn from their expertise, and become part of a community dedicated to
                  cannabis cultivation excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="premium-gradient text-white px-8">
                    <Users className="h-4 w-4 mr-2" />
                    Join Community
                  </Button>
                  <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800 px-8">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Event Detail Dialog */}
      <EventDetailDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      {/* Award Detail Dialog */}
      <AwardDetailDialog award={selectedAward} onClose={() => setSelectedAward(null)} />
    </div>
  )
}
