export interface ArticleCategory {
  id: string
  title: string
  description: string
  icon: string
  articleCount: number
  gradient: string
  topics: string[]
  color: string
  featured?: boolean
}

export interface Article {
  id: string
  title: string
  author: string
  readTime: string
  category: string
  categorySlug: string
  image: string
  description: string
  publishDate: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  views?: number
  rating?: number
  featured?: boolean
  trending?: boolean
  slug: string
  content?: string // JSX content as string or component reference
  hasCustomComponent?: boolean // Flag for articles with custom components
}

export interface PopularTopic {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  articleCount: number
  color: string
}

export interface FeaturedContent {
  hero: Article
  trending: Article[]
  editorsPick: Article[]
}

export const articleCategories: ArticleCategory[] = [
  {
    id: 'growing',
    title: "Growing & Cultivation",
    description: "Master the art of cannabis cultivation from seed to harvest",
    icon: "Sprout",
    articleCount: 24,
    gradient: "premium-gradient",
    color: "emerald",
    featured: true,
    topics: [
      "Indoor vs Outdoor Growing",
      "Lighting for Maximum Yield",
      "Nutrient Schedules & Feeding",
      "Harvest & Curing Techniques",
      "Pest Management",
      "Climate Control",
    ],
  },
  {
    id: 'terpenes',
    title: "Terpenes & Science",
    description: "Understanding cannabis chemistry and effects",
    icon: "Beaker",
    articleCount: 18,
    gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    color: "purple",
    topics: [
      "Terpene Profiles Explained",
      "Myrcene vs Limonene Effects",
      "Preserving Terpenes in Curing",
      "The Entourage Effect",
      "Terpene Testing Methods",
      "Aroma Chemistry",
    ],
  },
  {
    id: 'health',
    title: "Health & Benefits",
    description: "Medical applications and wellness benefits",
    icon: "Heart",
    articleCount: 16,
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    color: "emerald",
    topics: [
      "CBD for Pain Management",
      "Cannabis and Sleep Quality",
      "Microdosing Guidelines",
      "Anxiety Relief Strains",
      "Medical Applications",
      "Wellness Benefits",
    ],
  },
  {
    id: 'tools',
    title: "Tools & Equipment",
    description: "Gear reviews and recommendations",
    icon: "Wrench",
    articleCount: 21,
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    color: "amber",
    topics: [
      "Best Vaporizers 2024",
      "Glass vs Metal Pipes",
      "Growing Equipment Reviews",
      "Storage Solutions Guide",
      "Consumption Methods",
      "Product Reviews",
    ],
  },
]

