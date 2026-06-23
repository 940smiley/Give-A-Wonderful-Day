import '@nomicfoundation/hardhat-toolbox';
import 'solidity-coverage';
import { config as loadEnv } from 'dotenv';
import type { HardhatUserConfig } from 'hardhat/config';

loadEnv();

const expectedChainId = process.env.EXPECTED_CHAIN_ID
  ? Number(process.env.EXPECTED_CHAIN_ID)
  : 11155111;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: process.env.RPC_URL || '',
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      chainId: expectedChainId,
    },
  },
  etherscan: {
    apiKey: process.env.BLOCK_EXPLORER_API_KEY || '',
  },
};

export default config;
