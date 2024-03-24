import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import Link from 'next/link';
// import NewsletterForm from 'pliny/ui/NewsletterForm';
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
		<>
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

					<div className="py-24 sm:py-32 border-black rounded-lg">
						<div className="mx-auto max-w-7xl px-6 lg:px-8">
							<div className="mx-auto max-w-2xl lg:mx-0">
								<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
								<p className="mt-4 text-gray-500">
									Thoughts, stories and ideas.
								</p>
							</div>
							<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
								{blogPosts.map((post, key) => {
									const href = resolveHref('post', post.slug);
									if (!href) {
										return null;
									}

									return (
										<article key={post._id} className="flex max-w-xl flex-col items-start justify-between">
											<div className="flex items-center gap-x-4 text-xs">
												<time dateTime={''} className="text-gray-500">
													{post._updatedAt}
												</time>
												{post.tags && post.tags.map((tag) => (
													<a
														href={tag}
														className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
													>
														{tag}
													</a>
												))}
											</div>
											<div className="group relative">
												<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
													<Link
														key={key}
														href={href}
														data-sanity={encodeDataAttribute?.(['blogPosts', key, 'slug'])}
													>
														<span className="absolute inset-0" />
														{post.title}
													</Link>
												</h3>
												<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
											</div>
											<div className="relative mt-8 flex items-center gap-x-4">
												<img src={post?.author?.picture} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
												<div className="text-sm leading-6">
													<p className="font-semibold text-gray-900">

													</p>
													<p className="text-gray-600">{post?.author?.title}</p>
												</div>
											</div>
										</article>
									);
								}
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			{/* <NewsletterForm /> */}
		</>
	);
}

export default HomePage;
