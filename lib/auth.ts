import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';
import { dbConnect } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'google') return false;

      try {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image ?? null,
            password: null,
            provider: 'google',
          });
          console.log('New user created', newUser);
        } else {
          await User.findOneAndUpdate(
            { email: user.email },
            {
              name: user.name,
              avatar: user.image ?? existingUser.image,
            },
          );
          console.log(user);
        }
        return true;
      } catch (err) {
        console.error('Auth callback error:', err);
        return false;
      }
    },
    async session({ session }) {
      if (session?.user) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.id = dbUser._id.toString();
          }
        } catch (err) {
          console.error('Session callback error:', err);
        }
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/dashboard';
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
