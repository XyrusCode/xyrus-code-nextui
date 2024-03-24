'use client';
import {
	Link,
	Navbar as NxtNavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { auth } from "@/app/auth";
import type { Session } from "next-auth";
import UserButton from '@/components/shared/UserButton';
import Logo from '@/components/logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import SearchButton from '@/components/shared/SearchButton';
import { resolveHref } from '@/sanity/lib/utils';
import type { MenuItem, SettingsPayload } from '@/types/sanity';

interface NavbarProps {
	data: SettingsPayload;
}
const Navbar = async (props: NavbarProps) => {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [session, setSession] = React.useState<Session | null>(null); // Initialize session state

	// const session = await auth() as Session;
	React.useEffect(() => {
		const fetchSession = async () => {
			try {
				const sessionData = await auth() as Session;
				setSession(sessionData);
			} catch (error) {
				console.error("Error fetching session:", error);
			}
		};

		fetchSession();
	}, []); // Empty dependency array to run only once on component mount


	const { data } = props;
	const menuItems = data?.menuItems || ([] as MenuItem[]);

	return (
		<NxtNavbar
			shouldHideOnScroll
			isBordered
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			className="bg-primary-50 dark:bg-secondary-50"
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
				<Link href="/">
					<NavbarBrand>
						<Logo />
					</NavbarBrand>
				</Link>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((item, index) => {
					const href = resolveHref(item?._type, item?.slug);
					if (!href) {
						return null;
					}
					return (
						<NavbarItem
							isActive={pathname === href}
							key={item.slug}
						>
							<Link
								color={pathname === href ? 'primary' : 'foreground'}
								className="w-full"
								href={href}
								size="lg"
							>
								{item.title}
							</Link>
						</NavbarItem>
					);
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<SearchButton />
				</NavbarItem>
				<NavbarItem>
					<UserButton
						user={session?.user}
					/>
				</NavbarItem>
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems &&
					menuItems.map((menuItem, index) => {
						const href = resolveHref(menuItem?._type, menuItem?.slug);
						if (!href) {
							return null;
						}
						return (
							<NavbarMenuItem isActive={pathname === href} key={index}>
								<Link
									key={index}
									color={pathname === href ? 'success' : 'foreground'}
									className={`text-lg hover:text-black md:text-xl ${pathname === href
										? 'font-extrabold text-black'
										: 'text-gray-600'
										}`}
									href={href}
								>
									{menuItem.title}
								</Link>
							</NavbarMenuItem>
						);
					})}
				<NavbarMenuItem>
					<Link
						color="foreground"
						className="text-lg hover:text-black md:text-xl"
						href="/admin"
					>
						Admin
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</NxtNavbar>
	);
};

export default Navbar;
