import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [
    "@opennextjs/cloudflare",
    "@neondatabase/serverless",
    "resend",
    "stripe",
  ],
};

export default nextConfig;
