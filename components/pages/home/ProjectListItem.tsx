import type { PortableTextBlock } from '@portabletext/types';
import cn from 'classnames';
import Link from 'next/link';

import { CustomPortableText } from '@/components/shared/CustomPortableText';
import ImageBox from '@/components/shared/ImageBox';
import type { ShowcaseProject } from '@/types/sanity';

interface ProjectProps {
	project: ShowcaseProject;
	gradient: string;
	odd: number;
}

export function ProjectListItem(props: ProjectProps) {
	const { project, odd, gradient } = props;
	return (
		<div
			className={
				cn(
					'transform hover:scale-[1.01] transition-all',
					'rounded-xl w-full bg-gradient-to-r p-5',
					gradient,
					`flex flex-col gap-x-5 transition hover:bg-gray-50/50 xl:flex-row ${odd && 'border-b border-t xl:flex-row-reverse'
					}`
				)}
		>
			<div className="w-full xl:w-9/12">
				<ImageBox
					image={project.coverImage}
					alt={`Cover image from ${project.title}`}
					classesWrapper="relative aspect-[16/9]"
				/>
			</div>
			<div className="flex xl:w-1/4">
				<TextBox project={project} />
			</div>
		</div>

	);
}

function TextBox({ project }: { project: ShowcaseProject }) {
	return (
		<div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
			<div>
				{/* Title */}
				<div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
					{project.title}
				</div>
				{/* Overview  */}
				<div className="font-serif text-gray-500">
					<CustomPortableText value={project.overview as PortableTextBlock[]} />
				</div>
			</div>
			{/* Tags */}
			<div className="mt-4 flex flex-row gap-x-2">
				{project.tags?.map((tag, key) => (
					<div className="text-sm font-medium lowercase md:text-lg" key={key}>
						#{tag}
					</div>
				))}
			</div>
		</div>
	);
}
