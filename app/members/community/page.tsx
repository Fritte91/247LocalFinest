"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MobileNav } from "@/app/components/mobile-nav"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const EventDetailDialog = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
    if (!event) return null

    return (
      <Dialog open={!!event} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sage-950 border-sage-800 text-white p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-display text-white flex items-center gap-2 md:gap-3">
              {event.status === "past" ? (
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-gold-500" />
              ) : (
                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-forest-500" />
              )}
              {event.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6">
            {/* Hero Image */}
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
              <Image src={event.images[0] || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                  <div>
                    <Badge
                      className={event.status === "past" ? "bg-gold-600 text-white text-xs" : "premium-gradient text-white text-xs"}
                    >
                      {event.type}
                    </Badge>
                    <div className="flex items-center gap-2 mt-2 text-white text-sm">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  <div className="text-right text-white">
                    <div className="text-sm md:text-lg font-semibold">
                      {formatDate(event.date)}
                      {event.endDate &&
                        event.endDate !== event.date &&
                        ` - ${formatDate(event.endDate)}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Event Details */}
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">About This Event</h3>
                  <p className="text-sage-300 leading-relaxed text-sm md:text-base">{event.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Key Highlights</h4>
                  <div className="space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sage-300 text-sm md:text-base">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.attendees.map((attendee, index) => (
                      <Badge key={index} variant="outline" className="border-forest-500 text-forest-400 text-xs">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>

                {event.awards && (
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Awards Won</h4>
                    <div className="space-y-2">
                      {event.awards.map((award, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-3">
                          <Trophy className="h-3 w-3 md:h-4 md:w-4 text-gold-500" />
                          <span className="text-gold-400 font-semibold text-sm md:text-base">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.expectedOutcomes && (
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Expected Outcomes</h4>
                    <div className="space-y-2">
                      {event.expectedOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2 md:gap-3">
                          <Clock className="h-3 w-3 md:h-4 md:w-4 text-forest-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sage-300 text-sm md:text-base">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image Gallery */}
              <div className="space-y-3 md:space-y-4">
                <h4 className="text-base md:text-lg font-semibold text-white">Event Gallery</h4>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {event.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-24 md:h-32 rounded-lg overflow-hidden">
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sage-950 border-sage-800 text-white p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-display text-white flex items-center gap-2 md:gap-3">
              <Crown className="h-5 w-5 md:h-6 md:w-6 text-gold-500" />
              {award.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6">
            {/* Certificate Display */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/20 p-4 md:p-6 rounded-lg border border-gold-500/30">
                <div className="relative h-60 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src={award.certificateImage || "/placeholder.svg"}
                    alt={`${award.title} Certificate`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="absolute top-4 md:top-8 right-4 md:right-8">
                  <Badge className="gold-gradient text-white text-sm md:text-lg px-3 md:px-4 py-1 md:py-2">{award.year}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Award Details */}
              <div className="space-y-3 md:space-y-4">
                <div className="dark-glass rounded-lg p-3 md:p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Award Details</h3>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sage-400 text-sm md:text-base">Category:</span>
                      <span className="text-gold-400 font-semibold text-sm md:text-base">{award.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sage-400 text-sm md:text-base">Event:</span>
                      <span className="text-white text-sm md:text-base">{award.event}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sage-400 text-sm md:text-base">Winner:</span>
                      <span className="text-forest-400 font-semibold text-sm md:text-base">{award.winner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sage-400 text-sm md:text-base">Winning Strain:</span>
                      <span className="text-white text-sm md:text-base">{award.strain}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Description</h4>
                  <p className="text-sage-300 leading-relaxed text-sm md:text-base">{award.description}</p>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Significance</h4>
                  <p className="text-sage-300 leading-relaxed text-sm md:text-base">{award.significance}</p>
                </div>

                {/* Competition Stats */}
                <div className="dark-glass rounded-lg p-3 md:p-4">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Competition Statistics</h4>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-forest-400">
                        {award.competitionStats.totalEntries || award.competitionStats.totalVotes}
                      </div>
                      <div className="text-sage-400 text-xs md:text-sm">
                        {award.competitionStats.totalVotes ? "Total Votes" : "Total Entries"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-gold-400">{award.competitionStats.categories}</div>
                      <div className="text-sage-400 text-xs md:text-sm">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-forest-400">
                        {award.competitionStats.judges || award.competitionStats.participants}
                      </div>
                      <div className="text-sage-400 text-xs md:text-sm">
                        {award.competitionStats.participants ? "Participants" : "Judges"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-gold-400">1st</div>
                      <div className="text-sage-400 text-xs md:text-sm">Place</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Judge Comments & Gallery */}
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Judge Comments</h4>
                  <div className="dark-glass rounded-lg p-3 md:p-4">
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="text-gold-500 text-xl md:text-2xl">"</div>
                      <p className="text-sage-300 italic leading-relaxed text-sm md:text-base">{award.judgeComments}</p>
                      <div className="text-gold-500 text-xl md:text-2xl">"</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Event Photos</h4>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {award.eventImages.map((image, index) => (
                      <div key={index} className="relative h-24 md:h-32 rounded-lg overflow-hidden">
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
              <span className="text-xl md:text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            
            {/* Desktop Navigation */}
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

            <MobileNav 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              cartItemCount={0}
              currentPath="/members/community"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">Community Hub</h1>
          <p className="text-base md:text-xl text-sage-300 px-4">Connect, learn, and grow with fellow cannabis enthusiasts</p>
        </div>

        {/* Community Tabs */}
        <Tabs defaultValue="events" className="space-y-6 md:space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-sage-950 border border-sage-700 p-1">
            <TabsTrigger value="events" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm py-2">
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="awards" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm py-2">
              <Trophy className="h-4 w-4" />
              <span>Awards</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm py-2">
              <BookOpen className="h-4 w-4" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger value="growers" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm py-2">
              <Users className="h-4 w-4" />
              <span>Growers</span>
            </TabsTrigger>
          </TabsList>

          {/* Events Tab - Interactive Timeline */}
          <TabsContent value="events" className="space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">Our Journey Through Cannabis Events</h2>
              <p className="text-sm md:text-lg text-sage-300 px-4">
                From competitions to conferences, see how we're shaping the cannabis industry
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-forest-500 via-gold-500 to-forest-500 rounded-full hidden md:block shadow-lg shadow-forest-500/30"></div>

              {/* Mobile Timeline Line */}
              <div className="absolute left-4 md:left-8 w-1 h-full bg-gradient-to-b from-forest-500 via-gold-500 to-forest-500 rounded-full md:hidden"></div>

              <div className="space-y-8 md:space-y-12">
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
                    <div className="absolute left-4 md:left-8 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-sage-950 flex items-center justify-center z-10 md:hidden">
                      <div
                        className={`w-3 h-3 rounded-full ${event.status === "past" ? "bg-gold-500" : "bg-forest-500"}`}
                      ></div>
                    </div>

                    {/* Event Card */}
                    <div className={`w-full md:w-5/12 ml-8 md:ml-0 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                      <Card
                        className="bg-sage-950 border-sage-800 hover-lift cursor-pointer overflow-hidden group"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="relative h-40 md:h-48">
                          <Image
                            src={event.images[0] || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 md:top-4 left-3 md:left-4">
                            <Badge
                              className={
                                event.status === "past" ? "bg-gold-600 text-white text-xs" : "premium-gradient text-white text-xs"
                              }
                            >
                              {event.status === "past" ? "Completed" : "Upcoming"}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                            <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1">{event.title}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sage-200 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6">
                          <p className="text-sage-300 mb-4 text-sm md:text-base">{event.description}</p>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <Badge variant="outline" className="border-forest-500 text-forest-400 text-xs">
                              {event.type}
                            </Badge>
                            <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800 text-sm">
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
          <TabsContent value="awards" className="space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">Hall of Excellence</h2>
              <p className="text-sm md:text-lg text-sage-300 px-4">
                Celebrating our achievements and recognition in the cannabis industry
              </p>
            </div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {awards.map((award, index) => (
                <Card
                  key={award.id}
                  className="bg-sage-950 border-sage-800 hover-lift cursor-pointer overflow-hidden group relative"
                  onClick={() => setSelectedAward(award)}
                >
                  {/* Award Rank Badge */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 gold-gradient rounded-full flex items-center justify-center animate-pulse">
                      <Crown className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>

                  <div className="relative h-48 md:h-64">
                    <Image
                      src={award.certificateImage || "/placeholder.svg"}
                      alt={`${award.title} Certificate`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Award Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <Badge className="gold-gradient text-white mb-2 md:mb-3 text-xs">{award.year}</Badge>
                      <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1 md:mb-2">{award.title}</h3>
                      <p className="text-gold-400 font-semibold mb-1 text-sm md:text-base">{award.category}</p>
                      <p className="text-sage-200 text-xs md:text-sm">{award.event}</p>
                    </div>
                  </div>

                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 md:mb-4 gap-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Medal className="h-4 w-4 md:h-5 md:w-5 text-gold-500" />
                        <span className="text-white font-semibold text-sm md:text-base">{award.winner}</span>
                      </div>
                      <Badge variant="outline" className="border-forest-500 text-forest-400 text-xs w-fit">
                        {award.strain}
                      </Badge>
                    </div>

                    <p className="text-sage-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{award.description}</p>

                    {/* Competition Stats Preview */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="text-center">
                        <div className="text-sm md:text-lg font-bold text-forest-400">
                          {award.competitionStats.totalEntries || award.competitionStats.totalVotes}
                        </div>
                        <div className="text-xs text-sage-400">
                          {award.competitionStats.totalVotes ? "Votes" : "Entries"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm md:text-lg font-bold text-gold-400">{award.competitionStats.categories}</div>
                        <div className="text-xs text-sage-400">Categories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm md:text-lg font-bold text-forest-400">1st</div>
                        <div className="text-xs text-sage-400">Place</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-sage-600 text-sage-300 hover:bg-sage-800 text-sm">
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">Cannabis Knowledge Hub</h2>
              <p className="text-sm md:text-lg text-sage-300 px-4">
                Explore our comprehensive collection of cannabis articles and guides
              </p>
            </div>

            {/* Featured Article Hero */}
            <Card className="bg-gradient-to-r from-sage-950 to-forest-950 border-sage-800 overflow-hidden hover-lift cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-48 md:h-64 lg:h-auto">
                  <Image
                    src={featuredArticle.image}
                    alt="Featured Article"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <Badge className="absolute top-3 md:top-4 left-3 md:left-4 premium-gradient text-white text-xs">Featured Article</Badge>
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                    <Badge variant="outline" className="border-forest-500 text-forest-400 mb-2 text-xs">
                      {featuredArticle.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 md:p-8 flex flex-col justify-center">
                  <h3 className="text-lg md:text-2xl font-display font-bold text-white mb-3 md:mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-sage-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {featuredArticle.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 mb-4 md:mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-sage-400" />
                      <span className="text-sage-300 text-xs md:text-sm">{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-sage-400" />
                      <span className="text-sage-300 text-xs md:text-sm">{featuredArticle.readTime}</span>
                    </div>
                    <Badge variant="outline" className="border-gold-500 text-gold-400 text-xs w-fit">
                      {featuredArticle.level}
                    </Badge>
                  </div>
                  <Link href="/members/community/articles">
                    <Button className="premium-gradient text-white w-fit text-sm">Read Full Article</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Article Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {articleCategories.map((category, index) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <Card key={index} className="bg-sage-950 border-sage-800 hover-lift group cursor-pointer">
                    <CardHeader className="text-center relative overflow-hidden p-4 md:p-6">
                      <div className={`w-16 h-16 md:w-20 md:h-20 ${category.gradient} rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <CardTitle className="text-white font-display text-sm md:text-base">{category.title}</CardTitle>
                      <CardDescription className="text-sage-300 text-xs md:text-sm">{category.description}</CardDescription>
                      <div className="absolute -top-10 -right-10 w-20 h-20 bg-forest-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    </CardHeader>
                    <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
                      <div className="space-y-2 md:space-y-3">
                        <div className="text-center">
                          <div className="text-xl md:text-2xl font-bold text-forest-400">{category.articleCount}</div>
                          <div className="text-sage-400 text-xs md:text-sm">Articles</div>
                        </div>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        {category.topics.slice(0, 3).map((topic, topicIndex) => (
                          <div key={topicIndex} className="text-sage-300 text-xs md:text-sm">• {topic}</div>
                        ))}
                      </div>
                      <Link href="/members/community/articles">
                        <Button className={`w-full ${category.gradient} text-white text-sm`}>Explore Articles</Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Latest Articles Grid */}
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-4 md:mb-6">Latest Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {latestArticles.map((article, index) => (
                  <Card key={index} className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group">
                    <div className="relative h-40 md:h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                      <Badge className={`absolute top-2 md:top-3 left-2 md:left-3 ${
                        article.category === 'Growing' ? 'premium-gradient text-white' :
                        article.category === 'Terpenes' ? 'bg-purple-600 text-white' :
                        article.category === 'Health' ? 'bg-emerald-600 text-white' :
                        'bg-amber-600 text-white'
                      } text-xs`}>
                        {article.category}
                      </Badge>
                      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
                        <h4 className="text-white font-semibold text-xs md:text-sm">{article.title}</h4>
                      </div>
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <p className="text-sage-300 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-sage-400">
                        <span className="truncate">{article.author}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Popular Topics */}
            <Card className="bg-gradient-to-r from-sage-950 to-black border-sage-800">
              <CardHeader className="text-center p-4 md:p-6">
                <CardTitle className="text-white font-display text-xl md:text-2xl">Popular Topics</CardTitle>
                <CardDescription className="text-sage-300 text-sm">Most read articles this month</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {popularTopics.map((topic, index) => {
                    const IconComponent = getIconComponent(topic.icon);
                    return (
                      <div key={index} className="text-center group cursor-pointer">
                        <div className={`w-12 h-12 md:w-16 md:h-16 ${topic.gradient} rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">{topic.title}</h4>
                        <p className="text-sage-300 text-xs md:text-sm mb-3 md:mb-4">{topic.description}</p>
                        <Badge variant="outline" className="border-sage-600 text-sage-300 text-xs">
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
          <TabsContent value="growers" className="space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">Master Growers Collective</h2>
              <p className="text-sm md:text-lg text-sage-300 px-4">
                Meet the legendary cultivators behind our award-winning strains
              </p>
            </div>

            {/* Featured Master Grower Hero */}
            <Card className="bg-gradient-to-r from-sage-950 via-forest-950 to-sage-950 border-sage-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-forest-500/5" />
              <div className="grid md:grid-cols-2 gap-0 relative z-10">
                <div className="relative h-60 md:h-80 lg:h-auto">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt={growerProfiles[0].name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  <Badge className="absolute top-4 md:top-6 left-4 md:left-6 gold-gradient text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-2">
                    Master Grower of the Year
                  </Badge>
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs md:text-sm font-medium">Currently Growing</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 premium-gradient rounded-full flex items-center justify-center">
                      <Crown className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-display font-bold text-white">{growerProfiles[0].name}</h3>
                      <p className="text-gold-400 font-semibold text-sm md:text-base">{growerProfiles[0].specialty}</p>
                    </div>
                  </div>
                  <p className="text-sage-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    "{growerProfiles[0].bio}"
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-gold-400">{growerProfiles[0].achievements}</div>
                      <div className="text-sage-400 text-xs">Awards</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-forest-400">{(growerProfiles[0].followers / 1000).toFixed(1)}K</div>
                      <div className="text-sage-400 text-xs">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-white">156</div>
                      <div className="text-sage-400 text-xs">Harvests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-gold-400">23.5%</div>
                      <div className="text-sage-400 text-xs">Avg THC</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Link href="/members/growers/1">
                      <Button className="premium-gradient text-white text-sm w-full sm:w-auto">View Portfolio</Button>
                    </Link>
                    <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800 text-sm w-full sm:w-auto">
                      Follow Grower
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Growers Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {growerProfiles.slice(1).map((grower, index) => (
                <Card key={index} className="bg-sage-950 border-sage-800 hover-lift cursor-pointer group overflow-hidden relative">
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 z-20">
                    <Badge className={`${
                      grower.specialty.includes('Organic') ? 'bg-emerald-600' : 'bg-purple-600'
                    } text-white text-xs`}>
                      {grower.specialty.includes('Organic') ? 'Organic Expert' : 'Genetics Master'}
                    </Badge>
                  </div>
                  <div className="relative h-48 md:h-64">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={grower.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Floating Stats */}
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 space-y-2">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1">
                        <div className="flex items-center gap-1 md:gap-2">
                          <div className={`w-2 h-2 ${
                            grower.specialty.includes('Organic') ? 'bg-emerald-500' : 'bg-purple-500'
                          } rounded-full`}></div>
                          <span className="text-white text-xs md:text-sm font-medium">
                            {grower.specialty.includes('Organic') ? 'Sustainable Growing' : 'Strain Development'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1">{grower.name}</h3>
                          <p className={`${
                            grower.specialty.includes('Organic') ? 'text-emerald-400' : 'text-purple-400'
                          } font-semibold mb-1 md:mb-2 text-sm md:text-base`}>{grower.specialty}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 md:gap-4 text-xs md:text-sm text-sage-200">
                            <span>{grower.experience} exp</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{grower.achievements} awards</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{(grower.followers / 1000).toFixed(1)}K followers</span>
                          </div>
                        </div>
                        <div className={`w-10 h-10 md:w-12 md:h-12 ${
                          grower.specialty.includes('Organic') ? 'bg-emerald-600' : 'bg-purple-600'
                        } rounded-full flex items-center justify-center`}>
                          {grower.specialty.includes('Organic') ? (
                            <Leaf className="h-5 w-5 md:h-6 md:w-6 text-white" />
                          ) : (
                            <Beaker className="h-5 w-5 md:h-6 md:w-6 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <p className="text-sage-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                      "{grower.bio}"
                    </p>
                    {/* Specialty Tags */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
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
                    } border rounded-lg p-2 md:p-3 mb-3 md:mb-4`}>
                      <div className="flex items-center gap-1 md:gap-2 mb-1">
                        <Trophy className={`h-3 w-3 md:h-4 md:w-4 ${
                          grower.specialty.includes('Organic') ? 'text-emerald-500' : 'text-purple-500'
                        }`} />
                        <span className={`text-xs md:text-sm font-medium ${
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
                      <Button className={`w-full text-sm ${
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
              <CardHeader className="text-center p-4 md:p-6">
                <CardTitle className="text-white font-display text-xl md:text-2xl">Our Growing Collective</CardTitle>
                <CardDescription className="text-sage-300 text-sm">Combined expertise and achievements</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  <div className="text-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 premium-gradient rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gold-400 mb-1 md:mb-2">
                      {growerProfiles.reduce((sum, grower) => sum + grower.achievements, 0)}
                    </div>
                    <div className="text-sage-300 font-medium text-sm">Total Awards</div>
                    <div className="text-sage-400 text-xs">Industry recognition</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-forest-500 to-forest-700 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sprout className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-forest-400 mb-1 md:mb-2">
                      {growerProfiles.reduce((sum, grower) => sum + parseInt(grower.experience), 0)}
                    </div>
                    <div className="text-sage-300 font-medium text-sm">Years Combined</div>
                    <div className="text-sage-400 text-xs">Growing experience</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Beaker className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1 md:mb-2">12</div>
                    <div className="text-sage-300 font-medium text-sm">Signature Strains</div>
                    <div className="text-sage-400 text-xs">Unique genetics</div>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1 md:mb-2">
                      {(growerProfiles.reduce((sum, grower) => sum + grower.followers, 0) / 1000).toFixed(1)}K
                    </div>
                    <div className="text-sage-300 font-medium text-sm">Community</div>
                    <div className="text-sage-400 text-xs">Total followers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-forest-950 via-sage-950 to-forest-950 border-forest-500/30 text-center">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 md:mb-4">Join Our Growing Community</h3>
                <p className="text-sage-300 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                  Connect with master growers, learn from their expertise, and become part of a community dedicated to
                  cannabis cultivation excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Button className="premium-gradient text-white px-6 md:px-8 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Join Community
                  </Button>
                  <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800 px-6 md:px-8 text-sm">
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
