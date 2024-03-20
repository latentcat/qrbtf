import { type Metadata, Viewport } from "next";

import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://qrbtf.com"),
    title: {
      template: t("title.template"),
      default: t("title.default"),
    },
    description: t("description"),
    keywords: [
      t("keywords.0"),
      t("keywords.1"),
      t("keywords.2"),
      t("keywords.3"),
      t("keywords.4"),
      t("keywords.5"),
      t("keywords.6"),
      t("keywords.7"),
      t("keywords.8"),
      t("keywords.9"),
    ],
    openGraph: {
      images:
        "https://dt00g2eb5etby3xu.public.blob.vercel-storage.com/assets/qrbtf_kv-gXzB1cMYlyXQQrhza3HoQlH1WydQpe.jpg",
    },
  };
}

export const layoutMetadata: Metadata = {
  metadataBase: new URL("https://qrbtf.com"),
  title: {
    template: "%s - QRBTF",
    default: "QRBTF - #1 AI QR Code Generator",
  },
  description: "The world's first and best AI QR code generator.",
  keywords: [
    "QR Code",
    "qrcode",
    "AI QR Code",
    "AI qrcode",
    "Parametric QR Code",
    "QRBTF",
    "Mid Real",
    "midreal",
  ],
  openGraph: {
    // title: 'Troy Ni',
    images:
      "https://dt00g2eb5etby3xu.public.blob.vercel-storage.com/assets/qrbtf_kv-gXzB1cMYlyXQQrhza3HoQlH1WydQpe.jpg",
  },
};

export const layoutViewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  height: "device-height",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export function LayoutHead() {
  return (
    <head>
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta name="theme-color" content="#000000" />
    </head>
  );
}
