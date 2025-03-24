"use client";

import React, { useContext, PropsWithChildren } from "react";
import { type QrbtfUser } from "./common";

interface SessionContextType {
  data?: QrbtfUser;
}

const SessionContext = React.createContext<SessionContextType>({});

interface SessionProviderProps {
  session: SessionContextType;
}

export function useSession(): SessionContextType {
  return useContext(SessionContext);
}

export function SessionProvider({
  session,
  children,
}: PropsWithChildren<SessionProviderProps>) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
