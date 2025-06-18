import { MidnightMeshProvider } from "@/modules/midnight/wallet-widget";
import * as pino from "pino";
import { AppProvider } from "@/modules/midnight/counter-ui";
import { MidnightWallet } from "@/modules/midnight/wallet-widget";

export const logger = pino.pino({
  level: "trace",
});

function App() { 
  return (
    <MidnightMeshProvider logger={logger}>
      <AppProvider logger={logger}><><MidnightWallet />HOLA4</> </AppProvider>
    </MidnightMeshProvider>
  )
}

export default App
