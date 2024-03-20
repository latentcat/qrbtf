import { MetadataRoute } from "next";
import { locales } from "@/navigation";

const baseUrl = "https://qrbtf.com";

interface Site {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

// export async function generateSitemaps() {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: 0 }]
// }

// export default async function sitemap({
//   id,
// }: {
//   id: number
// }): Promise<MetadataRoute.Sitemap> {

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let pages: string[] = require
    .context("./", true, /\/page\.(mdx|tsx)$/)
    .keys()
    .filter((key) => key.startsWith("./"))
    .map((key) =>
      key
        .replace(/\/page\.(mdx|tsx)$/, "")
        .replace(/\([^)]+\)\//, "")
        .slice(2),
    )
    .map((key) => key.replace("[locale]/", ""))
    .filter((key) => !key.startsWith("(qrcodes)"))
    .filter((key) => !key.startsWith("[...rest]"));

  pages.push("");

  const prefixedPages: string[] = locales.flatMap((locale) =>
    pages.map((page: string) => `${locale}/${page}`),
  );
  console.log(prefixedPages);

  const routes = ["", ...prefixedPages].map((route, index) => {
    let url = `${baseUrl}/${route}`;
    if (url.endsWith("/")) {
      url = url.slice(0, -1); // 去掉最后一个字符
    }
    let sitemap: Site = {
      url: url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    };
    return sitemap;
  });

  return [...routes];
}