export const articles: Article[] = [
  // --- Growing & Cultivation ---
  {
    id: 'indoor-cultivating-guide',
    title: "The Complete Guide to Indoor Cannabis Cultivation",
    author: "Marcus Chen",
    readTime: "15 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/indoor.webp",
    description: "Master the art of indoor growing with our comprehensive guide covering everything from setup to harvest. Learn the secrets that our award-winning growers use to produce premium cannabis.",
    publishDate: "March 15, 2024",
    tags: ["Indoor Growing", "Setup Guide", "Expert Tips"],
    difficulty: "Advanced",
    slug: "indoor-cultivating-guide",
    hasCustomComponent: true
  },
  {
    id: 'harvestcuring',
    title: "Harvest & Curing Techniques: Perfecting Your Buds",
    author: "Dr. Rachel Lee",
    readTime: "11 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed1.webp",
    description: "Learn the best practices for harvesting and curing to preserve cannabis quality and potency. Discover timing, trimming techniques, and curing methods for optimal results.",
    publishDate: "April 25, 2024",
    tags: ["Harvest", "Curing", "Postharvest"],
    difficulty: "Intermediate",
    slug: "harvestcuring",
    hasCustomComponent: true
  },
  {
    id: 'lightningforyield',
    title: "Lighting for Maximum Yield: Optimizing Cannabis Growth",
    author: "Dr. Emily Nguyen",
    readTime: "12 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed6.webp",
    description: "Master the art of grow lighting to maximize your cannabis yields and quality. Learn about different light types, spectrums, and optimization techniques.",
    publishDate: "May 10, 2024",
    tags: ["Lighting", "Yield", "Technology"],
    difficulty: "Advanced",
    slug: "lightningforyield",
    hasCustomComponent: true
  },
  {
    id: 'soilvshydroponic',
    title: "Soil vs Hydroponic Systems: A Complete Comparison",
    author: "Sarah Rodriguez",
    readTime: "10 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed9.webp",
    description: "Compare soil and hydroponic growing methods to choose the best system for your needs. Understand the pros, cons, and requirements of each approach.",
    publishDate: "June 5, 2024",
    tags: ["Growing Systems", "Comparison", "Hydroponics"],
    difficulty: "Intermediate",
    slug: "soilvshydroponic",
    hasCustomComponent: true
  },
  {
    id: 'nutrient',
    title: "Organic vs Synthetic Nutrients: Which is Better?",
    author: "Sarah Rodriguez",
    readTime: "9 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed10.webp",
    description: "Compare the benefits and drawbacks of organic versus synthetic nutrients for cannabis cultivation. Make informed decisions about your feeding strategy.",
    publishDate: "May 20, 2024",
    tags: ["Nutrients", "Organic", "Synthetic"],
    difficulty: "Intermediate",
    slug: "nutrient",
    hasCustomComponent: true
  },

  // --- Terpenes & Science ---
  {
    id: 'terpene-guide',
    title: "Understanding Cannabis Terpenes: The Complete Guide",
    author: "Dr. Sarah Rodriguez",
    readTime: "8 min read",
    category: "Terpenes & Science",
    categorySlug: "terpenes",
    image: "/images/weed10.webp",
    description: "Understand how different terpene profiles affect cannabis effects and flavors. Explore the science behind cannabis aromas and their therapeutic benefits.",
    publishDate: "March 20, 2024",
    tags: ["Terpenes", "Science", "Aromas"],
    difficulty: "Intermediate",
    slug: "terpene-guide",
    hasCustomComponent: true
  },
  {
    id: 'myrcenevslimonene',
    title: "Myrcene vs Limonene: Understanding the Differences",
    author: "David Thompson",
    readTime: "6 min read",
    category: "Terpenes & Science",
    categorySlug: "terpenes",
    image: "/images/weed7.webp",
    description: "Compare two of the most important cannabis terpenes and their unique effects. Understand how myrcene and limonene contribute to different strain experiences.",
    publishDate: "April 15, 2024",
    tags: ["Terpenes", "Myrcene", "Limonene"],
    difficulty: "Intermediate",
    slug: "myrcenevslimonene",
    hasCustomComponent: true
  },
  {
    id: 'entourageeffect',
    title: 'The Entourage Effect: How Cannabis Compounds Work Together',
    author: 'Dr. Sarah Rodriguez',
    readTime: '11 min read',
    category: 'Terpenes & Science',
    categorySlug: 'terpenes',
    image: '/images/weed9.webp',
    description: 'Explore the entourage effect, where cannabinoids and terpenes synergize to enhance cannabis\'s therapeutic and sensory properties.',
    publishDate: 'May 25, 2025',
    tags: ['Terpenes', 'Entourage Effect', 'Science'],
    difficulty: 'Intermediate',
    slug: 'entourageeffect',
    hasCustomComponent: true
  },
  {
    id: 'preservinterpenes',
    title: 'Preserving Terpenes in Curing: Best Practices',
    author: 'Dr. Rachel Lee',
    readTime: '10 min read',
    category: 'Terpenes & Science',
    categorySlug: 'terpenes',
    image: '/images/weed1.webp',
    description: 'Learn how to preserve terpenes during curing to maintain cannabis aroma, flavor, and potency. Discover techniques to protect these volatile compounds.',
    publishDate: 'May 20, 2025',
    tags: ['Terpenes', 'Curing', 'Preservation'],
    difficulty: 'Intermediate',
    slug: 'preservinterpenes',
    hasCustomComponent: true
  },
  {
    id: 'terpenesprofiles',
    title: 'Terpene Profiles Explained: Unlocking Cannabis Aromas',
    author: 'Dr. Sarah Rodriguez',
    readTime: '10 min read',
    category: 'Terpenes & Science',
    categorySlug: 'terpenes',
    image: '/images/weed2.webp',
    description: 'Dive into the world of terpene profiles to understand how these compounds shape cannabis aromas, flavors, and effects, creating unique strain characteristics.',
    publishDate: 'May 10, 2025',
    tags: ['Terpenes', 'Profiles', 'Aromas'],
    difficulty: 'Intermediate',
    slug: 'terpenesprofiles',
    hasCustomComponent: true
  },

  // --- Health & Benefits ---
  {
    id: 'CBDpainmanagement',
    title: "CBD for Pain Management: A Comprehensive Guide",
    author: "Dr. Lisa Chen",
    readTime: "12 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed3.webp",
    description: "Learn how CBD can help manage different types of pain, from chronic conditions to acute injuries. Discover dosage guidelines and consumption methods.",
    publishDate: "May 10, 2024",
    tags: ["CBD", "Pain Management", "Medical"],
    difficulty: "Beginner",
    slug: "CBDpainmanagement",
    hasCustomComponent: true
  },
  {
    id: 'Microdosing-guide',
    title: "Microdosing: A Beginner's Guide to Cannabis",
    author: "Dr. Lisa Chen",
    readTime: "7 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed5.webp",
    description: "Learn the art of microdosing cannabis for therapeutic benefits without overwhelming psychoactive effects. Perfect for beginners and medical users.",
    publishDate: "April 15, 2024",
    tags: ["Microdosing", "Beginner", "Therapeutic"],
    difficulty: "Beginner",
    slug: "Microdosing-guide",
    hasCustomComponent: true
  },
  {
    id: 'CannabisSleep',
    title: "Cannabis and Sleep Quality: Best Strains & Methods",
    author: "Marcus Chen",
    readTime: "10 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed8.webp",
    description: "Discover which strains and consumption methods work best for improving sleep quality and duration. Learn about timing, dosage, and strain selection.",
    publishDate: "March 25, 2024",
    tags: ["Sleep", "Strains", "Wellness"],
    difficulty: "Beginner",
    slug: "CannabisSleep",
    hasCustomComponent: true
  },
  {
    id: 'AnxientyRelief',
    title: "Anxiety Relief Strains: Finding Calm with Cannabis",
    author: "Sarah Rodriguez",
    readTime: "9 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed11.webp",
    description: "Explore strains and tips for managing anxiety with cannabis. Learn about terpene profiles, cannabinoid ratios, and consumption methods for anxiety relief.",
    publishDate: "April 10, 2024",
    tags: ["Anxiety", "Strains", "Mental Health"],
    difficulty: "Beginner",
    slug: "AnxientyRelief",
    hasCustomComponent: true
  },

  // --- Tools & Equipment ---
  {
    id: 'vaporizer2024',
    title: "Vaporizer Buying Guide 2024: Top Picks & Reviews",
    author: "Equipment Team",
    readTime: "13 min read",
    category: "Tools & Equipment",
    categorySlug: "tools",
    image: "/images/weed4.webp",
    description: "Our comprehensive review of the best vaporizers available this year, from budget to premium options. Find the perfect device for your needs.",
    publishDate: "June 5, 2024",
    tags: ["Vaporizers", "Reviews", "Equipment"],
    difficulty: "Beginner",
    slug: "vaporizer2024",
    hasCustomComponent: true
  },
  {
    id: 'glassvsmetal',
    title: 'Glass vs Metal Pipes: Which is Right for You?',
    author: 'Alex Carter',
    readTime: '9 min read',
    category: 'Tools & Equipment',
    categorySlug: 'tools',
    image: '/images/weed6.webp',
    description: 'Compare glass and metal pipes to find the best option for your cannabis consumption, balancing flavor, durability, and portability.',
    publishDate: 'June 25, 2025',
    tags: ['Pipes', 'Glass', 'Metal'],
    difficulty: 'Intermediate',
    slug: 'glassvsmetal',
    hasCustomComponent: true
  },
  {
    id: 'growingequipment',
    title: 'Growing Equipment Reviews: Tools for Success',
    author: 'Alex Carter',
    readTime: '11 min read',
    category: 'Tools & Equipment',
    categorySlug: 'tools',
    image: '/images/weed8.webp',
    description: 'Review top cannabis growing equipment, from lights to ventilation, to optimize your cultivation setup for maximum yield and quality.',
    publishDate: 'June 30, 2025',
    tags: ['Equipment', 'Reviews', 'Growing'],
    difficulty: 'Intermediate',
    slug: 'growingequipment',
    hasCustomComponent: true
  },
  {
    id: 'storagesolutions',
    title: 'Storage Solutions Guide: Preserving Cannabis Quality',
    author: 'Alex Carter',
    readTime: '10 min read',
    category: 'Tools & Equipment',
    categorySlug: 'tools',
    image: '/images/weed9.webp',
    description: 'Discover the best storage solutions to maintain cannabis potency, flavor, and freshness, from jars to portable options.',
    publishDate: 'July 5, 2025',
    tags: ['Storage', 'Equipment', 'Preservation'],
    difficulty: 'Intermediate',
    slug: 'storagesolutions',
    hasCustomComponent: true
  }
]

