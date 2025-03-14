"use client";

import React, { useContext } from "react";
import { QrbtfUser } from "../common";
import {
  NEXT_PUBLIC_ACCOUNT_URL,
  NEXT_PUBLIC_CLIENT_ID,
  NEXT_PUBLIC_QRBTF_API_ENDPOINT,
} from "@/lib/env/client";

export interface SessionContextType {
  data?: QrbtfUser;
}

export const SessionContext = React.createContext<SessionContextType>({});
export function useSession(required = false): SessionContextType {
  const session = useContext(SessionContext);
  if (required) {
    const ssoUrl = new URL(`${NEXT_PUBLIC_ACCOUNT_URL}/login`);
    ssoUrl.searchParams.append(
      "callbackUrl",
      `${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/auth/callback`,
    );
    ssoUrl.searchParams.append("clientId", NEXT_PUBLIC_CLIENT_ID);
    window.location.href = ssoUrl.toString();
    return {};
  }
  return session;
}
