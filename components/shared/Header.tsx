import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';

import { CustomPortableText } from '@/components//shared/CustomPortableText';

interface HeaderProps {
  centered?: boolean;
  description?: PortableTextBlock[];
  title?: string;
}
export function Header(props: HeaderProps) {
	const { title, description, centered = false } = props;
	if (!description && !title) {
		return null;
	}
	return (
		<div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
			{/* Title */}
			{title && (
				<div className="text-3xl font-extrabold tracking-tight md:text-5xl text-gray-900 dark:text-white">
					{title}
				</div>
			)}

			{/* Description */}
			{description && (
				<div className="mt-4 font-serif text-xl text-gray-900 dark:text-white md:text-2xl">
					<CustomPortableText
						paragraphClasses="text-md md:text-xl"
						value={description}
					/>
				</div>
			)}
		</div>
	);
}
