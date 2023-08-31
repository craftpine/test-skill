import CONSTANTS from "@/constants";
import axiosInstance from "@/libs/axiosinstance";
import axios from "axios";
import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token, trigger, newSession }) {
      let additionalData = {
        permission: CONSTANTS.PERMISSIONS.BASIC,
      };

      if (session) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.idToken}`;

        const data = await axiosInstance.get(
          `/user/permissions/${session.user?.email}`
        );

        if (data.data.permission) {
          additionalData.permission = data.data.permission;
        }
      }

      return { ...session, ...token, ...additionalData };
    },
    async jwt({ token, account, user, trigger }) {
      // console.log("JWT", JSON.stringify(token, null, 2));
      // console.log("account", JSON.stringify(account, null, 2));

      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.tokenType = account.token_type;
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
