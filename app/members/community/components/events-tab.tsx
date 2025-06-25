import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import { type Event } from "../data/events"

interface EventsTabProps {
  events: Event[]
  onEventSelect: (event: Event) => void
  formatDate: (date: string) => string
}

export function EventsTab({ events, onEventSelect, formatDate }: EventsTabProps) {
  return (
    <div className="space-y-6 md:space-y-8">
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
                  onClick={() => onEventSelect(event)}
                >
                  <div className="relative h-40 md:h-48">
                    <img
                      src={event.images[0] || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
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
    </div>
  )
} 