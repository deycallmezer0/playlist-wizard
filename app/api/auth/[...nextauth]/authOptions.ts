import SpotifyProvider from 'next-auth/providers/spotify';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'user-read-email user-top-read playlist-modify-public playlist-modify-private'
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.accessToken = token.accessToken;
      session.user.id = token.sub;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
};