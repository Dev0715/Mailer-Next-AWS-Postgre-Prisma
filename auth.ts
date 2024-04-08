import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const { handlers, auth } = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {

      return true;
    },
    async session({ token, session }) {
      return session;
    },
    async jwt({ token }) {

      return token;
    }
  },
  ...authConfig
});
