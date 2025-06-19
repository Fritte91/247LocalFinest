export interface ArticleCategory {
  title: string
  description: string
  icon: string
  articleCount: number
  gradient: string
  topics: string[]
}

export interface Article {
  title: string
  author: string
  readTime: string
  category: string
  image: string
  description: string
}

export interface PopularTopic {
  title: string
  description: string
  icon: string
  gradient: string
  articleCount: number
}

export const articleCategories: ArticleCategory[] = [
  {
    title: "Growing & Cultivation",
    description: "Master the art of cannabis cultivation",
    icon: "Sprout",
    articleCount: 24,
    gradient: "premium-gradient",
    topics: [
      "Soil vs Hydroponic Systems",
      "Lighting for Maximum Yield",
      "Nutrient Schedules & Feeding",
      "Harvest & Curing Techniques",
    ],
  },
  {
    title: "Terpenes & Science",
    description: "Understanding cannabis chemistry",
    icon: "Beaker",
    articleCount: 18,
    gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    topics: [
      "Terpene Profiles Explained",
      "Myrcene vs Limonene Effects",
      "Preserving Terpenes in Curing",
      "The Entourage Effect",
    ],
  },
  {
    title: "Health & Benefits",
    description: "Medical applications and wellness",
    icon: "Heart",
    articleCount: 16,
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    topics: [
      "CBD for Pain Management",
      "Cannabis and Sleep Quality",
      "Microdosing Guidelines",
      "Anxiety Relief Strains",
    ],
  },
  {
    title: "Tools & Equipment",
    description: "Gear reviews and recommendations",
    icon: "Wrench",
    articleCount: 21,
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    topics: [
      "Best Vaporizers 2024",
      "Glass vs Metal Pipes",
      "Growing Equipment Reviews",
      "Storage Solutions Guide",
    ],
  },
]

export const latestArticles: Article[] = [
  {
    title: "Understanding Cannabis Genetics",
    author: "David Thompson",
    readTime: "8 min read",
    category: "Growing",
    image: "/images/weed13.jpg",
    description: "Dive deep into the world of cannabis genetics and learn how different strains develop their unique characteristics.",
  },
  {
    title: "The Power of Pinene Terpenes",
    author: "Sarah Rodriguez",
    readTime: "6 min read",
    category: "Terpenes",
    image: "/images/weed14.jpg",
    description: "Explore how pinene terpenes contribute to the unique aroma and effects of various cannabis strains.",
  },
  {
    title: "Cannabis for Better Sleep",
    author: "Marcus Chen",
    readTime: "10 min read",
    category: "Health",
    image: "/images/weed10.jpg",
    description: "Discover which strains and consumption methods work best for improving sleep quality and duration.",
  },
  {
    title: "Vaporizer Buying Guide 2024",
    author: "Equipment Team",
    readTime: "12 min read",
    category: "Tools",
    image: "/images/weed9.jpg",
    description: "Our comprehensive review of the best vaporizers available this year, from budget to premium options.",
  },
  {
    title: "Organic vs Synthetic Nutrients",
    author: "Sarah Rodriguez",
    readTime: "9 min read",
    category: "Growing",
    image: "/images/weed8.jpg",
    description: "Compare the benefits and drawbacks of organic versus synthetic nutrients for cannabis cultivation.",
  },
  {
    title: "Microdosing: A Beginner's Guide",
    author: "Dr. Lisa Chen",
    readTime: "7 min read",
    category: "Health",
    image: "/images/weed7.jpg",
    description: "Learn the art of microdosing cannabis for therapeutic benefits without overwhelming psychoactive effects.",
  },
]

export const popularTopics: PopularTopic[] = [
  {
    title: "Consumption Methods",
    description: "Smoking, vaping, edibles, and more",
    icon: "Flame",
    gradient: "premium-gradient",
    articleCount: 15,
  },
  {
    title: "Strain Reviews",
    description: "In-depth strain analysis and effects",
    icon: "Microscope",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    articleCount: 32,
  },
  {
    title: "Growing Tips",
    description: "Expert cultivation advice and tricks",
    icon: "BookOpen",
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    articleCount: 28,
  },
  {
    title: "Product Reviews",
    description: "Honest reviews of cannabis products",
    icon: "Star",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    articleCount: 19,
  },
]

export const featuredArticle = {
  title: "The Complete Guide to Indoor Cannabis Cultivation",
  author: "Marcus Chen",
  readTime: "15 min read",
  category: "Growing Guide",
  image: "/images/indoor.jpg",
  description: "Master the art of indoor growing with our comprehensive guide covering everything from setup to harvest. Learn the secrets that our award-winning growers use to produce premium cannabis.",
  level: "Expert Level",
} 