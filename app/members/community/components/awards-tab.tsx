import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Medal } from "lucide-react"
import { type Award } from "../data/awards"

interface AwardsTabProps {
  awards: Award[]
  onAwardSelect: (award: Award) => void
  formatDate: (date: string) => string
}

export function AwardsTab({ awards, onAwardSelect, formatDate }: AwardsTabProps) {
  return (
    <div className="space-y-6 md:space-y-8">
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
            onClick={() => onAwardSelect(award)}
          >
            {/* Award Rank Badge */}
            <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 gold-gradient rounded-full flex items-center justify-center animate-pulse">
                <Crown className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
            </div>

            <div className="relative h-48 md:h-64">
              <img
                src={award.certificateImage || "/placeholder.svg"}
                alt={`${award.title} Certificate`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
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
    </div>
  )
} 