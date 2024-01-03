import type { Post } from '@/types/sanity';

import Avatar from './AuthorAvatar';
import CoverImage from './CoverImage';
import Date from './PostDate';
import PostTitle from './PostTitle';

export default function PostHeader(
	props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
	const { title, coverImage, date, author, slug } = props;
	return (
		<>
			<PostTitle>{title}</PostTitle>
			<div className="hidden md:mb-12 md:block">
				{author && <Avatar name={author.name} picture={author.picture} title={''} />}
			</div>
			<div className="mb-8 sm:mx-0 md:mb-16">
				<CoverImage title={title} image={coverImage} priority slug={slug} />
			</div>
			<div className="mx-auto max-w-2xl">
				<div className="mb-6 block md:hidden">
					{author && <Avatar name={author.name} picture={author.picture} title={''} />}
				</div>
				<div className="mb-6 text-lg">
					<Date dateString={date} />
				</div>
			</div>
		</>
	);
}
