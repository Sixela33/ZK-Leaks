import React from 'react';
import { DeployedProvider } from './counter-deployment';
import { LocalStorageProvider } from './counter-localStorage';
import { Provider } from './counter-providers';
import { Logger } from 'pino';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export * from './counter-providers';
export * from './counter-localStorage';
export * from './counter-localStorage-class';
export * from './counter-deployment';
export * from './counter-deployment-class';

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;
  TOKEN_ADDRESS: ContractAddress;
}

export const AppProvider = ({ children, logger, TOKEN_ADDRESS }: AppProviderProps) => {
  return (
    <LocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger} TOKEN_ADDRESS={TOKEN_ADDRESS}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
