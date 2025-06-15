export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  author: string;
  readTime: string;
  publishDate: string;
  image: string;
  tags: string[];
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  articles: Article[];
} 