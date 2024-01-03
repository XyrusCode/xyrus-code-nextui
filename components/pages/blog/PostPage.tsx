import { notFound } from 'next/navigation';

import type { Post, Settings } from '@/types/sanity';

import Container from './BlogContainer';
import BlogHeader from './BlogHeader';
import Layout from './BlogLayout';
import MoreStories from './MoreStories';
import PostBody from './PostBody';
import PostHeader from './PostHeader';
import PostPageHead from './PostPageHead';
import PostTitle from './PostTitle';
import SectionSeparator from './SectionSeparator';

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: Post[]
  settings: Settings
}

const NO_POSTS: Post[] = [];

export default function PostPage(props: PostPageProps) {
	const { preview, loading, morePosts = NO_POSTS, post, settings } = props;

	const slug = post?.slug;

	if (!slug && !preview) {
		notFound();
	}

	return (
		<>
			<PostPageHead settings={settings} post={post} />

			<Layout preview={preview ?? false} loading={loading}>
				<Container>
					<BlogHeader title={'Blog'} level={2} />
					{preview && !post ? (
						<PostTitle>Loading…</PostTitle>
					) : (
						<>
							<article>
								<PostHeader
									title={post.title}
									coverImage={post.coverImage}
									date={post.date}
									author={post.author}
									slug={post.slug}
								/>
								<PostBody content={post.content} />
							</article>
							<SectionSeparator />
							{morePosts?.length > 0 && <MoreStories posts={morePosts} />}
						</>
					)}
				</Container>
			</Layout>
		</>
	);
}
