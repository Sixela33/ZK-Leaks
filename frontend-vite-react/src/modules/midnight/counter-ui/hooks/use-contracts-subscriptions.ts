import {
  useDeployedContracts,
  ContractState,
  useLocalState,
} from "@/modules/midnight/counter-ui";
import { useCallback, useEffect, useState } from "react";

export const useContractsSubscriptions = () => {
  const localState = useLocalState();
  const deploy = useDeployedContracts();
  const [contractDeployments, setContractDeployments] = useState<
    ContractState[]
  >([]);

  const contractDeployments_refresh = useCallback(() => {
    localState.getContracts().forEach((contractAddress) => {
      // provider to get contract state to filter (could be a database or indexer, tradeoffs??)
      deploy.addContract("recent", contractAddress);
    });
    const subscription = deploy.contractDeployments$.subscribe(
      (newDeployments) => {
        console.log("New contract deployments received:", newDeployments);
        setContractDeployments(newDeployments);
      }
    );
    return subscription;
  }, [deploy, localState]);

  useEffect(() => {
    const subscription = contractDeployments_refresh();

    return () => {
      subscription.unsubscribe();
    };
  }, [contractDeployments_refresh]);

  return {
    contractDeployments,
    contractDeployments_refresh,
  };
};
