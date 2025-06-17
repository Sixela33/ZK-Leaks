import type { PropsWithChildren } from 'react';
import React, { createContext, useMemo } from 'react';
import { type Logger } from 'pino';

import type { DeployedAPIProvider } from './counter-deployment-class';
import { useLocalState } from '../hooks/use-localStorage';
import { DeployedTemplateManager } from './counter-deployment-class';
import { useProviders } from '../hooks';

export const DeployedProviderContext = createContext<DeployedAPIProvider | undefined>(undefined);

export type DeployedProviderProps = PropsWithChildren<{
  logger: Logger;  
}>;

export const DeployedProvider = ({ logger, children }: DeployedProviderProps) => {
  const localState = useLocalState();
  const providers = useProviders();
  const manager = useMemo(() => {
    return new DeployedTemplateManager(logger, localState, providers?.providers);
  }, [logger, localState, providers?.providers]);

  return (
    <DeployedProviderContext.Provider value={manager}>
      {children}
    </DeployedProviderContext.Provider>
  );
};
