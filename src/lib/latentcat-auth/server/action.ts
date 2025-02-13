"use server";

import { cookies } from "next/headers";
import { getServerSession } from "./session";
import { redirect } from "next/navigation";
import { COOKIE_KEY } from ".";

export async function signIn() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  const ssoUrl = new URL("https://account.latentcat.com/login");
  ssoUrl.searchParams.append(
    "callbackUrl",
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/auth/callback"
      : process.env.AUTH_URL || "",
  );
  ssoUrl.searchParams.append("clientId", process.env.CLIENT_ID || "");
  redirect(ssoUrl.toString());
}

export async function signOut() {
  (await cookies()).delete(COOKIE_KEY);
}
