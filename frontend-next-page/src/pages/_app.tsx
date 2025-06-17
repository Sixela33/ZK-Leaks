import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MidnightMeshProvider } from "@/modules/midnight/wallet-widget";
import * as pino from "pino";
import { AppProvider } from "@/modules/midnight/counter-ui";

export const logger = pino.pino({
  level: "trace",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MidnightMeshProvider logger={logger}>
      <AppProvider logger={logger}><Component {...pageProps} /></AppProvider>
    </MidnightMeshProvider>
  );
}
