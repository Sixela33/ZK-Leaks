import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Enable async WebAssembly and top-level await
    config.experiments = {
      ...(config.experiments || {}),
      topLevelAwait: true,
      asyncWebAssembly: true,
    };
    // Support loading .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });   
    // Support CommonJS .cjs files
    config.module.rules.push({
      test: /\.cjs$/,
      type: "javascript/auto",
    });
      
    return config;
  },
};

export default nextConfig;
