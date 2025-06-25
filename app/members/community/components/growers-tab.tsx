import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Leaf, Beaker, Heart, Flame, Sprout, Star, Users, Trophy } from "lucide-react"
import { type Grower } from "@/app/data/growers"

interface GrowersTabProps {
  growersData: Grower[]
}

export function GrowersTab({ growersData }: GrowersTabProps) {
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Master Growers Collective</h2>
        <p className="text-lg text-sage-300">Meet the legendary cultivators behind our award-winning strains</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Master Grower of the Year Card */}
        <div className="lg:col-span-2">
          <Card className="bg-sage-950 border-sage-800/70 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
            <img
              src={growersData[0].coverImage || "/placeholder.svg"}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover opacity-10"
              loading="lazy"
            />
            <div className="md:w-1/3 relative flex-shrink-0">
              <img
                src={growersData[0].image}
                alt={growersData[0].name}
                className="rounded-lg object-cover w-full h-full min-h-[300px]"
                loading="lazy"
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
          const currentTheme = themeClasses[grower.theme]

          return (
            <Card key={grower.id} className={`p-6 flex flex-col ${currentTheme.bg} ${currentTheme.border} relative overflow-hidden`}>
              <img
                src={grower.coverImage || "/placeholder.svg"}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover opacity-10"
                loading="lazy"
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
    </div>
  )
} 