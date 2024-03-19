import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/Footer";
import { LayoutHead } from "@/lib/layout_data";

const inter = Inter({ subsets: ["latin"] });

import { layoutMetadata, layoutViewport } from "@/lib/layout_data";
import { Header } from "@/components/Header";
import { getServerSession } from "next-auth/next";
import auth from "@/auth";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = layoutMetadata;

export const viewport: Viewport = layoutViewport;

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getServerSession(auth);

  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <LayoutHead />
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
