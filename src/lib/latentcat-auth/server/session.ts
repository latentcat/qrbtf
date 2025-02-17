"use server";

import * as jose from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { COOKIE_KEY, UserPayload } from ".";
import { PaymentMethod, QrbtfUser, UserTier } from "../common";
import { checkAndUpdateUser } from "@/app/api/user/service";
import { SESSION_SECRET } from "@/lib/env/server";

export const getServerSession = cache(
  async (): Promise<QrbtfUser | undefined> => {
    const cookie = (await cookies()).get(COOKIE_KEY)?.value;
    const session = await decrypt(cookie);
    if (session) {
      const qrbtfUserData = await checkAndUpdateUser(session.id);
      return {
        id: session.id,
        name: session.name,
        picture: session.picture,
        tier: qrbtfUserData.tier ?? UserTier.Trial,
        payment: qrbtfUserData.payment ?? PaymentMethod.None,
        subscribe_time: qrbtfUserData.subscribe_time,
        subscribe_expire: qrbtfUserData.subscribe_expire,
      };
    }
  },
);

export async function decrypt(token = "") {
  try {
    const decodedSecret = jose.base64url.decode(SESSION_SECRET);
    const { payload } = await jose.jwtDecrypt<UserPayload>(
      token,
      decodedSecret,
    );
    return payload;
  } catch {
    // console.log("Failed to verify session", error);
  }
}
