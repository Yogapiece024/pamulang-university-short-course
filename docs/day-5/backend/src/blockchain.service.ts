import { Injectable } from '@nestjs/common';
import { createPublicClient, http } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';


@Injectable()
export class BlockchainService {
  private client = createPublicClient({
    chain: avalancheFuji,
    transport: http('https://api.avax-test.network/ext/bc/C/rpc'),
  });

  private account = privateKeyToAccount(
  process.env.PRIVATE_KEY as `0x${string}`,
);

private walletClient = createWalletClient({
  account: this.account,
  chain: avalancheFuji,
  transport: http('https://api.avax-test.network/ext/bc/C/rpc'),
});


  private ABI = [
    {
      inputs: [],
      name: 'getValue',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_value', type: 'uint256' }],
      name: 'setValue',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];


  private CONTRACT_ADDRESS: `0x${string}` =
    '0x0dE0a456B624E83a87307F85809A8d2D0C90041c';

  async getValue(): Promise<bigint> {
    return (await this.client.readContract({
      address: this.CONTRACT_ADDRESS,
      abi: this.ABI,
      functionName: 'getValue',
    })) as bigint;
  }

  async setValue(newValue: number) {
  const hash = await this.walletClient.writeContract({
    address: this.CONTRACT_ADDRESS,
    abi: this.ABI,
    functionName: 'setValue',
    args: [BigInt(newValue)],
  });

    return { txHash: hash };
  }
}
