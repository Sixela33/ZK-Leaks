import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  createLeak(context: __compactRuntime.CircuitContext<T>,
             uri_0: string,
             donation_addr_0: string): __compactRuntime.CircuitResults<T, []>;
  getLeak(context: __compactRuntime.CircuitContext<T>, id_0: bigint): __compactRuntime.CircuitResults<T, { id: bigint,
                                                                                                           uri: string,
                                                                                                           donation_addr: string,
                                                                                                           donated: bigint
                                                                                                         }>;
  increment(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  decrement(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  createLeak(context: __compactRuntime.CircuitContext<T>,
             uri_0: string,
             donation_addr_0: string): __compactRuntime.CircuitResults<T, []>;
  getLeak(context: __compactRuntime.CircuitContext<T>, id_0: bigint): __compactRuntime.CircuitResults<T, { id: bigint,
                                                                                                           uri: string,
                                                                                                           donation_addr: string,
                                                                                                           donated: bigint
                                                                                                         }>;
  increment(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  decrement(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  leaks: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { id: bigint,
                             uri: string,
                             donation_addr: string,
                             donated: bigint
                           };
    [Symbol.iterator](): Iterator<[bigint, { id: bigint, uri: string, donation_addr: string, donated: bigint }]>
  };
  readonly nextLeakId: bigint;
  readonly round: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
