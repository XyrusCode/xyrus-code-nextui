import type { PortableTextBlock } from '@portabletext/types';

import { CustomPortableText } from '@/components//shared/CustomPortableText';
import siteMetadata from '@/data/siteMetadata'

import NowPlaying from '@/components/NowPlaying';
import type { SettingsPayload } from '@/types/sanity';
import { Link } from '@nextui-org/react';
import SocialIcon from '@/components/shared/SocialIcon';

interface FooterProps {
	data: SettingsPayload;
}
export default function Footer(props: FooterProps) {
	const { data } = props;
	// const footer = data?.footer || ([] as PortableTextBlock[]);
	return (
		<footer className="p-4 sm:p-6 bg-primary-50 dark:bg-secondary-50">
			<div className="flex flex-col items-center">
				<div className="mb-3 flex space-x-4">
					<SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
					<SocialIcon kind="github" href={siteMetadata.github} size={6} />
					<SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
					<SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
					<SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
					<SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
					<SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
					<SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
				</div>
				<div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
					<div>{`© ${new Date().getFullYear()}`}</div>
					<div>{` • `}</div>
					<Link href="/">{siteMetadata.title}</Link>
				</div>
				<div className="text-sm text-gray-500 dark:text-gray-400">
					<NowPlaying />
				</div>
			</div>
		</footer>
	);
}
