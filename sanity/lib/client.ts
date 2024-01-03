import type { SanityClient } from '@sanity/client/stega';
import { createClient } from '@sanity/client/stega';

import {
	apiVersion,
	dataset,
	projectId,
	revalidateSecret,
	studioUrl,
	useCdn
} from '@/sanity/lib/api';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	// If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
	useCdn: revalidateSecret ? false : true,
	perspective: 'published',
	stega: {
		studioUrl,
		// logger: console,
	},
});

export function getClient(preview?: { token: string }): SanityClient {
	if (preview) {
		if (!preview.token) {
			throw new Error('You must provide a token to preview drafts');
		}
		return client.withConfig({
			token: preview.token,
			useCdn: false,
			ignoreBrowserTokenWarning: true,
			perspective: 'previewDrafts',
		});
	}
	return client;
}

export const getSanityImageConfig = () => getClient();

// export async function getSettings(client: SanityClient): Promise<Settings> {
//   return (await client.fetch(settingsQuery)) || {}
// }

// export async function getAllPosts(client: SanityClient): Promise<Post[]> {
//   return (await client.fetch(indexQuery)) || []
// }

// export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
//   const client = getClient()
//   const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
//   return slugs.map((slug) => ({ slug }))
// }

// export async function getPostBySlug(
//   client: SanityClient,
//   slug: string,
// ): Promise<Post> {
//   return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
// }

// export async function getPostAndMoreStories(
//   client: SanityClient,
//   slug: string,
// ): Promise<{ post: Post; morePosts: Post[] }> {
//   return await client.fetch(postAndMoreStoriesQuery, { slug })
// }