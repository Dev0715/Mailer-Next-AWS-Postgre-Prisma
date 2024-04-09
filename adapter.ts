type Awaitable<T> = T | PromiseLike<T>;

import type {
  Adapter,
  AdapterAccount,
  AdapterUser,
  AdapterSession
} from "next-auth/adapters";
import { createUser, getUserByEmail } from "@/data/user";

export default {
  async getUserByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Awaitable<AdapterUser | null> {
    console.log("__getUserByAccount", providerAccountId);
    // { providerAccountId: '126603430', provider: 'github' }
    return null;
  },
  async getUser(id: string): Awaitable<AdapterUser | null> {
    console.log("__getUser", id);
    // 8876a5dc-7248-4682-a255-5412417373dd
    return null;
  },
  async getUserByEmail(email: string): Awaitable<AdapterUser | null> {
    console.log("__getUserByEmail", email);
    // sacreddevking@gmail.com
    return null;
  },
  async createUser(user: AdapterUser): Awaitable<AdapterUser> {
    console.log("__createUser", user);
    const existingUser = await getUserByEmail(user.email);
    if (!existingUser) {
      await createUser({ ...user, emailVerified: new Date() });
    }
    // {
    //   id: '2e79e340-fb52-4e65-a535-a656734b5b3f',
    //   name: 'DevKing',
    //   email: 'sacreddevking@gmail.com',
    //   image: 'https://avatars.githubusercontent.com/u/126603430?v=4',
    //   emailVerified: null
    // }
    return user;
  },
  async linkAccount(
    account: AdapterAccount
  ): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
    console.log("__linkAccount", account);
    // {
    //   access_token: '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',
    //   scope: 'read:user,user:email',
    //   token_type: 'bearer',
    //   providerAccountId: '126603430',
    //   provider: 'github',
    //   type: 'oauth',
    //   userId: '2e79e340-fb52-4e65-a535-a656734b5b3f'
    // }
    return;
  }
  // async updateUser(
  //   user: Partial<AdapterUser> & Pick<AdapterUser, "id">
  // ): Awaitable<AdapterUser> {
  //   console.log("UPDATE_USER", user);
  //   return user as AdapterUser;
  // },
  // async deleteUser(
  //   userId: string
  // ): Promise<void> | Awaitable<AdapterUser | null | undefined> {
  //   console.log("DELETE_USER", userId);
  //   return;
  // },
  // async unlinkAccount(
  //   providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  // ): Promise<void> | Awaitable<AdapterAccount | undefined> {
  //   console.log("UNLINK_ACCOUNT", providerAccountId);
  //   return;
  // },
  // async createSession(session: {
  //   sessionToken: string;
  //   userId: string;
  //   expires: Date;
  // }): Awaitable<AdapterSession> {
  //   console.log("CREATE_SESSION", session);
  //   return;
  // },
  // async getSessionAndUser(
  //   sessionToken: string
  // ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
  //   console.log("GET_SESSION_AND_USER", sessionToken);
  //   return;
  // },
  // async updateSession(
  //   session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
  // ): Awaitable<AdapterSession | null | undefined> {
  //   console.log("UPDATE_SESSION", session);
  //   return session;
  // },
  // async deleteSession(
  //   sessionToken: string
  // ): Promise<void> | Awaitable<AdapterSession | null | undefined> {
  //   console.log("DELETE_SESSION", sessionToken);
  //   return sessionToken;
  // },
  // async createVerificationToken({ identifier, expires, token }): Promise<any> {
  //   console.log("CREATE_VERIFICATION_TOKEN");
  //   return { identifier, expires, token };
  // },
  // async useVerificationToken({ identifier, token }): Promise<any> {
  //   console.log("USE_VERFICATION_TOKEN");
  //   return { identifier, token };
  // }
} satisfies Adapter;
