import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MidnightMeshProvider } from "@/components/midnight/wallet-widget";
import * as pino from "pino";

export const logger = pino.pino({
  level: "trace",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MidnightMeshProvider logger={logger}><Component {...pageProps} /></MidnightMeshProvider>
  );
}
