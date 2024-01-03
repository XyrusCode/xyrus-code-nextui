/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import {codeInput} from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';

// import { markdownSchema } from 'sanity-plugin-markdown';
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { locate } from '@/sanity/plugins/locate';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';
import author from '@/sanity/schemas/documents/author';
import page from '@/sanity/schemas/documents/page';
import post from '@/sanity/schemas/documents/post';
import project from '@/sanity/schemas/documents/project';
import snippet from '@/sanity/schemas/documents/snippet';
import duration from '@/sanity/schemas/objects/duration';
import milestone from '@/sanity/schemas/objects/milestone';
import timeline from '@/sanity/schemas/objects/timeline';
import home from '@/sanity/schemas/singletons/home';
import posts from '@/sanity/schemas/singletons/posts';
import projects from '@/sanity/schemas/singletons/projects';
import settings from '@/sanity/schemas/singletons/settings';

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io';

export default defineConfig({
	basePath: studioUrl,
	projectId: projectId || '',
	dataset: dataset || '',
	title,
	schema: {
		// If you want more content types, you can add them to this array
		types: [
			// Singletons
			home,
			posts,
			projects,
			settings,
			// Documents
			author,
			duration,
			page,
			post,
			project,
			snippet,
			// Objects
			milestone,
			timeline,
		],
	},
	plugins: [
		deskTool({
			structure: pageStructure([home, posts, projects, settings]),
		}),
		presentationTool({
			locate,
			previewUrl: {
				draftMode: {
					enable: '/api/draft',
				},
			},
		}),
		// Configures the global "new document" button, and document actions, to suit the Settings document singleton
		singletonPlugin([home.name, posts.name, projects.name, settings.name,]),
		// Add an image asset source for Unsplash
		unsplashImageAsset(),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		// markdownSchema(),
		codeInput()
	],
});
