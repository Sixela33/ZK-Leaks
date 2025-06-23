import {
  ContractState,
  useContractsSubscriptions,
  useContractSubscription,
  useDeployedContracts,
} from "@/modules/midnight/counter-ui";

export const Counter = () => {
  const deploy = useDeployedContracts();
  const { contractDeployments } = useContractsSubscriptions();

  const deployNew = async () => {
    await deploy.deployAndAddContract("recent");    
    console.log("deployed");
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

      <div className="space-y-4">
        {contractDeployments.map((contractState, i) => (
          <ContractPage key={i} contractStates={contractState} />
        ))}
      </div>
    </>
  );
};

interface ContractPageProps {
  contractStates: ContractState;
}

const ContractPage = ({ contractStates }: ContractPageProps) => {
  const { increment, contractState } = useContractSubscription(contractStates);

  return (
    <div className="card bg-card shadow p-4 flex flex-col gap-2">
      <div className="font-mono text-sm break-all">Address: {contractStates.address}</div>
      <div className="text-muted-foreground text-sm">Type: {contractStates.contractType}</div>
      <div className="text-muted-foreground text-sm">Value: {contractState?.round}</div>
      <button
        className="self-start px-3 py-1 bg-secondary text-secondary-foreground rounded cursor-pointer"
        onClick={increment}
      >
        Increment
      </button>
    </div>
  );
};
