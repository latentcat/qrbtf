"use client";

import React, { useContext } from "react";
import { QrbtfUser } from "../common";

export interface SessionContextType {
  data?: QrbtfUser;
}

export const SessionContext = React.createContext<SessionContextType>({});
export function useSession(): SessionContextType {
  const session = useContext(SessionContext);
  return session;
}
