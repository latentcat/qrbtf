import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role?: string;
      id?: string;
    } & DefaultSession["user"];
    jwt?: string;
  }

  interface User {
    role?: string;
    id?: string;
  }
}
