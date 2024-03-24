'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const isDarkMode = (theme: string) => theme === 'dark';

const Logo = () => {
	const { theme } = useTheme();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, [theme]);

	const themeMode = theme || 'light';

	if (loading) {
		return null; // or a loading placeholder if needed
	}

	return (
		<Image
			alt="Xyrus Code Logo"
			width={150}
			height={150}
			src={isDarkMode(themeMode) ? '/logo-dark.png' : '/logo.png'}
		/>
	);
};

export default Logo;
