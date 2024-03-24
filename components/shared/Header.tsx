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
			<div className="mx-auto max-w-2xl">
				<div className="text-center">
					{/* Title */}
					{title && (
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
							{title}
						</h1>)}


					{/* Description */}
					{description && (

						<CustomPortableText
							paragraphClasses="mt-6 text-lg leading-8"
							value={description}
						/>)}

				</div>
			</div>

		</div>
	);
}
