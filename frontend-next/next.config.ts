import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile ESM packages that ship untranspiled code or use Node APIs
  transpilePackages: [
    "@meshsdk/midnight-react",
    "@meshsdk/midnight-core",
    "@meshsdk/midnight-wallet",
    "@midnight-ntwrk/ledger",
    "@midnight-ntwrk/midnight-js-types",
    "@midnight-ntwrk/midnight-js-indexer-public-data-provider",
    "@midnight-ntwrk/midnight-js-level-private-state-provider",
    "@midnight-ntwrk/midnight-js-network-id",
    "@midnight-ntwrk/zswap",
  ],
};

export default nextConfig;
