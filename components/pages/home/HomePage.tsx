import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import Link from 'next/link';

import { ProjectListItem } from '@/components/pages/home/ProjectListItem';
import { Header } from '@/components/shared/Header';
import { resolveHref } from '@/sanity/lib/utils';
import type { HomePagePayload } from '@/types/sanity';

import { PostListItem } from '../posts/PostListItem';

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
	// Default to an empty object to allow previews on non-existent documents
	const { overview = [], showcaseProjects = [], title = '', blogPosts } = data ?? {};

	return (
		<div className="space-y-20">
			{/* Header */}
			{title && <Header centered title={title} description={overview} />}
			{/* Showcase projects */}
			{showcaseProjects && showcaseProjects.length > 0 && (
				<div className="mx-auto max-w-[100rem]">
					{showcaseProjects.map((project, key) => {
						const href = resolveHref(project._type, project.slug);
						if (!href) {
							return null;
						}
						return (
							<Link
								key={key}
								href={href}
								data-sanity={encodeDataAttribute?.([
									'showcaseProjects',
									key,
									'slug',
								])}
							>
								<ProjectListItem
									gradient='bg-gradient-to-r from-blue-400 to-blue-500'
									project={project} odd={key % 2} />
							</Link>
						);
					})}
				</div>
			)}

			{/* blog posts */}
			{blogPosts && blogPosts.length > 0 && (
				<div className="mx-auto max-w-[100rem]">
					{blogPosts.map((post, key) => {
						const href = resolveHref('post', post.slug);
						if (!href) {
							return null;
						}
						return (
							<Link
								key={key}
								href={href}
								data-sanity={encodeDataAttribute?.(['blogPosts', key, 'slug'])}
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

export default HomePage;
