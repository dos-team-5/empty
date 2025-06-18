import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { generateTokens, verifyRefreshToken, BackendTokens } from './token';
import { db } from '@/config/db';
import { users } from '@/schema/user';
import { eq } from 'drizzle-orm';

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const payload = verifyRefreshToken(token.backendTokens.refreshToken);
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(payload.userId)))
      .limit(1)
      .then((res) => res[0]);
    if (!user) {
      console.log(
        '\x1b[41m',
        '******************User not found******************',
        '\x1b[0m'
      );
      return { ...token, error: 'RefreshAccessTokenError' };
    }

    if (!user || user.refreshToken !== token.backendTokens.refreshToken) {
      return { ...token, error: 'RefreshAccessTokenError' };
    }

    const newTokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await db
      .update(users)
      .set({ refreshToken: newTokens.refreshToken })
      .where(eq(users.id, user.id));

    console.log(
      '\x1b[33m',
      '~~~~~~~~~~~~~~~~~~~Token refresh Complete~~~~~~~~~~~~~~~~~~~',
      '\x1b[0m'
    );
    return {
      ...token,
      backendTokens: newTokens,
    };
  } catch (error) {
    console.log(
      '\x1b[41m',
      '******************Error on refreshing token******************',
      '\x1b[0m'
    );
    console.error(error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error('Invalid email or password');
        }

        const tokens = generateTokens({
          id: user.id,
          email: user.email,
          role: user.role,
        });

        await db
          .update(users)
          .set({ refreshToken: tokens.refreshToken })
          .where(eq(users.id, user.id));

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
          backendTokens: tokens,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        return { ...token, ...user };
      }

      if (Date.now() < token.backendTokens.expiresIn) {
        console.log('\x1b[42m', 'token not expired');
        console.log(
          'ExpireAt=> ' +
            new Date(token.backendTokens.expiresIn).toLocaleString()
        );
        console.log('Now=> ' + new Date().toLocaleString(), '\x1b[0m');
        return token;
      }

      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      session.backendTokens = token.backendTokens as BackendTokens;
      return session;
    },
  },
  pages: {
    signIn: '/admin-login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
