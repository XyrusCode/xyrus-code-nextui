import type { Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	providers: [
		GitHub({
			clientId: process.env.OAUTH_CLIENT_KEY as string,
			clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
		}),
	],
	pages: {
		signIn: '/sign-in',
		error: '/error',
	},
	logger: {
		error(code, ...message) {
			console.error(code, message);
		},
		warn(code, ...message) {
			console.warn(code, message);
		},
		debug(code, ...message) {
			console.debug(code, ...message);
		}
	},
	callbacks: {
		//TODO:  add these later
	},
});
