import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import TwitterProvider from 'next-auth/providers/twitter';

const prisma = new PrismaClient();

type SessionArg = {
  session: Session;
  user: User;
  token: JWT;
};

export type UserSession = {
  userId: string;
} & Session;

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      version: '2.0' // opt-in to Twitter OAuth 2.0
    })
  ],
  callbacks: {
    session: async ({ session, user }: SessionArg) => {
      session.userId = user.id;
      return Promise.resolve(session as UserSession);
    }
  },
  secret: process.env.JWT_SECRET
});
