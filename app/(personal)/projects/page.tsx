import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import Link from 'next/link';

import { ProjectsPage } from '@/components/pages/projects/ProjectsPage';
import { studioUrl } from '@/sanity/lib/api';
import { loadProjectsPage } from '@/sanity/loader/loadQuery';
const ProjectsPagePreview = dynamic(
	() => import('@/components/pages/projects/ProjectsPagePreview')
);

export default async function IndexRoute() {
	const initial = await loadProjectsPage();

	if (draftMode().isEnabled) {
		return <ProjectsPagePreview initial={initial} />;
	}

	if (!initial.data) {
		return (
			<div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
				<Link href={`${studioUrl}/desk/home`} className="underline">
          create one now
				</Link>
        !
			</div>
		);
	}

	return <ProjectsPage data={initial.data} />;
}
