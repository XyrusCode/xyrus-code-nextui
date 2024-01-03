import { User } from '@nextui-org/react';
import dayjs from 'dayjs';
import Image from 'next/image';

import { CustomPortableText } from '@/components/shared/CustomPortableText';
import { Header } from '@/components/shared/Header';
import { urlForImage } from '@/sanity/lib/image';
import type { PostPayload } from '@/types/sanity';
import type { Author } from '@/types/sanity';

export interface PostProps {
  data: PostPayload | null;
}

type AuthorAvatarProps = {
	author: Author;
}
export const AuthorAvatar = ({author}: AuthorAvatarProps) => {
	const { name, picture, title } = author;
	const src = picture?.asset?._ref
		? urlForImage(picture).height(96).width(96).fit('crop').url()
		: 'https://source.unsplash.com/96x96/?face';
	return (
		<User
			name={name}
			description={title}
			avatarProps={{
				src: src,
				alt: picture?.alt ?? name,
				size: 'md',
			}}
			className="rounded-full"
		/>
			
	);
};

export function Post({ data }: PostProps) {
	// Default to an empty object to allow previews on non-existent documents
	const { content, excerpt, title, tags, author, date } = data ?? {};

	return (
		<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
			<div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
				<article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
					<header className="mb-4 lg:mb-6 not-format">
						<address className="flex items-center mb-6 not-italic">
							<div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
								<div>
									{author && (<AuthorAvatar author={author} />)}
									<p className="text-base text-gray-500 dark:text-gray-400">
										{dayjs(date).format('MMMM D, YYYY')}
									</p>
								</div>
							</div>
						</address>
						<h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
							{title}
						</h1>
					</header>
					{/* Body */}
					{content && (
						<CustomPortableText
							paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
							value={content}
						/>
					)}
					{tags && (
						<div className="flex flex-wrap">
							{tags.map((tag, index) => (
								<div
									key={index}
									className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md mr-2 mb-2"
								>
									{tag}
								</div>
							))}
						</div>
					)}
				</article>
			</div>
		</main>
	// <div>
	// 	<div className="mb-14">
	// 		{/* Header */}
	// 		<Header title={title} description={excerpt} />

	// 	</div>
	// 	<div className="absolute left-0 w-screen border-t" />
	// </div>
	);
}

export default Post;
