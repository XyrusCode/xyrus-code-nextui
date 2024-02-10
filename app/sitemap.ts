// import { getBlogPosts } from '@/lib/db/blog';
import { MetadataRoute } from 'next';
import siteMetadata from '@/data/siteMetadata';

export default function sitemap(): MetadataRoute.Sitemap {
  // let blogs = getBlogPosts().map((post) => ({
  // 	url: `https://xyruscode.com.ng/posts/${post.slug}`,
  // 	lastModified: post.metadata.publishedAt,
  // }));
  const siteUrl = siteMetadata.siteUrl;

  //   const blogRoutes = allBlogs
  //     .filter((post) => !post.draft)
  //     .map((post) => ({
  //       url: `${siteUrl}/${post.path}`,
  //       lastModified: post.lastmod || post.date,
  //     }));

  const routes = ['', 'about', 'posts', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  //   return [...routes, ...blogRoutes];

  // return [...routes, ...blogs];
  return [...routes];
}
