import { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToDatabase } from "./lib/server/mongodb";

export enum UserTier {
  Trial = 1,
  Alpha,
}

const auth: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(
    connectToDatabase().then((res) => res.client),
    {
      databaseName: "lc_auth",
    },
  ) as Adapter,
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      session.user.tier = user.tier;
      session.user.subscribe_time = user.subscribe_time;
      session.user.subscribe_expire = user.subscribe_expire;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export default auth;
