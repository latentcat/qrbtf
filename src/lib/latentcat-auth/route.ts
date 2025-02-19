import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_KEY } from "./server";
import { decrypt } from "./server/session";
import { SESSION_SECRET } from "../env/server";
import { NEXT_PUBLIC_CLIENT_ID } from "../env/client";

async function createCookie(
  resp: NextResponse<unknown>,
  verifiedToken: string,
) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  resp.cookies.set(COOKIE_KEY, verifiedToken, {
    httpOnly: true,
    secure: true,
    expires: expires,
    path: "/",
  });
}

async function authCallback(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get("accessToken");
  if (!accessToken) {
    return new Response(null, { status: 400 });
  }

  const tokenResp = await fetch(
    "https://account.latentcat.com/api/auth/token",
    {
      method: "POST",
      body: JSON.stringify({
        accessToken,
        clientId: NEXT_PUBLIC_CLIENT_ID,
        clientSecret: SESSION_SECRET,
      }),
    },
  );

  if (!tokenResp.ok) {
    return new Response(null, { status: 400 });
  }

  const token: string = (await tokenResp.json()).token;

  const session = await decrypt(token);
  if (!session) {
    return new Response(null, { status: 400 });
  }

  const resp = NextResponse.redirect(new URL("/", req.url));
  createCookie(resp, token);
  return resp;
}

export function LatentCatAuth() {
  return async function (
    req: NextRequest,
    { params }: { params: Promise<{ action: string }> },
  ) {
    const auth = (await params).action;
    switch (auth) {
      case "callback":
        return await authCallback(req);
      default:
        return new Response(null, { status: 404 });
    }
  };
}
