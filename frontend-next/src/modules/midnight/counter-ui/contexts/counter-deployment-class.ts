import { type ContractControllerInterface, type CounterProviders, ContractController, CounterPrivateStateId  } from '@meshsdk/counter-cli';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { BehaviorSubject, type Observable } from 'rxjs';
import { type Logger } from 'pino';
import { type LocalStorageProps } from './counter-localStorage-class';

export type ContractType = 'recent' | 'youcouldjoin' | 'yours' | 'allOther';
export type ContractDeployment = InProgressContractDeployment | DeployedContract | FailedContractDeployment;

export interface InProgressContractDeployment {
  readonly status: 'in-progress';
  readonly address?: ContractAddress;
}

export interface DeployedContract {
  readonly status: 'deployed';
  readonly api: ContractControllerInterface;
  readonly address: ContractAddress;
}

export interface FailedContractDeployment {
  readonly status: 'failed';
  readonly error: Error;
  readonly address?: ContractAddress;
}

export interface ContractState {
  readonly observable: BehaviorSubject<ContractDeployment>;
  readonly contractType: ContractType;
  address?: ContractAddress;
}

export interface DeployedAPIProvider {
  readonly contractDeployments$: Observable<ContractState[]>;
  readonly addContract: (contractType: ContractType, contractAddress: ContractAddress) => ContractState;
  readonly deployAndAddContract: (
    contractType: ContractType,    
  ) => Promise<ContractState>;
}

export class DeployedTemplateManager implements DeployedAPIProvider {
  readonly #contractDeploymentsSubject: BehaviorSubject<ContractState[]>;
  readonly contractDeployments$: Observable<ContractState[]>;

  constructor(
    private readonly logger: Logger,
    private readonly localState: LocalStorageProps,    
    private readonly providers?: CounterProviders,
  ) {
    this.#contractDeploymentsSubject = new BehaviorSubject<ContractState[]>([]);
    this.contractDeployments$ = this.#contractDeploymentsSubject;
  }  

  addContract(contractType: ContractType, contractAddress: ContractAddress): ContractState {
    const deployments = this.#contractDeploymentsSubject.value;

    const deployment = new BehaviorSubject<ContractDeployment>({
      status: 'in-progress',
      address: contractAddress,
    });

    const contract: ContractState = { observable: deployment, contractType, address: contractAddress };

    const deploymentsToKeep = deployments.filter(
      (deployment) => !(deployment.observable.value.address === contractAddress && deployment.contractType === contractType),
    );
    this.#contractDeploymentsSubject.next([...deploymentsToKeep, contract]);
    void this.join(deployment, contractAddress);

    return contract;
  }

  async deployAndAddContract(
    contractType: ContractType,    
  ): Promise<ContractState> {
    const deployments = this.#contractDeploymentsSubject.value;

    const deployment = new BehaviorSubject<ContractDeployment>({
      status: 'in-progress',
    });

    const contract: ContractState = { observable: deployment, contractType };

    this.#contractDeploymentsSubject.next([...deployments, contract]);
    const address = await this.deploy(deployment);

    return { observable: deployment, contractType, address };
  }

  private async deploy(
    deployment: BehaviorSubject<ContractDeployment>,    
  ): Promise<string | undefined> {
    try {
      if (this.providers) {              
        const api = await ContractController.deploy(
          CounterPrivateStateId,          
          this.providers,
          this.logger,         
        );        
        this.localState.setContractPrivateId(CounterPrivateStateId, api.deployedContractAddress);
        this.localState.addContract(api.deployedContractAddress);

        deployment.next({
          status: 'deployed',
          api,
          address: api.deployedContractAddress,
        });
        return api.deployedContractAddress;
      } else {
        deployment.next({
          status: 'failed',
          error: new Error('Providers are not available'),
        });
      }
    } catch (error: unknown) {
      this.logger.error(error);
      deployment.next({
        status: 'failed',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
    return undefined;
  }

  private async join(deployment: BehaviorSubject<ContractDeployment>, contractAddress: ContractAddress): Promise<void> {
    try {
      if (this.providers) {        
        const item = this.localState.getContractPrivateId(contractAddress);        
        let uuid: string;
        if (item != null) {
          uuid = item;
        } else {
          this.localState.setContractPrivateId(CounterPrivateStateId, contractAddress);
        }
        const api = await ContractController.join(CounterPrivateStateId,  this.providers, contractAddress, this.logger);

        deployment.next({
          status: 'deployed',
          api,
          address: api.deployedContractAddress,
        });
      } else {
        deployment.next({
          status: 'failed',
          error: new Error('Providers are not available'),
        });
      }
    } catch (error: unknown) {
      this.logger.error(error);
      deployment.next({
        status: 'failed',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }
}
