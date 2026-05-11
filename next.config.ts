import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [
    "@opennextjs/cloudflare",
    "resend",
    "stripe",
  ],
};

export default nextConfig;
