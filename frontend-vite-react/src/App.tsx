import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MidnightMeshProvider } from "@/modules/midnight/wallet-widget";
import * as pino from "pino";
import { AppProvider } from "@/modules/midnight/counter-ui";
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { MainLayout } from './components/layout';
import { Wallet } from './components/index';

export const logger = pino.pino({
  level: "trace",
});
setNetworkId(NetworkId.Undeployed);

function App() { 
  return (
    <MidnightMeshProvider logger={logger}>
      <AppProvider logger={logger}>
      <BrowserRouter basename="/">
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Wallet />} />                
              </Route>
            </Routes>
          </BrowserRouter>        
      </AppProvider>
    </MidnightMeshProvider>
  )
}

export default App
