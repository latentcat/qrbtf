import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import type { UserTier } from "@/auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id?: string;
      tier?: UserTier;
      subscribe_time?: Date;
      subscribe_expire?: Date;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    tier?: UserTier;
    subscribe_time?: Date;
    subscribe_expire?: Date;
  }
}
