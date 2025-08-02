import {  
  useContractSubscription,
  useDeployedContracts,
} from "@/modules/midnight/counter-ui";

export const Counter = () => {
  const deploy = useDeployedContracts();  
  const { deployedContractAPI, derivedState} = useContractSubscription();

  const deployNew = async () => {
    await deploy.deployContract();
    console.log("deployed");
  };

  const increment = async () => {
    if (deployedContractAPI) {
      try {
        await deployedContractAPI.increment();
      } catch (e) {
        throw e;
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Counter Contracts</h1>
      <button
        className="px-4 py-2 mb-6 bg-primary text-primary-foreground rounded shadow cursor-pointer"
        onClick={deployNew}
      >
        Deploy New Contract
      </button>      
      <div className="card bg-card shadow p-4 flex flex-col gap-2">     
      <button
        className="self-start px-3 py-1 bg-secondary text-secondary-foreground rounded cursor-pointer"
        onClick={increment}
      >
        Increment
      </button>
      <p className="text-lg font-semibold">Counter value: {derivedState?.round}</p>
      <p className="text-lg font-semibold">Private data: {derivedState?.privateState.privateCounter}</p>
      <p className="text-lg font-semibold">Turns: {derivedState?.turns.increment}</p>
    </div>
    </>
  );
};


