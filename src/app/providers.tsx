"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "jotai";
import MixpanelAnalytics from "@/components/MixpanelAnalytics";

import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider>
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {},
            className: "my-toast",
          }}
        />
      </Provider>
      <MixpanelAnalytics />
    </NextThemesProvider>
  );
}
