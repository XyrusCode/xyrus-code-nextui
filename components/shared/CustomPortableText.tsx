import { Code } from '@nextui-org/react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Image } from 'sanity';

import ImageBox from '@/components/shared/ImageBox';
import { TimelineSection } from '@/components/shared/TimelineSection';

import CodeBlock, { Code as CodeType } from './CodeBlock';

export function CustomPortableText({
	paragraphClasses,
	value,
}: {
	paragraphClasses?: string;
	value: PortableTextBlock[];
}) {
	const components: PortableTextComponents = {
		block: {
			normal: ({ children }) => {
				return <p className={`text-gray-900 dark:text-white ${paragraphClasses}`}>{children}</p>;
			},
		},
		marks: {
			link: ({ children, value }) => {
				return (
					<a
						className="underline transition hover:opacity-50"
						href={value?.href}
						rel="noreferrer noopener"
					>
						{children}
					</a>
				);
			},
			code: ({ text }) => {
				return <Code>{text}</Code>;
			},
		},
		types: {
			myCodeField: ({ value }: {
				value: {
					code: string;
					language: string;

				}
			}) => {
				return (
					<CodeBlock
						text={value?.code}
						language={value?.language as CodeType['language']}
					// highlightedLines={values?.highlightedLines}
					/>
				);
			},
			image: ({
				value,
			}: {
				value: Image & { alt?: string; caption?: string };
			}) => {
				return (
					<div className="my-6 space-y-2">
						<ImageBox
							image={value}
							alt={value.alt}
							classesWrapper="relative aspect-[16/9]"
						/>
						{value?.caption && (
							<div className="font-sans text-sm text-gray-600">
								{value.caption}
							</div>
						)}
					</div>
				);
			},
			timeline: ({ value }) => {
				const { items } = value || {};
				return <TimelineSection timelines={items} />;
			},
		},
	};

	return <PortableText components={components} value={value} />;
}
