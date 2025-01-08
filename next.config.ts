import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // If you want to force build even with type errors (not recommended)
     ignoreBuildErrors: true,
  },
  images : {
    domains: ["cdn-icons-png.flaticon.com"]
  }
};

export default nextConfig;
