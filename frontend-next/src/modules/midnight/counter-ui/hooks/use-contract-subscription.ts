import {
  ContractState,
  ContractDeployment,
} from '@/modules/midnight/counter-ui';
import {  DerivedState } from '../api/common-types';
import { useEffect, useState } from 'react';
import { ContractControllerInterface } from '../api/contractController';


export const useAuctionContractSubscription = (contractStates?: ContractState, key?: string | number) => {
  const [contractDeployment, setContractDeployment] = useState<ContractDeployment>();
  const [deployedContractAPI, setDeployedContractAPI] = useState<ContractControllerInterface>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [contractState, setContractState] = useState<DerivedState>();
  const [isLoading, setIsLoading] = useState(!!contractStates?.observable);

  /** ✅ Force reset state when key (modal) changes */
  useEffect(() => {
    setContractDeployment(undefined);
    setDeployedContractAPI(undefined);
    setContractState(undefined);
    setErrorMessage(undefined);
    setIsLoading(!!contractStates?.observable);
  }, [key]); // 👈 Resets state when a new contract is selected (modal reopens)

  useEffect(() => {
    if (!contractStates?.observable) {
      return;
    }
    const subscription = contractStates.observable.subscribe(setContractDeployment);

    return () => {
      subscription.unsubscribe();
    };
  }, [contractStates?.observable]);

  useEffect(() => {
    if (!contractDeployment) {
      return;
    }
    if (contractDeployment.status === 'in-progress') {
      return;
    }
    setIsLoading(false);

    if (contractDeployment.status === 'failed') {
      setErrorMessage(
        contractDeployment.error.message.length ? contractDeployment.error.message : 'Encountered an unexpected error.',
      );
      return;
    }
    setDeployedContractAPI((prev) => prev || contractDeployment.api);
  }, [contractDeployment, setIsLoading, setErrorMessage, setDeployedContractAPI]);

  useEffect(() => {
    if (deployedContractAPI) {
      const subscriptionDerivedState = deployedContractAPI.state$.subscribe(setContractState);
      return () => {
        subscriptionDerivedState.unsubscribe();
      };
    }
  }, [deployedContractAPI]);

  const increment = async () => {
    if (deployedContractAPI) {
      try {
        await deployedContractAPI.increment();
      } catch (e) {
        throw e;
      }
    }
  };  
  
  return {
    contractDeployment,
    deployedContractAPI,
    errorMessage,
    contractState,
    isLoading,
    increment,    
  };
};
