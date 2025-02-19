"use client";
import { PropsWithChildren } from "react";
import { SessionContext, SessionContextType } from "./context";

interface SessionProviderProps {
  session: SessionContextType;
}

export default function SessionProvider({
  session,
  children,
}: PropsWithChildren<SessionProviderProps>) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
