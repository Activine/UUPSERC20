import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

interface ENV {
  DEPLOYER_KEY: string | undefined;
  INFURA_KEY: string | undefined;
  POLYGONSCAN_API_KEY: string | undefined;
  COINMARKETCAP_API_KEY: string | undefined;
}

interface Config {
  DEPLOYER_KEY: string;
  INFURA_KEY: string;
  POLYGONSCAN_API_KEY: string;
  COINMARKETCAP_API_KEY: string;
}

const getConfig = (): ENV => {
  return {
    DEPLOYER_KEY: process.env.DEPLOYER_KEY,
    INFURA_KEY: process.env.INFURA_KEY,
    POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
    COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined || value.trim() === "") {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
