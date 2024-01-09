import { createClient } from '@sanity/client/stega';

import {
	apiVersion,
	dataset,
	projectId,
	revalidateSecret,
	studioUrl,
	useCdn
} from '@/sanity/lib/api';

export const configuredSanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	// If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
	useCdn: revalidateSecret ? useCdn : true,
	perspective: 'published',
	stega: {
		studioUrl,
		// logger: console,
	}
});
