import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/Footer";
import { LayoutHead } from "@/lib/layout_data";

const inter = Inter({ subsets: ["latin"] });

import { layoutMetadata, layoutViewport } from "@/lib/layout_data";
import { Header } from "@/components/Header";

export const metadata: Metadata = layoutMetadata;

export const viewport: Viewport = layoutViewport;

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <LayoutHead />
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
