import Head from 'next/head';

import { urlForImage } from '@/sanity/lib/image';
import { Post, Settings } from '@/types/sanity';

import BlogMeta from './BlogMeta';

export interface PostPageHeadProps {
  settings: Settings
  post: Post
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
	const title = 'Blog';
	return (
		<Head>
			<title>{post.title ? `${post.title} | ${title}` : title}</title>
			<BlogMeta />
			{post.coverImage?.asset?._ref && (
				<meta
					property="og:image"
					content={urlForImage(post.coverImage)
						.width(1200)
						.height(627)
						.fit('crop')
						.url()}
				/>
			)}
		</Head>
	);
}
