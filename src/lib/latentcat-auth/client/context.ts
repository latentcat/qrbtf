"use client";

import React, { useContext } from "react";
import { QrbtfUser } from "../common";

export interface SessionContextType {
  data?: QrbtfUser;
}

export const SessionContext = React.createContext<SessionContextType>({});
export function useSession(required = false): SessionContextType {
  const session = useContext(SessionContext);
  if (required) {
    const ssoUrl = new URL("https://account.latentcat.com/login");
    ssoUrl.searchParams.append(
      "callbackUrl",
      "http://localhost:3000/api/auth/callback",
    );
    ssoUrl.searchParams.append("clientId", process.env.CLIENT_ID || "");
    window.location.href = ssoUrl.toString();
    return {};
  }
  return session;
}
