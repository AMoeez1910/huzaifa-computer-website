import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable cacheComponents to avoid prerendering issues with API routes
  // Enable this only if you're using static data or SSG with proper cache handling
  // cacheComponents: true,
};

export default nextConfig;
