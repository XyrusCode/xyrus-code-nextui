import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// import { PreloadResources } from './preload'
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL('https://xyruscode.com.ng'),
	title: {
		default: 'Xyrus Code',
		template: '%s | Xyrus Code',
	},
	description: 'Developer, writer, and creator.',
	openGraph: {
		title: 'Xyrus Code',
		description: 'Developer, writer, and creator.',
		url: 'https://xyruscode.com.ng',
		siteName: 'Xyrus Code',
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		title: 'Xyrus Code',
		card: 'summary_large_image',
	},
	verification: {
		google: '',
		yandex: '',
	},
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html
			lang="en">
			<body className={inter.className}>
				<Providers>

					{children}
					<Analytics />
					<SpeedInsights />
					{/* <PreloadResources /> */}
				</Providers>
			</body>
		</html>
	);
}
