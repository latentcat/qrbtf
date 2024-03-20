import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
import withMDX from "@next/mdx";
import NextBundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  async rewrites() {
    return [
      {
        source: "/mp/lib.min.js",
        destination: "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js",
      },
      {
        source: "/mp/lib.js",
        destination: "https://cdn.mxpnl.com/libs/mixpanel-2-latest.js",
      },
      {
        source: "/mp/decide",
        destination: "https://decide.mixpanel.com/decide",
      },
      {
        source: "/mp/:slug",
        // use "api-eu.mixpanel.com" if you need to use EU servers
        destination: "https://api.mixpanel.com/:slug",
      },
    ];
  },
  webpack: (config) => {
    // https://github.com/vercel/next.js/discussions/36981
    config.module.generator["asset/resource"] =
      config.module.generator["asset"];
    config.module.generator["asset/source"] = config.module.generator["asset"];
    delete config.module.generator["asset"];

    const imageLoaderRule = config.module.rules.find(
      (rule) => rule.loader === "next-image-loader",
    );
    imageLoaderRule.exclude = /\.inline\.(png|jpg|svg)$/i;

    config.module.rules.push({
      test: /\.inline\.(png|jpg|gif)$/i,
      type: "asset/inline",
    });
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(withMDX()(nextConfig)));
