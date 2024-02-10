'use client';

import siteMetadata from '@/data/siteMetadata'
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import { SearchProvider, SearchConfig } from 'pliny/search';

const Providers = ({ children,

}: {
	children: React.ReactNode,

}) => {
	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class" defaultTheme={siteMetadata.theme}>
				{/* <SearchProvider searchConfig={siteMetadata.search as SearchConfig}> */}
				{children}
				{/* </SearchProvider> */}
			</NextThemesProvider>
		</NextUIProvider>


	);
};

export default Providers;
