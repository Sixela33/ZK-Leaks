import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
  plugins: [wasm(), react(), viteCommonjs(), topLevelAwait(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add any additional aliases if needed for @meshsdk packages
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
    exclude: [
      "@midnight-ntwrk/onchain-runtime",
      // Add any other problematic packages here
    ],
  },
  define: {
    "process.env": {},
    global: "globalThis",
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
