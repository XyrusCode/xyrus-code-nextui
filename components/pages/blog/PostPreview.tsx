import Link from 'next/link';

import type { Post } from '@/types/sanity';

import Avatar from './AuthorAvatar';
import CoverImage from './CoverImage';
import Date from './PostDate';

export default function PostPreview({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}: Omit<Post, '_id'>) {
	return (
		<div>
			<div className="mb-5">
				<CoverImage
					slug={slug}
					title={title}
					image={coverImage}
					priority={false}
				/>
			</div>
			<h3 className="mb-3 text-3xl leading-snug">
				<Link href={`/posts/${slug}`} className="hover:underline">
					{title}
				</Link>
			</h3>
			<div className="mb-4 text-lg">
				<Date dateString={date} />
			</div>
			{excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
			{author && <Avatar name={author.name} picture={author.picture} title={''} />}
		</div>
	);
}
