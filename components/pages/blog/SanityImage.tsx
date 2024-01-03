import { createClient } from '@sanity/client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
// import { getSanityImageConfig } from 'lib/sanity.client'
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

interface Props {
  asset: SanityImageSource
  alt: string
  caption?: string
}

const configuredSanityClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	useCdn: true,
});

export const SanityImage = (props: Props) => {
	const { asset, alt, caption } = props;
	const imageProps = useNextSanityImage(configuredSanityClient, asset);

	if (!imageProps) {
		return null;
	};

	return (
		<figure>
			<Image
				{...imageProps}
				alt={alt}
				sizes="(max-width: 800px) 100vw, 800px"
			/>
			{caption && (
				<figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400">
					{caption}
				</figcaption>
			)}
		</figure>
	);
};
