'use client';
import { NextUIProvider } from '@nextui-org/react';
// import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const Providers = ({ children,
	// session
}: {
	children: React.ReactNode,
	// session: any
 }) => {
	return (
		// <SessionProvider session={session}>
		<NextUIProvider>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				{children}
			</NextThemesProvider>
		</NextUIProvider>
		// </SessionProvider>

	);
};

export default Providers;
