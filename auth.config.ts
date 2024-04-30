import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Apple from "next-auth/providers/apple";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "@/data/user/user-by-email";
import { passwordsMatch } from "./lib/password-match";

export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || ""
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || ""
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        console.log("__Credentials SignIn", credentials);
        const { email, password } = credentials;
        const user = await getUserByEmail(email as string);
        if (!user || !user.password) return null;
        const _passwordsMatch = await passwordsMatch(
          password as string,
          user.password
        );
        if (_passwordsMatch) return user;
        else return null;
      }
    })
  ]
} satisfies NextAuthConfig;
