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

import { Logo } from '@/components/logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { resolveHref } from '@/sanity/lib/utils';
import type { MenuItem, SettingsPayload } from '@/types/sanity';

interface NavbarProps {
  data: SettingsPayload;
}
export default function Navbar(props: NavbarProps) {
	const { data } = props;
	const pathname = usePathname();
	const menuItems = data?.menuItems || ([] as MenuItem[]);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<NxtNavbar
			shouldHideOnScroll
			isBordered
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			className="bg-white dark:bg-gray-900"
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
				<Link href="/">
					<NavbarBrand>
						<Logo />
						<p className="font-bold text-inherit">Xyrus Code</p>
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
							key={`${item.slug}-${index}`}
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
				<NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
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
          				className={`text-lg hover:text-black md:text-xl ${
          					pathname === href
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
			</NavbarMenu>
		</NxtNavbar>
	);
}
