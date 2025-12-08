import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

import authConfig from "./auth.config";
import { getGoogleAccountByEmail } from "@/features/auth/user-auth-session-model.server";
import {
  isAccessTokenExpired,
  refreshAndUpdateAccessToken,
  setSessionAccessToken,
} from "@/features/auth/authentication-helpers.server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;

        // Save latest tokens to the database (to keep them persistent)
        await prisma.account.updateMany({
          where: { providerAccountId: account.providerAccountId },
          data: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          },
        });
      }
      return token;
    },

    async session({ session }) {
      const account = await getGoogleAccountByEmail(session.user.email ?? "");
      if (!account) return session;

      // Check if the access token is expired: if yes, refresh it
      const accessToken = isAccessTokenExpired(account.expires_at)
        ? await refreshAndUpdateAccessToken(account) // Refresh if expired
        : account.access_token; // Use the existing token if not expired

      // Inject fresh access token into the session object
      return setSessionAccessToken(session, accessToken);
    },
  },
});
