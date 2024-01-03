import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import Link from 'next/link';

import { PostListItem } from '@/components/pages/posts/PostListItem';
import { Header } from '@/components/shared/Header';
import { resolveHref } from '@/sanity/lib/utils';
import type { BlogPagePayload } from '@/types/sanity';

export interface BlogPageProps {
  data: BlogPagePayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function BlogPage({ data, encodeDataAttribute }: BlogPageProps) {
	// Default to an empty object to allow previews on non-existent documents
	const { title, overview, blogPosts } = data ?? {};

	return (
		<div className="space-y-20">
			{/* Header */}
			{<Header centered title={title} description={overview} />}
			{/* Showcase blog posts */}
			{blogPosts && blogPosts.length > 0 && (
				<div className="mx-auto max-w-[100rem] rounded-md border">
					{blogPosts.map((post, key) => {
						const href = resolveHref('post', post.slug);
						if (!href) {
							return null;
						}
						return (
							<Link
								key={key}
								href={href}
								data-sanity={encodeDataAttribute?.([
									'blogPosts',
									key,
									'slug',
								])}
							>
								<PostListItem post={post} odd={key % 2} />
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default BlogPage;
