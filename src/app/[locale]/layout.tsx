import type { Viewport } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getServerSession } from "next-auth/next";
import pick from "lodash/pick";
import React from "react";
import { getMessages } from "next-intl/server";

import { Providers } from "@/app/providers";
import { Footer } from "@/components/Footer";
import { LayoutHead, layoutViewport } from "@/lib/layout_data";
import { Header } from "@/components/Header";
import auth from "@/auth";
import SessionProvider from "@/components/SessionProvider";
import { cn } from "@/lib/utils";
// export const metadata: Metadata = layoutMetadata;

import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export { generateMetadata } from "@/lib/layout_data";

export const viewport: Viewport = layoutViewport;

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getServerSession(auth);
  const messages = await getMessages();

  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <LayoutHead />
      <body className={cn(inter.className, "")}>
        <SessionProvider session={session}>
          <Providers>
            <NextIntlClientProvider
              messages={pick(messages, ["header", "user_button"])}
            >
              <Header />
            </NextIntlClientProvider>
            <div className="min-h-screen flex flex-col">{children}</div>
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
