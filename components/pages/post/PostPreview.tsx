'use client';

import { type QueryResponseInitial } from '@sanity/react-loader';

import { postBySlugQuery } from '@/sanity/lib/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { PostPayload } from '@/types/sanity';

import Post from './Post';

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<PostPayload | null>
}

export default function PagePreview(props: Props) {
	const { params, initial } = props;
	const { data } = useQuery<PostPayload | null>(postBySlugQuery, params, {
		initial,
	});

	return <Post data={data!} />;
}
