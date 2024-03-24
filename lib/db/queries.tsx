/* eslint-disable camelcase */
'use server';

// import { auth, youtube } from '@googleapis/youtube';
import { sql } from '@vercel/postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import {
	unstable_cache as cache,
	unstable_noStore as noStore,
} from 'next/cache';

// let googleAuth = new auth.GoogleAuth({
// 	credentials: {
// 		client_email: process.env.GOOGLE_CLIENT_EMAIL,
// 		private_key: process.env.GOOGLE_PRIVATE_KEY,
// 	},
// 	scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
// });

// let yt = youtube({
// 	version: 'v3',
// 	auth: googleAuth,
// });

export async function getUsers() {
	if (!process.env.POSTGRES_URL) {
		return [];
	}

	noStore();
	let users = await sql`
	SELECT id, name, email, created_at
	FROM users
	ORDER BY created_at DESC
  `;

	return users.rows;
};

export async function getUser(email: string) {
	if (!process.env.POSTGRES_URL) {
		return [];
	}

	noStore();
	let user = await sql`
	SELECT id, name, email, created_at
	FROM users
	WHERE email = ${email}
  `;

	return user.rows;
};

export async function createUser(email: string, password: string, username: string) {
	let salt = genSaltSync(10);
	let hash = hashSync(password, salt);

	if (!process.env.POSTGRES_URL) {
		return [];
	}

	noStore();

	let user = await sql`
	INSERT INTO users (email, username, password_hashcreated_at) 
	VALUES (${email}, ${username} ${hash}, NOW())`;

	return user;
};

export async function getBlogViews() {
	if (!process.env.POSTGRES_URL) {
		return [];
	}

	noStore();
	let data = await sql`
    SELECT count
    FROM views
		`;

	return data.rows.reduce((acc, curr) => acc + Number(curr.count), 0);
}

export async function getViewsCount() {
	if (!process.env.POSTGRES_URL) {
		return [];
	}

	noStore();
	let data = await sql`
    SELECT slug, count
    FROM views
		`;

	return data.rows as { slug: string; count: number }[];
}

// export const getYouTubeSubs = cache(
// 	async () => {
// 		let response = await yt.channels.list({
// 			id: ['UCwolPiF_7zbFGiktzGEBcGQ'],
// 			part: ['statistics'],
// 		});

// 		let channel = response.data.items![0];
// 		return Number(channel?.statistics?.subscriberCount).toLocaleString();
// 	},
// 	['leerob-youtube-subs'],
// 	{
// 		revalidate: 3600,
// 	},
// );

// export const getVercelYouTubeSubs = cache(
// 	async () => {
// 		let response = await yt.channels.list({
// 			id: ['UCLq8gNoee7oXM7MvTdjyQvA'],
// 			part: ['statistics'],
// 		});

// 		let channel = response.data.items![0];
// 		return Number(channel?.statistics?.subscriberCount).toLocaleString();
// 	},
// 	['vercel-youtube-subs'],
// 	{
// 		revalidate: 3600,
// 	},
// );

export async function getGuestbookEntries() {
	if (!process.env.POSTGRES_URL) {
		return [];
	}

	noStore();
	let entries = await sql`
    SELECT id, body, created_by, updated_at
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 100
		`;
	return entries.rows;
}

