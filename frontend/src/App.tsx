import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import * as pino from "pino";
import { CounterAppProvider } from "@/modules/midnight/counter-ui";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { MainLayout } from "./layouts/layout";
import { Home } from "./pages/home/";
import { SubmitLeak } from "./pages/post";
import { LeaksExplorer } from "./pages/leaks";
import { About } from "./pages/about";
import { ThemeProvider } from "./components/theme-provider";

export const logger = pino.pino({
  level: "trace",
});
// Update this network id, could be testnet or undeployed
setNetworkId(NetworkId.TestNet);
// Update this with your deployed contract address
const contractAddress =
  "02009d26b4f37afc5748919cf4ea6259f92c7cdbbb7a5876ccae8bb12210dcf09a3f";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
        <CounterAppProvider logger={logger} contractAddress={contractAddress}>
          <BrowserRouter basename="/">
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<SubmitLeak />} />
                <Route path="/leaks" element={<LeaksExplorer />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CounterAppProvider>
      </MidnightMeshProvider>
    </ThemeProvider>
  );
}

export default App;
