// import { toPlainText } from '@portabletext/react'
import { toPlainText } from '@portabletext/react';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Post } from '@/components/pages/post/Post';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';
import { loadPost } from '@/sanity/loader/loadQuery';
const PostPreview = dynamic(() => import('@/components/pages/post/PostPreview'));

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { data: page } = await loadPost(params.slug);

	return {
		title: page?.title,
		description: page?.excerpt
			? toPlainText(page.excerpt)
			: (await parent).description,
	};
}

export function generateStaticParams() {
	return generateStaticSlugs('page');
}

export default async function PageSlugRoute({ params }: Props) {
	const initial = await loadPost(params.slug);

	if (draftMode().isEnabled) {
		return <PostPreview params={params} initial={initial} />;
	}

	if (!initial.data) {
		notFound();
	}

	return <Post data={initial.data} />;
}
