import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default withNextIntl(nextConfig);
