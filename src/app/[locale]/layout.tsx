import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/Footer";
import { LayoutHead } from "@/lib/layout_data";

const inter = Inter({ subsets: ["latin"] });

import { layoutViewport } from "@/lib/layout_data";
import { Header } from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import React from "react";
import { getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/lib/latentcat-auth/client";
import { getServerSession } from "@/lib/latentcat-auth/server";

export { generateMetadata } from "@/lib/layout_data";

export const viewport: Viewport = layoutViewport;

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getServerSession();
  const messages = await getMessages();

  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <LayoutHead />
      <body className={cn(inter.className, "")}>
        <SessionProvider session={{ data: session }}>
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
