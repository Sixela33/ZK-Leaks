import React from 'react';
import { DeployedProvider } from './counter-deployment';
import { LocalStorageProvider } from './counter-localStorage';
import { Provider } from './counter-providers';
import { Logger } from 'pino';

export * from './counter-providers';
export * from './counter-localStorage';
export * from './counter-localStorage-class';
export * from './counter-deployment';
export * from './counter-deployment-class';

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;  
}

export const AppProvider = ({ children, logger }: AppProviderProps) => {
  return (
    <LocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
