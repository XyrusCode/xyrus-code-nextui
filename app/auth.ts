import GitHub from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from '@/lib/db/queries';
import { authConfig } from '@/app/auth.config';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Credentials({
      async authorize({ email, password }: any) {
        let user = await getUser(email);
        if (user.length === 0) return null;
        let passwordsMatch = await compare(password, user[0].password!);
        if (passwordsMatch) return user[0] as any;
      },
    }),
  ],
});
