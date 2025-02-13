"use server";

import { cookies } from "next/headers";
import { getServerSession } from "./session";
import { redirect } from "next/navigation";
import { COOKIE_KEY } from ".";
import {
  NEXT_PUBLIC_AUTH_CALLBACK_URL,
  NEXT_PUBLIC_CLIENT_ID,
} from "@/lib/env/client";

export async function signIn() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  const ssoUrl = new URL("https://account.latentcat.com/login");
  ssoUrl.searchParams.append("callbackUrl", NEXT_PUBLIC_AUTH_CALLBACK_URL);
  ssoUrl.searchParams.append("clientId", NEXT_PUBLIC_CLIENT_ID);
  redirect(ssoUrl.toString());
}

export async function signOut() {
  (await cookies()).delete(COOKIE_KEY);
}
