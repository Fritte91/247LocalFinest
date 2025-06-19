export interface GrowerProfile {
  name: string
  specialty: string
  experience: string
  achievements: number
  followers: number
  bio: string
}

export const growerProfiles: GrowerProfile[] = [
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