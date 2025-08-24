import { type CounterPrivateState, type Contract, Ledger, createPrivateState } from '@meshsdk/counter-contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type CounterCircuits = ImpureCircuitId<Contract<CounterPrivateState>>;

export const CounterPrivateStateId = 'counterPrivateState';

export type CounterProviders = MidnightProviders<CounterCircuits, typeof CounterPrivateStateId, CounterPrivateState>;

export type CounterContract = Contract<CounterPrivateState>;

export type DeployedCounterContract = DeployedContract<CounterContract> | FoundContract<CounterContract>;

export type Leak = {
  id: bigint;
  uri: string;
  donation_addr: string;
  donated: bigint;
};

export type UserAction = {
  increment: string | undefined;
  createLeak: string | undefined;
};

export type DerivedState = {
  readonly round: Ledger["round"];
  readonly privateState: CounterPrivateState;
  readonly turns: UserAction;
  readonly leaks: Ledger["leaks"];
  readonly nextLeakId: Ledger["nextLeakId"];
};

export const emptyState: DerivedState = {
  round: 0n,
  privateState: createPrivateState(0),
  turns: { increment: undefined, createLeak: undefined },
  leaks: {
    isEmpty: () => true,
    size: () => 0n,
    member: () => false,
    lookup: () => ({ id: 0n, uri: "", donation_addr: "", donated: 0n }),
    [Symbol.iterator]: () => [][Symbol.iterator]()
  },
  nextLeakId: 0n,
};
