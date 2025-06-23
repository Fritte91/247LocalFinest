export interface Award {
  title: string;
  category: string;
  year: string;
  strain: string;
}

export interface Strain {
  name: string;
  type: string;
  thc: number;
  cbd: number;
  yield: string;
  difficulty: string;
  flowerTime: string;
  description: string;
  image: string;
}

export interface Technique {
  name: string;
  description: string;
  expertise: number;
}

export interface Grower {
  id: number;
  name: string;
  specialty: string;
  role: string;
  roleBadge: string;
  theme: "forest" | "emerald" | "purple" | "sunset" | "earth" | "neon" | "sage";
  experience: string;
  location: string;
  bio: string;
  image: string;
  coverImage: string;
  followers: number;
  totalHarvests: number;
  totalAwards: number;
  avgThc?: number;
  awards: Award[];
  strains: Strain[];
  techniques: Technique[];
  growingSince: number;
}

export const growersData: Grower[] = [
  {
    id: 1,
    name: "Boss Peaceman",
    specialty: "Aeroponic Systems",
    role: "Pioneering hydroponic cultivation techniques with a focus on maximizing potency and yield.",
    roleBadge: "Aero-Master",
    theme: "forest",
    experience: "15 years",
    location: "Rangsit, Thailand",
    bio: "Marcus is a pioneering cannabis cultivator who has dedicated over a decade to perfecting hydroponic growing techniques.",
    image: "/images/beam.jpg",
    coverImage: "/images/weed2.jpg",
    followers: 2400,
    totalHarvests: 156,
    totalAwards: 15,
    avgThc: 23.5,
    growingSince: 2012,
    awards: [{ title: "Cannabis Cup Winner 2023", category: "Best Indoor Flower", year: "2023", strain: "Purple Haze Premium" }],
    strains: [{ name: "Purple Haze Premium", type: "Sativa", thc: 23.5, cbd: 1, yield: "High", difficulty: "Advanced", flowerTime: "10 weeks", description: "Signature strain.", image: "/placeholder.svg" }],
    techniques: [{ name: "Deep Water Culture", description: "Advanced hydroponics.", expertise: 95 }, { name: "LED Optimization", description: "Precision lighting.", expertise: 90 }],
  },
  {
    id: 2,
    name: "Sarah Rodriguez",
    specialty: "Organic Cultivation",
    role: "Dedicated to sustainable, organic growing practices that respect the environment.",
    roleBadge: "Organic Expert",
    theme: "emerald",
    experience: "8 years",
    location: "Oregon",
    bio: "Dedicated to sustainable, organic growing practices that respect the environment.",
    image: "/images/weed8.jpg",
    coverImage: "/images/weed3.jpg",
    followers: 1800,
    totalHarvests: 120,
    totalAwards: 12,
    growingSince: 2016,
    awards: [{ title: "Sustainable Grower Award 2022", category: "Environmental Excellence", year: "2022", strain: "Green Dream" }],
    strains: [{ name: "Green Dream", type: "Hybrid", thc: 20, cbd: 5, yield: "Medium", difficulty: "Intermediate", flowerTime: "9 weeks", description: "Earthy and balanced.", image: "/placeholder.svg" }],
    techniques: [{ name: "Organic Nutrients", description: "Natural feeding.", expertise: 92 }, { name: "Water Conservation", description: "Efficient water use.", expertise: 88 }, { name: "Soil Health", description: "Living soil cultivation.", expertise: 95 }],
  },
  {
    id: 3,
    name: "David Thompson",
    specialty: "Genetics & Breeding",
    role: "Master breeder developing new strains with unique cannabinoid profiles.",
    roleBadge: "Genetics Master",
    theme: "purple",
    experience: "15 years",
    location: "Colorado",
    bio: "Master breeder developing new strains with unique cannabinoid and terpene profiles.",
    image: "/images/weed6.jpg",
    coverImage: "/images/weed7.jpg",
    followers: 3200,
    totalHarvests: 250,
    totalAwards: 20,
    growingSince: 2009,
    awards: [{ title: "Innovation in Genetics 2022", category: "Breeding Excellence", year: "2022", strain: "Cosmic Candy" }],
    strains: [{ name: "Cosmic Candy", type: "Indica", thc: 28, cbd: 1, yield: "High", difficulty: "Expert", flowerTime: "9 weeks", description: "A potent, unique indica.", image: "/placeholder.svg" }],
    techniques: [{ name: "Strain Development", description: "Creating new genetics.", expertise: 98 }, { name: "Cannabinoid Research", description: "Exploring rare cannabinoids.", expertise: 94 }, { name: "Genetic Stability", description: "Ensuring consistent results.", expertise: 91 }],
  },
  {
    "id": 4,
    "name": "Lana Greene",
    "specialty": "Greenhouse Hybrid Systems",
    "role": "Blending indoor precision with natural sunlight to optimize terpene profiles.",
    "roleBadge": "Sunlight Synth",
    "theme": "sunset",
    "experience": "10 years",
    "location": "Chiang Mai, Thailand",
    "bio": "Lana pioneers hybrid greenhouse systems that merge sustainable practices with modern control tech.",
    "image": "/images/weed4.jpg",
    "coverImage": "/images/weed5.jpg",
    "followers": 2100,
    "totalHarvests": 145,
    "totalAwards": 10,
    "avgThc": 22.0,
    "growingSince": 2013,
    "awards": [
      { "title": "Best Greenhouse Innovation", "category": "Green Tech", "year": "2021", "strain": "SunKissed OG" }
    ],
    "strains": [
      { "name": "SunKissed OG", "type": "Hybrid", "thc": 22, "cbd": 2, "yield": "High", "difficulty": "Intermediate", "flowerTime": "8 weeks", "description": "Bright citrus aroma with relaxing effects.", "image": "/placeholder.svg" }
    ],
    "techniques": [
      { "name": "Light Deprivation", "description": "Boosting flowering with controlled light cycles.", "expertise": 90 },
      { "name": "Climate Automation", "description": "Smart control for humidity & temperature.", "expertise": 93 }
    ]
  },
  {
    "id": 5,
    "name": "Kofi Mensah",
    "specialty": "Outdoor Cultivation",
    "role": "Master of large-scale outdoor grows focused on land stewardship and natural cycles.",
    "roleBadge": "Outdoor Legend",
    "theme": "earth",
    "experience": "20 years",
    "location": "KwaZulu-Natal, South Africa",
    "bio": "Kofi integrates traditional cultivation methods with modern sustainability to achieve massive outdoor yields.",
    "image": "/images/weed9.jpg",
    "coverImage": "/images/weed10.jpg",
    "followers": 3900,
    "totalHarvests": 300,
    "totalAwards": 18,
    "avgThc": 19.5,
    "growingSince": 2005,
    "awards": [
      { "title": "Landrace Champion 2021", "category": "Outdoor Excellence", "year": "2021", "strain": "Zulu Gold" }
    ],
    "strains": [
      { "name": "Zulu Gold", "type": "Sativa", "thc": 19.5, "cbd": 0.5, "yield": "Very High", "difficulty": "Easy", "flowerTime": "12 weeks", "description": "Ancestral sativa with energetic high.", "image": "/placeholder.svg" },
      { "name": "Zulu Gold", "type": "Sativa", "thc": 19.5, "cbd": 0.5, "yield": "Very High", "difficulty": "Easy", "flowerTime": "12 weeks", "description": "Ancestral sativa with energetic high.", "image": "/placeholder.svg" },
      { "name": "Zulu Gold", "type": "Sativa", "thc": 19.5, "cbd": 0.5, "yield": "Very High", "difficulty": "Easy", "flowerTime": "12 weeks", "description": "Ancestral sativa with energetic high.", "image": "/placeholder.svg" }
    ],
    "techniques": [
      { "name": "Companion Planting", "description": "Biodiverse pest management.", "expertise": 87 },
      { "name": "Moon Cycle Harvesting", "description": "Tapping into lunar rhythms.", "expertise": 90 }
    ]
  },
  {
    "id": 6,
    "name": "Hiro Tanaka",
    "specialty": "Micro-Grow Engineering",
    "role": "Crafting ultra-compact growing systems for urban cultivation.",
    "roleBadge": "MicroGrow Guru",
    "theme": "neon",
    "experience": "6 years",
    "location": "Tokyo, Japan",
    "bio": "Hiro designs micro-environments for boutique cannabis production, optimizing every square centimeter.",
    "image": "/images/weed11.jpg",
    "coverImage": "/images/weed12.jpg",
    "followers": 1250,
    "totalHarvests": 60,
    "totalAwards": 5,
    "avgThc": 21.7,
    "growingSince": 2018,
    "awards": [
      { "title": "Best Micro-Grow Setup", "category": "Innovation", "year": "2023", "strain": "Tokyo Drift" }
    ],
    "strains": [
      { "name": "Tokyo Drift", "type": "Indica-Dominant Hybrid", "thc": 21.7, "cbd": 1.2, "yield": "Medium", "difficulty": "Advanced", "flowerTime": "9 weeks", "description": "Fast flowering with a calming buzz.", "image": "/placeholder.svg" }
    ],
    "techniques": [
      { "name": "Vertical Stacking", "description": "Maximizing vertical space.", "expertise": 95 },
      { "name": "CO2 Optimization", "description": "Enhancing plant metabolism.", "expertise": 90 }
    ]
  },
  {
    "id": 7,
    "name": "Ella Novak",
    "specialty": "Regenerative Cultivation",
    "role": "Rebuilding soil and ecosystems through regenerative cannabis farming.",
    "roleBadge": "EcoGrow Queen",
    "theme": "sage",
    "experience": "12 years",
    "location": "British Columbia, Canada",
    "bio": "Ella leads regenerative farming practices that focus on carbon sequestration and ecological healing.",
    "image": "/images/weed13.jpg",
    "coverImage": "/images/weed14.jpg",
    "followers": 2700,
    "totalHarvests": 130,
    "totalAwards": 9,
    "avgThc": 20.2,
    "growingSince": 2011,
    "awards": [
      { "title": "Eco Cultivator Award", "category": "Soil Regeneration", "year": "2020", "strain": "Gaia's Breath" }
    ],
    "strains": [
      { "name": "Gaia's Breath", "type": "Balanced Hybrid", "thc": 20.2, "cbd": 2.5, "yield": "High", "difficulty": "Intermediate", "flowerTime": "10 weeks", "description": "Floral, fresh, and grounding.", "image": "/placeholder.svg" }
    ],
    "techniques": [
      { "name": "No-Till Farming", "description": "Preserving soil structure.", "expertise": 92 },
      { "name": "Cover Cropping", "description": "Living mulch for soil health.", "expertise": 89 }
    ]
  },
];
