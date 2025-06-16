import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Enable async WebAssembly
    config.experiments = {
      ...(config.experiments || {}),
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default nextConfig;
