import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import adapter from "@/adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error"
  // },
  events: {
    async linkAccount({ user }) {}
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("__CALLBACK__signIn", user, account);
      return true;
    },
    async session({ token, session }) {
      console.log("__CALLBACK__session", token, session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      console.log("__CALLBACK__jwt", token);
      return token;
    }
  },
  ...authConfig
});
