import '@/styles/index.css';

import { toPlainText } from '@portabletext/react';
import { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { Suspense } from 'react';

import { Footer } from '@/components/global/Footer';
import { Navbar } from '@/components/global/Navbar';
import { urlForOpenGraphImage } from '@/sanity/lib/utils';
import {
	// loadBlogPosts,
	loadHomePage,
	loadSettings,
} from '@/sanity/loader/loadQuery';

const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'));

export async function generateMetadata(): Promise<Metadata> {
	const [{ data: settings }, { data: homePage }] = await Promise.all([
		loadSettings(),
		loadHomePage(),
		// loadBlogPosts(),
	]);

	const ogImage = urlForOpenGraphImage(settings?.ogImage);
	return {
		title: homePage?.title
			? {
				template: `%s | ${homePage.title}`,
				default: homePage.title || 'Personal website',
			}
			: undefined,
		description: homePage?.overview
			? toPlainText(homePage.overview)
			: undefined,
		openGraph: {
			images: ogImage ? [ogImage] : [],
		},
	};
}

export const viewport: Viewport = {
	themeColor: '#000',
};

export default async function IndexRoute({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<>
			<div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
				<Suspense>
					<Navbar />

					<div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">
						{children}
					</div>
					<Footer />
				</Suspense>
			</div>
			{draftMode().isEnabled && <VisualEditing />}
		</>
	);
}