import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "tsconfig-paths/register";

import envConfig from "./config";

const { DEPLOYER_KEY, INFURA_KEY, POLYGONSCAN_API_KEY, COINMARKETCAP_API_KEY } = envConfig;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      chainId: 137,
      accounts: [DEPLOYER_KEY || ""],
    },
    polygonAmoy: {
      url: `https://polygon-amoy.infura.io/v3/${INFURA_KEY}`,
      chainId: 80002,
      accounts: [DEPLOYER_KEY || ""],
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY || "",
      polygonAmoy: POLYGONSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
    ],
  },
  gasReporter: {
    enabled: false,
    coinmarketcap: COINMARKETCAP_API_KEY,
    currency: "USD",
    token: "ETH",
    gasPrice: 2,
  },
};

export default config;
