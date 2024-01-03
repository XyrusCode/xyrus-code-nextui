import type { PortableTextBlock } from '@portabletext/types';
import type { Image } from 'sanity';

export type MenuItem = {
  _type: string
  slug?: string
  title?: string
};

export type MilestoneItem = {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
};

export type Author = {
  name?: string
  picture?: any
  title: string
};

export type Post = {
  _id: string
  title: string
  coverImage?: any
  date: string
  _updatedAt?: string
  excerpt?: string
  author: Author
  slug: string
  content?: any
  tags?: string[]
};

export type Settings = {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
};

export type ShowcaseProject = {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
};

// Page payloads

export type HomePagePayload = {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  blogPosts?: Post[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
};

export type BlogPagePayload = {
    title: string
    overview?: PortableTextBlock[]
    blogPosts: Post[]
};

export type ProjectPagePayload = {
  title: string
  overview?: PortableTextBlock[]
  showcaseProjects: ShowcaseProject[]
};

export type PagePayload = {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
};

export type PostPayload = {
  _id: string
  title: string
  coverImage?: any
  date: string
  _updatedAt?: string
  excerpt: PortableTextBlock[]
  author: Author
  slug: string
  content?: PortableTextBlock[]
  tags: string[]
};

export type ProjectPayload = {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
};

export type SettingsPayload = {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
};

