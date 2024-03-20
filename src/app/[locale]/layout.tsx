import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/Footer";
import { generateMetadata, LayoutHead } from "@/lib/layout_data";

const inter = Inter({ subsets: ["latin"] });

import { layoutMetadata, layoutViewport } from "@/lib/layout_data";
import { Header } from "@/components/Header";
import { getServerSession } from "next-auth/next";
import auth from "@/auth";
import SessionProvider from "@/components/SessionProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";
import { SectionStylesClient } from "@/app/[locale]/SectionStylesClient";
import React from "react";
import { getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";

// export const metadata: Metadata = layoutMetadata;

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
