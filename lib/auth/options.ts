import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { RoleName } from '@prisma/client';
import { getPrisma } from '../db';

const adapter = process.env.DATABASE_URL ? PrismaAdapter(getPrisma()) : undefined;

export const authOptions: NextAuthOptions = {
  adapter,
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Staff credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;

        if (!email || !password || !process.env.DATABASE_URL) {
          return null;
        }

        const user = await getPrisma().user.findUnique({
          where: { email },
          include: { role: true },
        });

        if (!user?.passwordHash || user.deletedAt) {
          return null;
        }

        const valid = await compare(password, user.passwordHash);
        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role?.name ?? 'VOLUNTEER',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: RoleName }).role ?? 'VOLUNTEER';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role as RoleName;
      }
      return session;
    },
  },
};
