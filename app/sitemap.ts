// import { getBlogPosts } from '@/lib/db/blog';

export default async function sitemap() {
	// let blogs = getBlogPosts().map((post) => ({
	// 	url: `https://xyruscode.com.ng/posts/${post.slug}`,
	// 	lastModified: post.metadata.publishedAt,
	// }));

	let routes = ['', '/about', '/guestbook', '/posts', '/projects'].map((route) => ({
		url: `https://xyruscode.com.ng${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	// return [...routes, ...blogs];
	return [...routes];
}
