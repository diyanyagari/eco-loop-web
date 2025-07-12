import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  publicExcludes: ["!robots.txt", "!sitemap.xml"],
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [],
});

const nextConfig = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "id",
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: `
  //                 default-src 'self';
  //                 script-src 'self' 'nonce-<RANDOM_NONCE>';
  //                 connect-src 'self' http://localhost:8080;
  //               `
  //             .replace(/\s{2,}/g, " ")
  //             .trim(),
  //         },
  //       ],
  //     },
  //   ];
  // },
  // Add other Next.js configs here
});

export default nextConfig;
