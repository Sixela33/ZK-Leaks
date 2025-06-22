import path from 'path';
import { TestEnvironment } from './commons';
import { nativeToken, tokenType } from '@midnight-ntwrk/ledger';
import { type Wallet } from '@midnight-ntwrk/wallet-api';
import type { Resource } from '@midnight-ntwrk/wallet';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { type CounterProviders } from '../common-types';
import * as api from '../api';
import { currentDir } from '../config';
import { createLogger } from '../logger-utils';

const my_own_wallet =
  'mn_shield-addr_undeployed1k3ezzkdz8y04vua8hpnrrzp5rdxzrml7ulx5tdx9zekvxqe22w9qxqqlhexc5jng5cceqcsfklcfmpwvy5hsuvd9eq0qvc3e39u89pw43qcsp6x9';
const logDir = path.resolve(currentDir, '..', 'logs', 'prepare-standalone', `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

describe('Prepare Standalone', () => {
  let testEnvironment: TestEnvironment;
  let wallet: Wallet & Resource;
  let providers: CounterProviders;
  let keepAliveInterval: NodeJS.Timeout;

  async function sendNativeToken(address: string, amount: bigint): Promise<string> {
    const transferRecipe = await wallet.transferTransaction([
      {
        amount,
        receiverAddress: address,
        type: nativeToken(),
      },
    ]);
    const transaction = await wallet.proveTransaction(transferRecipe);
    return await wallet.submitTransaction(transaction);
  }

  beforeAll(
    async () => {
      api.setLogger(logger);
      testEnvironment = new TestEnvironment(logger);
      const testConfiguration = await testEnvironment.start();
      wallet = await testEnvironment.getWallet();
      providers = await api.configureProviders(wallet, testConfiguration.dappConfig);
      keepAliveInterval = setInterval(() => {
        console.log('Keeping container alive...');
      }, 60000); // every 60 seconds
    },
    1000 * 60 * 45,
  );

  afterAll(
    async () => {
      try {
        // await testEnvironment.shutdown();
        clearInterval(keepAliveInterval);
        await new Promise(() => {});
      } catch (e) {
        // ignore
      }
    },
    1000 * 60 * 60 * 24 * 7,
  );

  it('Initialize standalone', async () => {    
    await sendNativeToken(my_own_wallet, 10000n * 1000000n);
    logger.info('funded');
  });
});
