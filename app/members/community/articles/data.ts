import { Article, ArticleCategory } from './types';
import { Beaker } from 'lucide-react';

export const articleCategories: ArticleCategory[] = [
  {
    id: 1,
    name: 'Growing & Cultivation',
    slug: 'growing',
    description: 'Expert guides and tips for successful cannabis cultivation',
    icon: 'Leaf',
    color: 'emerald',
    articles: [
      {
        id: 1,
        title: 'The Complete Guide to Indoor Cannabis Cultivation',
        slug: 'indoor-cultivation-guide',
        category: 'growing',
        description: 'Master the art of indoor cannabis growing with our comprehensive guide covering everything from setup to harvest.',
        content: `<p className="text-lg">
          Indoor cannabis cultivation offers complete control over your growing environment, allowing for optimal conditions year-round. This guide covers everything you need to know to get started.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Setting Up Your Grow Space</h2>

        <p>
          Choose a suitable space with good ventilation and access to power. Consider factors like temperature control, humidity management, and security. A dedicated grow tent or room helps maintain optimal conditions.
        </p>

        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-emerald-400" />
            Essential Equipment
          </h3>
          <ul className="text-emerald-100 space-y-2">
            <li>• Grow lights (LED, HPS, or CMH)</li>
            <li>• Ventilation system</li>
            <li>• Temperature and humidity controls</li>
            <li>• Growing medium and containers</li>
            <li>• Nutrients and pH testing kit</li>
          </ul>
        </div>`,
        author: 'Marcus Chen',
        readTime: '15 min read',
        publishDate: 'March 15, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Indoor Growing', 'Setup Guide']
      },
      {
        id: 2,
        title: 'Harvest & Curing Techniques: Perfecting Your Buds',
        slug: 'harvest-curing',
        category: 'growing',
        description: 'Learn the best practices for harvesting and curing to preserve cannabis quality and potency.',
        content: `<p className="text-lg">
          Harvesting and curing cannabis properly is essential to preserve potency, flavor, and aroma. This guide covers timing, trimming techniques, and curing methods to ensure top-quality buds.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Understanding Harvest & Curing</h2>

        <p>
          Harvesting involves cutting the plant at the right time, while curing is the controlled drying and aging process to enhance flavor and smoothness. Both require precision to maximize quality and avoid degradation of cannabinoids and terpenes.
        </p>

        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-emerald-400" />
            The Science of Curing
          </h3>
          <p className="text-emerald-100">
            Curing breaks down chlorophyll and sugars, enhancing terpene profiles and reducing harshness. Controlled humidity (50-60%) and temperature (60-70°F) are critical to prevent mold and preserve potency.
          </p>
        </div>`,
        author: 'Dr. Rachel Lee',
        readTime: '11 min read',
        publishDate: 'April 25, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Harvest', 'Postharvest']
      },
      {
        id: 3,
        title: 'Lighting for Maximum Yield: Optimizing Cannabis Growth',
        slug: 'lighting-for-yield',
        category: 'growing',
        description: 'Master the art of grow lighting to maximize your cannabis yields and quality.',
        content: `<p className="text-lg">
          Lighting is one of the most critical factors in cannabis cultivation, influencing growth rates, yields, and plant health. This guide explores the types of grow lights, their spectrums, and how to optimize them for maximum yield.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Understanding Grow Lights</h2>

        <p>
          Grow lights mimic sunlight, providing the energy plants need for photosynthesis. The type, spectrum, and intensity of light affect vegetative growth, flowering, and cannabinoid production. Common options include LED, HPS, and CMH lights.
        </p>

        <div className="bg-gradient-to-r from-amber-950 to-amber-900 border border-amber-800 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-amber-400" />
            The Science of Light Spectrums
          </h3>
          <p className="text-amber-100">
            Blue light (400-500 nm) promotes vegetative growth, while red light (600-700 nm) encourages flowering. Full-spectrum lights combine both for optimal results across all stages.
          </p>
        </div>`,
        author: 'Dr. Emily Nguyen',
        readTime: '12 min read',
        publishDate: 'May 10, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Lighting', 'Technology']
      },
      {
        id: 4,
        title: 'Soil vs Hydroponic Systems: A Complete Comparison',
        slug: 'soil-vs-hydroponic',
        category: 'growing',
        description: 'Compare soil and hydroponic growing methods to choose the best system for your needs.',
        content: `<p className="text-lg">
          Choosing between soil and hydroponic growing systems is one of the most important decisions for cannabis cultivators. Each method has its advantages and challenges, affecting everything from yield to flavor profiles.
        </p>

        <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">Understanding the Differences</h2>

        <p>
          Soil growing is traditional and forgiving, while hydroponics offers precise control and faster growth. The choice depends on your experience level, available space, and desired outcomes.
        </p>

        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-800 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-emerald-400" />
            Key Considerations
          </h3>
          <ul className="text-emerald-100 space-y-2">
            <li>• Setup complexity and cost</li>
            <li>• Maintenance requirements</li>
            <li>• Growth speed and yield potential</li>
            <li>• Flavor and terpene profiles</li>
            <li>• Environmental impact</li>
          </ul>
        </div>`,
        author: 'Sarah Rodriguez',
        readTime: '10 min read',
        publishDate: 'June 5, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Growing Systems', 'Comparison']
      }
    ]
  },
  {
    id: 2,
    name: 'Terpenes & Science',
    slug: 'terpenes',
    description: 'Explore the science behind cannabis terpenes and their effects',
    icon: 'Beaker',
    color: 'purple',
    articles: [
      {
        id: 5,
        title: 'Terpene Profiles Explained: A Complete Guide',
        slug: 'terpene-profiles',
        category: 'terpenes',
        description: 'Understand how different terpene profiles affect cannabis effects and flavors.',
        content: 'Full article content here...',
        author: 'Sarah Rodriguez',
        readTime: '8 min read',
        publishDate: 'March 20, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Terpenes', 'Science']
      },
      {
        id: 6,
        title: 'Myrcene vs Limonene: Understanding the Differences',
        slug: 'myrcene-vs-limonene',
        category: 'terpenes',
        description: 'Compare two of the most common terpenes and their unique effects.',
        content: 'Full article content here...',
        author: 'David Thompson',
        readTime: '7 min read',
        publishDate: 'April 15, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Terpenes', 'Comparison']
      },
      {
        id: 7,
        title: 'The Science of Cannabis Aromas',
        slug: 'cannabis-aromas',
        category: 'terpenes',
        description: 'Discover how terpenes create the complex aromas in different cannabis strains.',
        content: 'Full article content here...',
        author: 'Dr. Lisa Chen',
        readTime: '9 min read',
        publishDate: 'May 5, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Aromas', 'Science']
      },
      {
        id: 8,
        title: 'Terpene Preservation Techniques',
        slug: 'terpene-preservation',
        category: 'terpenes',
        description: 'Learn how to preserve terpenes during growing, harvesting, and storage.',
        content: 'Full article content here...',
        author: 'Marcus Chen',
        readTime: '10 min read',
        publishDate: 'June 1, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Preservation', 'Techniques']
      }
    ]
  },
  {
    id: 3,
    name: 'Health & Benefits',
    slug: 'health',
    description: 'Explore the health benefits and medical applications of cannabis',
    icon: 'Heart',
    color: 'rose',
    articles: [
      {
        id: 9,
        title: 'CBD for Pain Management: A Comprehensive Guide',
        slug: 'cbd-pain-management',
        category: 'health',
        description: 'Learn how CBD can help manage different types of pain effectively.',
        content: 'Full article content here...',
        author: 'Dr. Lisa Chen',
        readTime: '12 min read',
        publishDate: 'March 25, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['CBD', 'Pain Management']
      },
      {
        id: 10,
        title: 'Cannabis and Sleep Quality: What You Need to Know',
        slug: 'cannabis-sleep',
        category: 'health',
        description: 'Discover how cannabis can improve sleep quality and treat insomnia.',
        content: 'Full article content here...',
        author: 'Marcus Chen',
        readTime: '9 min read',
        publishDate: 'April 20, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Sleep', 'Health']
      },
      {
        id: 11,
        title: 'THC vs CBD: Understanding the Differences',
        slug: 'thc-vs-cbd',
        category: 'health',
        description: 'Compare the effects and benefits of THC and CBD for different conditions.',
        content: 'Full article content here...',
        author: 'Dr. Emily Nguyen',
        readTime: '11 min read',
        publishDate: 'May 15, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['THC', 'CBD']
      },
      {
        id: 12,
        title: 'Cannabis for Anxiety: A Research Review',
        slug: 'cannabis-anxiety',
        category: 'health',
        description: 'Review the latest research on cannabis use for anxiety management.',
        content: 'Full article content here...',
        author: 'Sarah Rodriguez',
        readTime: '10 min read',
        publishDate: 'June 10, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Anxiety', 'Research']
      }
    ]
  },
  {
    id: 4,
    name: 'Tools & Equipment',
    slug: 'tools',
    description: 'Reviews and guides for cannabis cultivation and consumption tools',
    icon: 'Tool',
    color: 'amber',
    articles: [
      {
        id: 13,
        title: 'Vaporizer Buying Guide 2024',
        slug: 'vaporizer-guide',
        category: 'tools',
        description: 'Find the perfect vaporizer for your needs with our comprehensive buying guide.',
        content: 'Full article content here...',
        author: 'Equipment Team',
        readTime: '13 min read',
        publishDate: 'March 30, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Vaporizers', 'Buying Guide']
      },
      {
        id: 14,
        title: 'Glass vs Metal Pipes: Which is Right for You?',
        slug: 'glass-vs-metal',
        category: 'tools',
        description: 'Compare glass and metal pipes to make an informed choice for your smoking needs.',
        content: 'Full article content here...',
        author: 'Alex Carter',
        readTime: '8 min read',
        publishDate: 'April 25, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Pipes', 'Comparison']
      },
      {
        id: 15,
        title: 'Essential Growing Tools for Beginners',
        slug: 'growing-tools',
        category: 'tools',
        description: 'Discover the must-have tools for starting your cannabis cultivation journey.',
        content: 'Full article content here...',
        author: 'Marcus Chen',
        readTime: '10 min read',
        publishDate: 'May 20, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Tools', 'Beginners']
      },
      {
        id: 16,
        title: 'Advanced Growing Equipment Guide',
        slug: 'advanced-equipment',
        category: 'tools',
        description: 'Explore advanced equipment options for serious cannabis cultivators.',
        content: 'Full article content here...',
        author: 'Dr. Emily Nguyen',
        readTime: '12 min read',
        publishDate: 'June 15, 2024',
        image: '/placeholder.svg?height=400&width=800',
        tags: ['Equipment', 'Advanced']
      }
    ]
  }
]; 