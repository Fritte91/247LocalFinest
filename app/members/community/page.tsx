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
import { events, type Event } from "./data/events"
import { awards, type Award } from "./data/awards"
import { growerProfiles, type GrowerProfile } from "./data/growers"
import { articleCategories, latestArticles, popularTopics, featuredArticle } from "./data/education"

// Helper to format dates consistently for SSR/CSR
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Helper to get icon component by name
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Sprout,
    Beaker,
    Heart,
    Wrench,
    Flame,
    Microscope,
    BookOpen,
    Star,
  };
  return icons[iconName] || Sprout;
};

export default function CommunityPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedAward, setSelectedAward] = useState<Award | null>(null)

  const EventDetailDialog = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
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

  const AwardDetailDialog = ({ award, onClose }: { award: Award | null; onClose: () => void }) => {
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
                    src={featuredArticle.image}
                    alt="Featured Article"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 premium-gradient text-white">Featured Article</Badge>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="outline" className="border-forest-500 text-forest-400 mb-2">
                      {featuredArticle.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-sage-300 mb-6 leading-relaxed">
                    {featuredArticle.description}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-sage-400" />
                      <span className="text-sage-300 text-sm">{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-sage-400" />
                      <span className="text-sage-300 text-sm">{featuredArticle.readTime}</span>
                    </div>
                    <Badge variant="outline" className="border-gold-500 text-gold-400">
                      {featuredArticle.level}
                    </Badge>
                  </div>
                  <Link href="/members/community/articles">
                    <Button className="premium-gradient text-white w-fit">Read Full Article</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Article Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articleCategories.map((category, index) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <Card key={index} className="bg-sage-950 border-sage-800 hover-lift group cursor-pointer">
                    <CardHeader className="text-center relative overflow-hidden">
                      <div className={`w-20 h-20 ${category.gradient} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-white font-display">{category.title}</CardTitle>
                      <CardDescription className="text-sage-300">{category.description}</CardDescription>
                      <div className="absolute -top-10 -right-10 w-20 h-20 bg-forest-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-forest-400">{category.articleCount}</div>
                          <div className="text-sage-400 text-sm">Articles</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {category.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="text-sage-300 text-sm">• {topic}</div>
                        ))}
                      </div>
                      <Link href="/members/community/articles">
                        <Button className={`w-full ${category.gradient} text-white`}>Explore Articles</Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Latest Articles Grid */}
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">Latest Articles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestArticles.map((article, index) => (
                  <Card key={index} className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                    <div className="relative h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                      <Badge className={`absolute top-3 left-3 ${
                        article.category === 'Growing' ? 'premium-gradient text-white' :
                        article.category === 'Terpenes' ? 'bg-purple-600 text-white' :
                        article.category === 'Health' ? 'bg-emerald-600 text-white' :
                        'bg-amber-600 text-white'
                      } text-xs`}>
                        {article.category}
                      </Badge>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-semibold text-sm">{article.title}</h4>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sage-300 text-sm mb-3 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-sage-400">
                        <span>{article.author}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                  {popularTopics.map((topic, index) => {
                    const IconComponent = getIconComponent(topic.icon);
                    return (
                      <div key={index} className="text-center group cursor-pointer">
                        <div className={`w-16 h-16 ${topic.gradient} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">{topic.title}</h4>
                        <p className="text-sage-300 text-sm mb-4">{topic.description}</p>
                        <Badge variant="outline" className="border-sage-600 text-sage-300">
                          {topic.articleCount} articles
                        </Badge>
                      </div>
                    );
                  })}
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
                    alt={growerProfiles[0].name}
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
                      <h3 className="text-2xl font-display font-bold text-white">{growerProfiles[0].name}</h3>
                      <p className="text-gold-400 font-semibold">{growerProfiles[0].specialty}</p>
                    </div>
                  </div>
                  <p className="text-sage-300 mb-6 leading-relaxed">
                    "{growerProfiles[0].bio}"
                  </p>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold-400">{growerProfiles[0].achievements}</div>
                      <div className="text-sage-400 text-xs">Awards</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-forest-400">{(growerProfiles[0].followers / 1000).toFixed(1)}K</div>
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
              {growerProfiles.slice(1).map((grower, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group overflow-hidden relative">
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className={`${
                      grower.specialty.includes('Organic') ? 'bg-emerald-600' : 'bg-purple-600'
                    } text-white`}>
                      {grower.specialty.includes('Organic') ? 'Organic Expert' : 'Genetics Master'}
                    </Badge>
                  </div>
                  <div className="relative h-64">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={grower.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Floating Stats */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${
                            grower.specialty.includes('Organic') ? 'bg-emerald-500' : 'bg-purple-500'
                          } rounded-full`}></div>
                          <span className="text-white text-sm font-medium">
                            {grower.specialty.includes('Organic') ? 'Sustainable Growing' : 'Strain Development'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-display font-bold text-white mb-1">{grower.name}</h3>
                          <p className={`${
                            grower.specialty.includes('Organic') ? 'text-emerald-400' : 'text-purple-400'
                          } font-semibold mb-2`}>{grower.specialty}</p>
                          <div className="flex items-center gap-4 text-sm text-sage-200">
                            <span>{grower.experience} exp</span>
                            <span>•</span>
                            <span>{grower.achievements} awards</span>
                            <span>•</span>
                            <span>{(grower.followers / 1000).toFixed(1)}K followers</span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 ${
                          grower.specialty.includes('Organic') ? 'bg-emerald-600' : 'bg-purple-600'
                        } rounded-full flex items-center justify-center`}>
                          {grower.specialty.includes('Organic') ? (
                            <Leaf className="h-6 w-6 text-white" />
                          ) : (
                            <Beaker className="h-6 w-6 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sage-300 text-sm mb-4 leading-relaxed">
                      "{grower.bio}"
                    </p>
                    {/* Specialty Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {grower.specialty.includes('Organic') ? (
                        <>
                          <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">Organic Nutrients</Badge>
                          <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">Water Conservation</Badge>
                          <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">Soil Health</Badge>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">Strain Development</Badge>
                          <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">Cannabinoid Research</Badge>
                          <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">Genetic Stability</Badge>
                        </>
                      )}
                    </div>
                    {/* Recent Achievement */}
                    <div className={`${
                      grower.specialty.includes('Organic') ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-purple-500/10 border-purple-500/30'
                    } border rounded-lg p-3 mb-4`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className={`h-4 w-4 ${
                          grower.specialty.includes('Organic') ? 'text-emerald-500' : 'text-purple-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          grower.specialty.includes('Organic') ? 'text-emerald-400' : 'text-purple-400'
                        }`}>Recent Achievement</span>
                      </div>
                      <p className="text-sage-300 text-xs">
                        {grower.specialty.includes('Organic') 
                          ? 'Sustainable Grower Award 2023 - Environmental Excellence'
                          : 'Innovation in Genetics 2022 - Breeding Excellence'
                        }
                      </p>
                    </div>
                    <Link href={`/members/growers/${index + 2}`}>
                      <Button className={`w-full ${
                        grower.specialty.includes('Organic') 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-700' 
                          : 'bg-gradient-to-r from-purple-500 to-purple-700'
                      } text-white`}>View Portfolio</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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
                    <div className="text-3xl font-bold text-gold-400 mb-2">
                      {growerProfiles.reduce((sum, grower) => sum + grower.achievements, 0)}
                    </div>
                    <div className="text-sage-300 font-medium">Total Awards</div>
                    <div className="text-sage-400 text-sm">Industry recognition</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-forest-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sprout className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-forest-400 mb-2">
                      {growerProfiles.reduce((sum, grower) => sum + parseInt(grower.experience), 0)}
                    </div>
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
                    <div className="text-3xl font-bold text-emerald-400 mb-2">
                      {(growerProfiles.reduce((sum, grower) => sum + grower.followers, 0) / 1000).toFixed(1)}K
                    </div>
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
