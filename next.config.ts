import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cntuqwuztmknlngsqzkb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Disable cacheComponents to avoid prerendering issues with API routes
  // Enable this only if you're using static data or SSG with proper cache handling
  // cacheComponents: true,
};

export default nextConfig;
