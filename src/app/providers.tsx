"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "jotai";
import MixpanelAnalytics from "@/components/MixpanelAnalytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider>{children}</Provider>
      <MixpanelAnalytics />
    </NextThemesProvider>
  );
}
