# Article Management Guide

## Overview

Your cannabis community app now has a **hybrid article system** that combines:
1. **Data-driven metadata** (for listings, categories, search)
2. **Component-based content** (for rich, interactive articles)

## How It Works

### 1. Article Data (`app/members/community/data/education.ts`)

This file contains all article metadata:
- Title, author, description
- Category, difficulty, tags
- Images, read time, ratings
- **Slug** (URL identifier)
- **hasCustomComponent** flag

### 2. Article Content

Articles can have content in two ways:

#### A. Custom Components (Recommended for rich content)
- Full React components with interactive elements
- Located in category-specific folders
- Examples: `growing/harvestcuring.tsx`, `health-benefit/AnxientyRelief.tsx`

#### B. Data-Driven Content (Fallback)
- Generated from article metadata
- Basic formatting with category-specific sections
- Used when no custom component exists

### 3. Content Manager (`content-manager.tsx`)

This component:
- Checks if a custom component exists for the article slug
- Renders the custom component if found
- Falls back to data-driven content if not

## Adding New Articles

### Step 1: Add Article Metadata

In `app/members/community/data/education.ts`, add a new article to the `articles` array:

```typescript
{
  id: 'unique-article-id',
  title: "Your Article Title",
  author: "Author Name",
  readTime: "10 min read",
  category: "Growing & Cultivation",
  categorySlug: "growing", // Must match category ID
  image: "/images/your-image.jpg",
  description: "Brief description of the article",
  publishDate: "January 1, 2024",
  tags: ["Tag1", "Tag2", "Tag3"],
  difficulty: "Beginner", // or "Intermediate" or "Advanced"
  views: 1000,
  rating: 4.5,
  featured: false,
  trending: false,
  slug: "your-article-slug", // URL identifier
  hasCustomComponent: true // Set to true if you're creating a custom component
}
```

### Step 2: Create Custom Component (Optional but Recommended)

1. **Choose the right folder** based on category:
   - `growing/` - Growing & Cultivation articles
   - `health-benefit/` - Health & Benefits articles
   - `terpenes/` - Terpenes & Science articles
   - `tools-eqiuipment/` - Tools & Equipment articles

2. **Create the component file** (e.g., `growing/your-article.tsx`):

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  Beaker,
} from "lucide-react"

export default function YourArticle() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            <Link href="/members/community">
              <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Community
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Your article content goes here */}
        <div className="prose prose-invert max-w-none">
          <div className="text-sage-300 leading-relaxed space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Your Article Title
            </h1>
            
            <p className="text-lg">
              Your article content goes here...
            </p>
            
            {/* Add more content sections */}
          </div>
        </div>
      </div>
    </div>
  )
}
```

3. **Register the component** in `content-manager.tsx`:

```typescript
// Add import
import YourArticle from "./growing/your-article"

// Add to customComponents mapping
const customComponents: Record<string, React.ComponentType> = {
  // ... existing components
  "your-article-slug": YourArticle, // Must match the slug in education.ts
}
```

### Step 3: Add Images (Optional)

Place article images in `public/images/` and reference them in the article metadata.

## Article Structure Best Practices

### 1. Header Section
- Category badges
- Title (large, bold)
- Description
- Author info with avatar
- Meta data (read time, publish date, views, rating)
- Action buttons (share, save, like)
- Tags

### 2. Featured Image
- High-quality, relevant image
- Gradient overlay for text readability

### 3. Content Sections
- Introduction paragraph
- Main sections with headings
- Highlighted information boxes
- Data visualizations (progress bars, charts)
- Comparison tables/cards
- Tips and best practices
- Author bio

### 4. Interactive Elements
- Progress bars for ratings/scores
- Cards for comparisons
- Badges for categories and difficulty
- Buttons for actions

## Content Guidelines

### Writing Style
- **Professional but accessible** - Avoid overly technical jargon
- **Evidence-based** - Include scientific references when possible
- **Practical** - Focus on actionable advice
- **Engaging** - Use examples, case studies, and real-world applications

### Visual Design
- **Consistent branding** - Use the established color scheme
- **Readable typography** - Good contrast and spacing
- **Responsive design** - Works on all screen sizes
- **Interactive elements** - Progress bars, cards, badges

### SEO Considerations
- **Descriptive titles** - Include relevant keywords
- **Meta descriptions** - Compelling summaries
- **Structured content** - Clear headings and sections
- **Internal linking** - Link to related articles

## Managing Existing Articles

### To Edit an Article:
1. Find the component file in the appropriate category folder
2. Edit the content directly in the component
3. Update metadata in `education.ts` if needed

### To Add a New Category:
1. Add category to `articleCategories` array in `education.ts`
2. Create a new folder for the category
3. Update the content manager with category-specific content

### To Delete an Article:
1. Remove from `articles` array in `education.ts`
2. Delete the component file if it exists
3. Remove from `customComponents` mapping in `content-manager.tsx`

## Troubleshooting

### Article Not Showing
- Check that the slug in `education.ts` matches the component mapping
- Verify the component file exists and is properly exported
- Check for import errors in `content-manager.tsx`

### Content Not Loading
- Ensure the component is properly registered in `customComponents`
- Check for syntax errors in the component file
- Verify all imports are correct

### Styling Issues
- Use the established design system (colors, spacing, typography)
- Follow the existing component patterns
- Test on different screen sizes

## Example: Complete Article Workflow

1. **Plan the article** - Topic, structure, key points
2. **Add metadata** - Update `education.ts` with article info
3. **Create component** - Build the full article component
4. **Add images** - Place in `public/images/` and reference
5. **Register component** - Add to `content-manager.tsx`
6. **Test** - Verify it displays correctly
7. **Publish** - The article is now live!

This system gives you the flexibility to create rich, interactive articles while maintaining a consistent user experience and easy content management. 