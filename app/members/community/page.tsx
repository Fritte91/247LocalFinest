"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MobileNav } from "@/app/components/mobile-nav"
import { useApp, type CartItem } from "@/app/hooks/use-app"
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
  ShoppingCart,
} from "lucide-react"
import { events, type Event } from "./data/events"
import { awards, type Award } from "./data/awards"
import { growersData } from "@/app/data/growers"
import { 
  articleCategories, 
  articles, 
  popularTopics, 
  featuredContent,
  getTrendingArticles,
  getLatestArticles,
  type Article,
  type ArticleCategory 
} from "./data/education"

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

const iconMap: Record<string, any> = {
  Sprout: Sprout,
  Beaker: Beaker,
  Heart: Heart,
  Wrench: Wrench,
  BookOpen: BookOpen,
};

export default function CommunityPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedAward, setSelectedAward] = useState<Award | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get("category")
  const selectedCategory = useMemo(() => {
    return (
      articleCategories.find((cat) => cat.id === categoryParam) || articleCategories[0]
    )
  }, [categoryParam])
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => a.categorySlug === selectedCategory.id)
  }, [selectedCategory])
  const handleCategoryClick = (cat: ArticleCategory) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', 'education')
    params.set('category', cat.id)
    router.push(`/members/community?${params.toString()}`, { scroll: false })
  }

  // Handle tab changes and update URL
  const handleTabChange = (value: string) => {
    // Validate that the tab value is one of the expected values
    const validTabs = ['events', 'awards', 'education', 'growers']
    if (!validTabs.includes(value)) {
      console.warn(`Invalid tab value: ${value}`)
      return
    }
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.push(`/members/community?${params.toString()}`, { scroll: false })
  }

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
                      <div className="text-xs text-sage-400">
                        {award.competitionStats.totalVotes ? "Votes" : "Entries"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-gold-400">{award.competitionStats.categories}</div>
                      <div className="text-xs text-sage-400">Categories</div>
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
              <Link href="/members/cart">
                <Button variant="outline" className="relative bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 transition-all duration-300">
                  <ShoppingCart className="h-4 w-4" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 gold-gradient text-white text-xs animate-pulse">
                      {cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/members/profile">
                <Button variant="outline" className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 transition-all duration-300">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </nav>

            <MobileNav 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              cartItemCount={cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
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
        <Tabs 
          defaultValue={(() => {
            const tabParam = searchParams.get('tab')
            const validTabs = ['events', 'awards', 'education', 'growers']
            return validTabs.includes(tabParam || '') ? tabParam || 'events' : 'events'
          })()} 
          onValueChange={handleTabChange}
          className="space-y-6 md:space-y-8"
        >
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
          <TabsContent value="education" className="space-y-8 md:space-y-12">
            {/* Hero/Intro Section */}
            <div className="relative w-full py-12 md:py-16 mb-8 md:mb-12 bg-gradient-to-r from-forest-900 via-sage-950 to-black overflow-hidden rounded-2xl shadow-xl">
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
                    Explore Cannabis Knowledge
                  </h1>
                  <p className="text-lg md:text-2xl text-sage-300 max-w-2xl mb-4 md:mb-6">
                    Discover premium articles, guides, and tips from expert growers, scientists, and wellness professionals. Browse by category or dive into trending topics.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {articleCategories.map((cat) => (
                      <Badge
                        key={cat.id}
                        className={`cursor-pointer px-4 py-2 text-base font-semibold ${cat.id === selectedCategory.id ? "premium-gradient text-white" : "bg-sage-900 text-sage-300 hover:bg-sage-800"}`}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block flex-1 relative h-56 w-full max-w-md">
                  <Image
                    src="/images/indoor.jpg"
                    alt="Cannabis Knowledge"
                    fill
                    className="object-cover rounded-2xl shadow-2xl border-4 border-forest-700/40"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <aside className="w-full md:w-72 flex-shrink-0 mb-8 md:mb-0">
                <div className="sticky top-24">
                  <div className="rounded-2xl bg-sage-950/80 border border-sage-800 shadow-lg p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Categories</h3>
                    <div className="flex flex-col gap-2">
                      {articleCategories.map((cat) => {
                        const Icon = iconMap[cat.icon] || BookOpen
                        return (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-base border-2 ${
                              cat.id === selectedCategory.id
                                ? "border-forest-500 bg-gradient-to-r from-forest-900 via-sage-900 to-black text-white shadow-lg"
                                : "border-transparent bg-sage-900/60 text-sage-300 hover:bg-sage-800/80 hover:text-white"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="flex-1">{cat.title}</span>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-sage-800 text-sage-300 ml-2">
                              {articles.filter((a) => a.categorySlug === cat.id).length}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                    {selectedCategory.title}
                  </h2>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredArticles.map((article, idx) => (
                    <Link key={article.id} href={`/members/community/articles/${article.slug}`} className="group">
                      <Card className="relative bg-sage-950/90 border border-sage-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.025] group-hover:border-forest-500 group-hover:shadow-forest-900/30">
                        {/* Article Image */}
                        <div className="relative h-44 w-full overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                            <Badge className={`text-xs font-semibold px-3 py-1 ${
                              article.categorySlug === 'growing' ? 'premium-gradient text-white' :
                              article.categorySlug === 'terpenes' ? 'bg-purple-600 text-white' :
                              article.categorySlug === 'health' ? 'bg-emerald-600 text-white' :
                              'bg-amber-600 text-white'
                            }`}>
                              {article.category}
                            </Badge>
                            <Badge variant="outline" className="border-gold-500 text-gold-400 text-xs w-fit">
                              {article.difficulty}
                            </Badge>
                            {article.trending && (
                              <Badge className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs w-fit animate-pulse">Trending</Badge>
                            )}
                            {article.featured && (
                              <Badge className="gold-gradient text-white text-xs w-fit">Featured</Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-6 flex flex-col h-full">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sage-300 text-sm mb-4 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-3 mt-auto">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-sage-400" />
                              <span className="text-sage-300 text-xs font-medium truncate">{article.author}</span>
                            </div>
                            <span className="text-sage-500 text-xs">•</span>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-sage-400" />
                              <span className="text-sage-300 text-xs font-medium">{article.readTime}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* No articles fallback */}
                {filteredArticles.length === 0 && (
                  <div className="text-center text-sage-400 py-16 text-lg">
                    No articles found in this category yet.
                  </div>
                )}
              </main>
            </div>
          </TabsContent>

          {/* Growers Tab */}
          <TabsContent value="growers" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Master Growers Collective</h2>
              <p className="text-lg text-sage-300">Meet the legendary cultivators behind our award-winning strains</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Master Grower of the Year Card */}
              <div className="lg:col-span-2">
                <Card className="bg-sage-950 border-sage-800/70 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                  <Image
                    src={growersData[0].coverImage || "/placeholder.svg"}
                    alt="background"
                    fill
                    className="object-cover opacity-10"
                  />
                  <div className="md:w-1/3 relative flex-shrink-0">
                    <Image
                      src={growersData[0].image}
                      alt={growersData[0].name}
                      width={300}
                      height={400}
                      className="rounded-lg object-cover w-full h-full min-h-[300px]"
                    />
                    <Badge className="gold-gradient text-white absolute top-3 left-3">Master Grower of the Year</Badge>
                  </div>
                  <div className="md:w-2/3 flex flex-col relative">
                    <div className="flex items-start gap-4 mb-2">
                      <div className="bg-forest-500/10 p-3 rounded-lg border border-forest-500/30">
                        <Crown className="h-6 w-6 text-forest-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display text-white">{growersData[0].name}</h3>
                        <p className="text-forest-400 font-semibold">{growersData[0].specialty}</p>
                      </div>
                    </div>
                    <p className="text-sage-300 text-sm mb-4 flex-grow">{growersData[0].role}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="font-bold text-lg text-white">{growersData[0].totalAwards}</div>
                        <div className="text-xs text-sage-400">Awards</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-white">{(growersData[0].followers / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-sage-400">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-white">{growersData[0].totalHarvests}</div>
                        <div className="text-xs text-sage-400">Harvests</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-white">{growersData[0].avgThc}%</div>
                        <div className="text-xs text-sage-400">Avg. THC</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Link href={`/members/growers/${growersData[0].id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full bg-forest-500/10 border-forest-500/30 text-forest-300 hover:bg-forest-500/20"
                        >
                          View Portfolio
                        </Button>
                      </Link>
                      <Button className="premium-gradient flex-1">
                        <Users className="h-4 w-4 mr-2" /> Follow Grower
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Other Growers */}
              {growersData.slice(1).map((grower) => {
                const themeClasses = {
                  emerald: {
                    bg: "bg-emerald-950/50",
                    border: "border-emerald-500/30",
                    badge: "bg-emerald-600",
                    text: "text-emerald-400",
                    button: "bg-gradient-to-r from-emerald-500 to-emerald-700",
                    iconContainer: "bg-emerald-500/10 border-emerald-500/30",
                    icon: <Leaf className="h-6 w-6 text-emerald-400" />,
                    tagBorder: "border-emerald-500",
                  },
                  purple: {
                    bg: "bg-purple-950/50",
                    border: "border-purple-500/30",
                    badge: "bg-purple-600",
                    text: "text-purple-400",
                    button: "bg-gradient-to-r from-purple-500 to-purple-700",
                    iconContainer: "bg-purple-500/10 border-purple-500/30",
                    icon: <Beaker className="h-6 w-6 text-purple-400" />,
                    tagBorder: "border-purple-500",
                  },
                  forest: {
                    bg: "bg-forest-950/50",
                    border: "border-forest-500/30",
                    badge: "bg-forest-600",
                    text: "text-forest-400",
                    button: "bg-gradient-to-r from-forest-500 to-forest-700",
                    iconContainer: "bg-forest-500/10 border-forest-500/30",
                    icon: <Crown className="h-6 w-6 text-forest-400" />,
                    tagBorder: "border-forest-500",
                  },
                  sunset: {
                    bg: "bg-orange-950/50",
                    border: "border-orange-500/30",
                    badge: "bg-orange-600",
                    text: "text-orange-400",
                    button: "bg-gradient-to-r from-orange-500 to-amber-700",
                    iconContainer: "bg-orange-500/10 border-orange-500/30",
                    icon: <Flame className="h-6 w-6 text-orange-400" />,
                    tagBorder: "border-orange-500",
                  },
                  earth: {
                    bg: "bg-yellow-950/50",
                    border: "border-yellow-500/30",
                    badge: "bg-yellow-700",
                    text: "text-yellow-400",
                    button: "bg-gradient-to-r from-yellow-600 to-orange-700",
                    iconContainer: "bg-yellow-500/10 border-yellow-500/30",
                    icon: <Sprout className="h-6 w-6 text-yellow-400" />,
                    tagBorder: "border-yellow-500",
                  },
                  neon: {
                    bg: "bg-pink-950/50",
                    border: "border-pink-500/30",
                    badge: "bg-pink-600",
                    text: "text-pink-400",
                    button: "bg-gradient-to-r from-pink-500 to-fuchsia-700",
                    iconContainer: "bg-pink-500/10 border-pink-500/30",
                    icon: <Star className="h-6 w-6 text-pink-400" />,
                    tagBorder: "border-pink-500",
                  },
                  sage: {
                    bg: "bg-lime-950/50",
                    border: "border-lime-500/30",
                    badge: "bg-lime-600",
                    text: "text-lime-400",
                    button: "bg-gradient-to-r from-lime-500 to-green-700",
                    iconContainer: "bg-lime-500/10 border-lime-500/30",
                    icon: <Heart className="h-6 w-6 text-lime-400" />,
                    tagBorder: "border-lime-500",
                  },
                }
                const currentTheme = themeClasses[grower.theme]

                return (
                  <Card key={grower.id} className={`p-6 flex flex-col ${currentTheme.bg} ${currentTheme.border} relative overflow-hidden`}>
                    <Image
                      src={grower.coverImage || "/placeholder.svg"}
                      alt="background"
                      fill
                      className="object-cover opacity-10"
                    />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className={`${currentTheme.badge} text-white`}>{grower.roleBadge}</Badge>
                        <div className={`p-3 rounded-lg ${currentTheme.iconContainer}`}>{currentTheme.icon}</div>
                      </div>
                      <h3 className="text-xl font-display text-white">{grower.name}</h3>
                      <p className={`font-semibold ${currentTheme.text}`}>{grower.specialty}</p>
                      <div className="flex items-center gap-4 text-sm text-sage-300 mt-1 mb-3">
                        <span>{grower.experience}</span>
                        <span>{grower.totalAwards} awards</span>
                        <span>{(grower.followers / 1000).toFixed(1)}K followers</span>
                      </div>
                      <p className="text-sage-300 text-sm mb-4 flex-grow">{grower.role}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {grower.techniques.map((tech) => (
                          <Badge
                            key={tech.name}
                            variant="outline"
                            className={`${currentTheme.tagBorder} ${currentTheme.text} bg-black/20`}
                          >
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                      <div className={`rounded-lg p-3 text-sm mb-4 bg-black/20 border ${currentTheme.border}`}>
                        <p className={`font-semibold ${currentTheme.text} mb-1`}>
                          <Trophy className="h-4 w-4 inline mr-2" />
                          Recent Achievement
                        </p>
                        <p className="text-sage-300">{grower.awards[0]?.title}</p>
                      </div>
                      <Link href={`/members/growers/${grower.id}`} className="w-full mt-auto">
                        <Button className={`w-full text-white ${currentTheme.button}`}>View Portfolio</Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Our Growing Collective */}
            <div className="bg-sage-950 border-sage-800/70 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center text-center lg:text-left">
                <div className="lg:col-span-1 mb-6 lg:mb-0">
                  <h3 className="text-xl font-display text-white mb-2">Our Growing Collective</h3>
                  <p className="text-sage-300 text-sm">Combined expertise and achievements.</p>
                </div>
                <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-gold-500/10 p-4 rounded-full mb-2 w-fit mx-auto">
                      <Trophy className="h-8 w-8 text-gold-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {growersData.reduce((sum, g) => sum + g.totalAwards, 0)}
                    </div>
                    <div className="text-sage-400">Total Awards</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-forest-500/10 p-4 rounded-full mb-2 w-fit mx-auto">
                      <Sprout className="h-8 w-8 text-forest-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {growersData.reduce((sum, g) => sum + parseInt(g.experience), 0)}
                    </div>
                    <div className="text-sage-400">Years Combined</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-emerald-500/10 p-4 rounded-full mb-2 w-fit mx-auto">
                      <Users className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{growersData.length}</div>
                    <div className="text-sage-400">Master Growers</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-500/10 p-4 rounded-full mb-2 w-fit mx-auto">
                      <Heart className="h-8 w-8 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {(growersData.reduce((sum, g) => sum + g.followers, 0) / 1000).toFixed(1)}K
                    </div>
                    <div className="text-sage-400">Community</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Join Our Growing Community */}
            <div className="bg-gradient-to-r from-forest-900 to-sage-900 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-display text-white mb-2">Join Our Growing Community</h3>
              <p className="text-sage-300 mb-6">
                Connect with master growers, learn from their expertise, and become part of a passionate community of
                cultivators.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="premium-gradient">
                  Join Community
                </Button>
                <Button size="lg" variant="outline" className="bg-black/20 border-sage-600">
                  Learn More
                </Button>
              </div>
            </div>
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
