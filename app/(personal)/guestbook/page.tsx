import { Suspense } from 'react';
import type { Session } from 'next-auth';
import { auth } from '@/app/auth';
import { getGuestbookEntries } from '@/lib/db/queries';
import GuestInfo from '@/components/shared/GuestInfo';

import { SignIn, SignOut } from '@/components/shared/AuthButtons';
import Form from './form';

export const metadata = {
	title: 'Guestbook',
	description: 'Sign my guestbook and leave your mark.',
};

export default function GuestbookPage() {
	return (
		<section>
			<h1 className="font-medium text-2xl mb-8 tracking-tighter">
				Leave a comment
			</h1>
			<Suspense>
				<GuestbookForm />
				<GuestbookEntries />
			</Suspense>
		</section>
	);
}

async function GuestbookForm() {
	const session = await auth() as Session;
	if (session?.user) {

		return session?.user ? (
			<>
				<GuestInfo />
				<Form />
				<SignOut />
			</>
		) : (
			<SignIn />
		);
	}
}

async function GuestbookEntries() {
	let entries = await getGuestbookEntries();

	if (entries.length === 0) {
		return null;
	}

	return entries.map((entry) => (
		<div key={entry.id} className="flex flex-col">
			<div className="w-full text-sm break-words">
				<span className="text-neutral-600 dark:text-neutral-400">
					{entry.created_by}:
				</span>
				{entry.body}
			</div>
		</div>
	));
}
