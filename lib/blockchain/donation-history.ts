import { ethers } from 'ethers';
import { getContract } from '../../app/contract/nonprofit';

export type DonationEventRecord = {
  key: string;
  transactionHash: string;
  logIndex: number;
  blockNumber: number;
  donor: string;
  amountWei: bigint;
  amountEth: string;
  message: string;
  timestamp: bigint;
};

export type DonationHistoryAdapter = {
  loadRecentDonations(options: { blockWindow: number }): Promise<DonationEventRecord[]>;
};

export class DirectRpcDonationHistoryAdapter implements DonationHistoryAdapter {
  constructor(private readonly provider: ethers.BrowserProvider | ethers.JsonRpcProvider) {}

  async loadRecentDonations(options: { blockWindow: number }): Promise<DonationEventRecord[]> {
    const latestBlock = await this.provider.getBlockNumber();
    const fromBlock = Math.max(0, latestBlock - options.blockWindow);
    const contract = getContract(this.provider) as ethers.Contract & {
      filters: { DonationReceived: () => ethers.DeferredTopicFilter };
    };
    const events = await contract.queryFilter(
      contract.filters.DonationReceived(),
      fromBlock,
      latestBlock,
    );
    const records = new Map<string, DonationEventRecord>();

    for (const event of events) {
      if (!('args' in event)) {
        continue;
      }

      const key = `${event.transactionHash}-${event.index}`;
      records.set(key, {
        key,
        transactionHash: event.transactionHash,
        logIndex: event.index,
        blockNumber: event.blockNumber,
        donor: String(event.args.donor),
        amountWei: event.args.amount as bigint,
        amountEth: ethers.formatEther(event.args.amount as bigint),
        message: String(event.args.message ?? ''),
        timestamp: event.args.timestamp as bigint,
      });
    }

    return Array.from(records.values()).sort((a, b) => {
      if (a.blockNumber !== b.blockNumber) {
        return b.blockNumber - a.blockNumber;
      }
      return b.logIndex - a.logIndex;
    });
  }
}
