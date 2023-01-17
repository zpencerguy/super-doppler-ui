// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import TwitterProvider from 'next-auth/providers/twitter'
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      // version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
