import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import * as pino from "pino";
import { AppProvider } from "@/modules/midnight/counter-ui";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { MainLayout } from "./layouts/layout";
import { Home } from "./pages/home/";
import { Counter } from "./pages/counter";
import { Wallet } from "./pages/wallet";
import { WalletUI } from "./pages/wallet-ui";
import { ThemeProvider } from "./components/theme-provider";

export const logger = pino.pino({
  level: "trace",
});
setNetworkId(NetworkId.Undeployed);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
        <AppProvider logger={logger}>
          <BrowserRouter basename="/">
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/wallet-ui" element={<WalletUI />} />
                <Route path="/counter" element={<Counter />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </MidnightMeshProvider>
    </ThemeProvider>
  );
}

export default App;
