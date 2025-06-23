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
  {
    id: 'indoor-cultivation-guide',
    title: "The Complete Guide to Indoor Cannabis Cultivation",
    author: "Marcus Chen",
    readTime: "15 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/indoor.jpg",
    description: "Master the art of indoor growing with our comprehensive guide covering everything from setup to harvest. Learn the secrets that our award-winning growers use to produce premium cannabis.",
    publishDate: "March 15, 2024",
    tags: ["Indoor Growing", "Setup Guide", "Expert Tips"],
    difficulty: "Advanced",
    views: 15420,
    rating: 4.8,
    featured: true,
    trending: true,
    slug: "indoor-cultivation-guide"
  },
  {
    id: 'harvest-curing-techniques',
    title: "Harvest & Curing Techniques: Perfecting Your Buds",
    author: "Dr. Rachel Lee",
    readTime: "11 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed1.jpg",
    description: "Learn the best practices for harvesting and curing to preserve cannabis quality and potency. Discover timing, trimming techniques, and curing methods for optimal results.",
    publishDate: "April 25, 2024",
    tags: ["Harvest", "Curing", "Postharvest"],
    difficulty: "Intermediate",
    views: 12850,
    rating: 4.9,
    trending: true,
    slug: "harvest-curing-techniques"
  },
  {
    id: 'terpene-profiles-explained',
    title: "Terpene Profiles Explained: A Complete Guide",
    author: "Sarah Rodriguez",
    readTime: "8 min read",
    category: "Terpenes & Science",
    categorySlug: "terpenes",
    image: "/images/weed2.jpg",
    description: "Understand how different terpene profiles affect cannabis effects and flavors. Explore the science behind cannabis aromas and their therapeutic benefits.",
    publishDate: "March 20, 2024",
    tags: ["Terpenes", "Science", "Aromas"],
    difficulty: "Intermediate",
    views: 9870,
    rating: 4.7,
    slug: "terpene-profiles-explained"
  },
  {
    id: 'cbd-pain-management',
    title: "CBD for Pain Management: A Comprehensive Guide",
    author: "Dr. Lisa Chen",
    readTime: "12 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed3.jpg",
    description: "Learn how CBD can help manage different types of pain, from chronic conditions to acute injuries. Discover dosage guidelines and consumption methods.",
    publishDate: "May 10, 2024",
    tags: ["CBD", "Pain Management", "Medical"],
    difficulty: "Beginner",
    views: 18750,
    rating: 4.8,
    trending: true,
    slug: "cbd-pain-management"
  },
  {
    id: 'vaporizer-guide-2024',
    title: "Vaporizer Buying Guide 2024: Top Picks & Reviews",
    author: "Equipment Team",
    readTime: "13 min read",
    category: "Tools & Equipment",
    categorySlug: "tools",
    image: "/images/weed4.jpg",
    description: "Our comprehensive review of the best vaporizers available this year, from budget to premium options. Find the perfect device for your needs.",
    publishDate: "June 5, 2024",
    tags: ["Vaporizers", "Reviews", "Equipment"],
    difficulty: "Beginner",
    views: 11230,
    rating: 4.6,
    slug: "vaporizer-guide-2024"
  },
  {
    id: 'microdosing-guide',
    title: "Microdosing: A Beginner's Guide to Cannabis",
    author: "Dr. Lisa Chen",
    readTime: "7 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed5.jpg",
    description: "Learn the art of microdosing cannabis for therapeutic benefits without overwhelming psychoactive effects. Perfect for beginners and medical users.",
    publishDate: "April 15, 2024",
    tags: ["Microdosing", "Beginner", "Therapeutic"],
    difficulty: "Beginner",
    views: 15680,
    rating: 4.9,
    trending: true,
    slug: "microdosing-guide"
  },
  {
    id: 'lighting-maximum-yield',
    title: "Lighting for Maximum Yield: Optimizing Cannabis Growth",
    author: "Dr. Emily Nguyen",
    readTime: "12 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed6.jpg",
    description: "Master the art of grow lighting to maximize your cannabis yields and quality. Learn about different light types, spectrums, and optimization techniques.",
    publishDate: "May 10, 2024",
    tags: ["Lighting", "Yield", "Technology"],
    difficulty: "Advanced",
    views: 8920,
    rating: 4.7,
    slug: "lighting-maximum-yield"
  },
  {
    id: 'myrcene-vs-limonene',
    title: "Myrcene vs Limonene: Understanding the Differences",
    author: "David Thompson",
    readTime: "6 min read",
    category: "Terpenes & Science",
    categorySlug: "terpenes",
    image: "/images/weed7.jpg",
    description: "Compare two of the most important cannabis terpenes and their unique effects. Understand how myrcene and limonene contribute to different strain experiences.",
    publishDate: "April 15, 2024",
    tags: ["Terpenes", "Myrcene", "Limonene"],
    difficulty: "Intermediate",
    views: 7430,
    rating: 4.5,
    slug: "myrcene-vs-limonene"
  },
  {
    id: 'cannabis-sleep-quality',
    title: "Cannabis and Sleep Quality: Best Strains & Methods",
    author: "Marcus Chen",
    readTime: "10 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed8.jpg",
    description: "Discover which strains and consumption methods work best for improving sleep quality and duration. Learn about timing, dosage, and strain selection.",
    publishDate: "March 25, 2024",
    tags: ["Sleep", "Strains", "Wellness"],
    difficulty: "Beginner",
    views: 13450,
    rating: 4.8,
    trending: true,
    slug: "cannabis-sleep-quality"
  },
  {
    id: 'soil-vs-hydroponic',
    title: "Soil vs Hydroponic Systems: A Complete Comparison",
    author: "Sarah Rodriguez",
    readTime: "10 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed9.jpg",
    description: "Compare soil and hydroponic growing methods to choose the best system for your needs. Understand the pros, cons, and requirements of each approach.",
    publishDate: "June 5, 2024",
    tags: ["Growing Systems", "Comparison", "Hydroponics"],
    difficulty: "Intermediate",
    views: 6780,
    rating: 4.6,
    slug: "soil-vs-hydroponic"
  },
  {
    id: 'organic-vs-synthetic-nutrients',
    title: "Organic vs Synthetic Nutrients: Which is Better?",
    author: "Sarah Rodriguez",
    readTime: "9 min read",
    category: "Growing & Cultivation",
    categorySlug: "growing",
    image: "/images/weed10.jpg",
    description: "Compare the benefits and drawbacks of organic versus synthetic nutrients for cannabis cultivation. Make informed decisions about your feeding strategy.",
    publishDate: "May 20, 2024",
    tags: ["Nutrients", "Organic", "Synthetic"],
    difficulty: "Intermediate",
    views: 5670,
    rating: 4.4,
    slug: "organic-vs-synthetic-nutrients"
  },
  {
    id: 'anxiety-relief-strains',
    title: "Anxiety Relief Strains: Finding Your Perfect Match",
    author: "Sarah Rodriguez",
    readTime: "9 min read",
    category: "Health & Benefits",
    categorySlug: "health",
    image: "/images/weed11.jpg",
    description: "Explore strains and tips for managing anxiety with cannabis. Learn about terpene profiles, cannabinoid ratios, and consumption methods for anxiety relief.",
    publishDate: "April 10, 2024",
    tags: ["Anxiety", "Strains", "Mental Health"],
    difficulty: "Beginner",
    views: 12340,
    rating: 4.7,
    slug: "anxiety-relief-strains"
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