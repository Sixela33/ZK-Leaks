import {
  ContractState,
  useContractsSubscriptions,
  useContractSubscription,
  useDeployedContracts,
} from "@/modules/midnight/counter-ui";

export const Counter = () => {
  const deploy = useDeployedContracts();
  const { contractDeployments } = useContractsSubscriptions();

  const action = async () => {
    await deploy.deployAndAddContract("recent");
    console.log("deployed");
  };

  return (
    <>
      <div onClick={action}>Counter</div>
      {contractDeployments.map((contractState, i) => (
        <div key={i}>
          <ContractPage contractStates={contractState} />
        </div>
      ))}
    </>
  );
};

interface ContractPageProps {
  contractStates: ContractState;
}

const ContractPage = ({ contractStates }: ContractPageProps) => {
  const { increment } = useContractSubscription(contractStates);

  return (
    <>
      <div>{contractStates.address}</div>
      <div>{contractStates.contractType}</div>
      <div onClick={increment}>Increment</div>
    </>
  );
};
