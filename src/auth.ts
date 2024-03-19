import { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToDatabase } from "./lib/server/mongodb";

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
};

export default auth;
