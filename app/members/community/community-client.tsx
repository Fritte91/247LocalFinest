"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  type Article,
  type ArticleCategory 
} from "./data/education"
import { EventsTab } from "./components/events-tab"
import { AwardsTab } from "./components/awards-tab"
import { EducationTab } from "./components/education-tab"
import { GrowersTab } from "./components/growers-tab"

// Helper to format dates consistently for SSR/CSR
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export function CommunityClient() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedAward, setSelectedAward] = useState<Award | null>(null)
  const { cart } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get("category")
  const selectedCategory = useMemo(() => {
    return (
      articleCategories.find((cat) => cat.id === categoryParam) || articleCategories[0]
    )
  }, [categoryParam])

  const handleCategoryClick = (cat: ArticleCategory) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', 'education')
    params.set('category', cat.id)
    router.push(`/members/community?${params.toString()}`, { scroll: false })
  }

  // Handle tab changes and update URL
  const handleTabChange = (value: string) => {
    const validTabs = ['events', 'awards', 'education', 'growers']
    if (!validTabs.includes(value)) {
      console.warn(`Invalid tab value: ${value}`)
      return
    }
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.push(`/members/community?${params.toString()}`, { scroll: false })
  }

  return (
    <>
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
        <TabsList className="grid w-full grid-cols-4 bg-sage-950 border border-sage-700 h-12 rounded-xl overflow-hidden items-center p-0">
          <TabsTrigger value="events" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm h-12 px-0 font-semibold rounded-none">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="awards" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm h-12 px-0 font-semibold rounded-none">
            <Trophy className="h-4 w-4" />
            <span>Awards</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm h-12 px-0 font-semibold rounded-none">
            <BookOpen className="h-4 w-4" />
            <span>Learn</span>
          </TabsTrigger>
          <TabsTrigger value="growers" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white flex items-center justify-center gap-2 text-xs md:text-sm h-12 px-0 font-semibold rounded-none">
            <Users className="h-4 w-4" />
            <span>Growers</span>
          </TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events">
          <EventsTab 
            events={events} 
            onEventSelect={setSelectedEvent}
            formatDate={formatDate}
          />
        </TabsContent>

        {/* Awards Tab */}
        <TabsContent value="awards">
          <AwardsTab 
            awards={awards} 
            onAwardSelect={setSelectedAward}
            formatDate={formatDate}
          />
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <EducationTab 
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            formatDate={formatDate}
          />
        </TabsContent>

        {/* Growers Tab */}
        <TabsContent value="growers">
          <GrowersTab growersData={growersData} />
        </TabsContent>
      </Tabs>

      {/* Event Detail Dialog */}
      <EventDetailDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} formatDate={formatDate} />

      {/* Award Detail Dialog */}
      <AwardDetailDialog award={selectedAward} onClose={() => setSelectedAward(null)} formatDate={formatDate} />
    </>
  )
}

// Event Detail Dialog Component
const EventDetailDialog = ({ event, onClose, formatDate }: { event: Event | null; onClose: () => void; formatDate: (date: string) => string }) => {
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
            <img src={event.images[0] || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
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
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${event.title} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      loading="lazy"
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

// Award Detail Dialog Component
const AwardDetailDialog = ({ award, onClose, formatDate }: { award: Award | null; onClose: () => void; formatDate: (date: string) => string }) => {
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
                <img
                  src={award.certificateImage || "/placeholder.svg"}
                  alt={`${award.title} Certificate`}
                  className="w-full h-full object-cover"
                  loading="lazy"
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
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${award.title} Event ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                        loading="lazy"
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