import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  publicExcludes: ["!robots.txt", "!sitemap.xml"],
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  // Add other Next.js configs here
});

export default nextConfig;