export const popularTopics: PopularTopic[] = [
  {
    id: 'consumption-methods',
    title: "Consumption Methods",
    description: "Smoking, vaping, edibles, and more",
    icon: "Flame",
    gradient: "premium-gradient",
    color: "forest",
    articleCount: 15,
  },
  {
    id: 'strain-reviews',
    title: "Strain Reviews",
    description: "In-depth strain analysis and effects",
    icon: "Microscope",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    color: "purple",
    articleCount: 32,
  },
  {
    id: 'growing-tips',
    title: "Growing Tips",
    description: "Expert cultivation advice and tricks",
    icon: "BookOpen",
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    color: "emerald",
    articleCount: 28,
  },
  {
    id: 'product-reviews',
    title: "Product Reviews",
    description: "Honest reviews of cannabis products",
    icon: "Star",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    color: "amber",
    articleCount: 19,
  },
]

export const featuredContent: FeaturedContent = {
  hero: articles.find(article => article.featured) || articles[0],
  trending: articles.filter(article => article.trending).slice(0, 4),
  editorsPick: articles.filter(article => article.rating && article.rating >= 4.8).slice(0, 3)
}

// Helper functions
export const getArticlesByCategory = (categorySlug: string) => {
  return articles.filter(article => article.categorySlug === categorySlug)
}

export const getTrendingArticles = () => {
  return articles.filter(article => article.trending).slice(0, 6)
}

export const getLatestArticles = () => {
  return articles
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 6)
}

export const getArticleBySlug = (slug: string) => {
  return articles.find(article => article.slug === slug)
} 