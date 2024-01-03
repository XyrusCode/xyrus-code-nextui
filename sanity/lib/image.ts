import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { dataset, projectId } from './api';

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: Image | any) =>
	imageBuilder.image(source).auto('format').fit('max');
