'use client';

import { type QueryResponseInitial } from '@sanity/react-loader';

import { projectsPageQuery } from '@/sanity/lib/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { ProjectPagePayload } from '@/types/sanity';

import ProjectsPage from './ProjectsPage';

type Props = {
  initial: QueryResponseInitial<ProjectPagePayload | null>;
};

export default function ProjectsPagePreview(props: Props) {
	const { initial } = props;
	const { data, encodeDataAttribute } = useQuery<ProjectPagePayload | null>(
		projectsPageQuery,
		{},
		{ initial }
	);

	if (!data) {
		return (
			<div className="text-center">
        Please start editing your Home document to see the preview!
			</div>
		);
	}

	return <ProjectsPage data={data} encodeDataAttribute={encodeDataAttribute} />;
}
