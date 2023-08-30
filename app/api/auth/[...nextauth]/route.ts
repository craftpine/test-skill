import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token, trigger, newSession }) {
      console.log("trigger", trigger)

      console.log("SESSION", JSON.stringify(session, null, 2));
      if (trigger === "update" ) {
        console.log("NEW SESSION", newSession)
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client
        
      }
      return { ...session, ...token };
    },
    async jwt({ token, account, user, trigger }) {
      // console.log("JWT", JSON.stringify(token, null, 2));
      // console.log("account", JSON.stringify(account, null, 2));
      console.log("trigger jwt", trigger)

      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.tokenType = account.token_type;
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log(baseUrl);
      return baseUrl;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
