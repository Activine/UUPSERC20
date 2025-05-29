# Upgradeable ERC20 Token

# Description

This project implements an upgradeable ERC20 token using the UUPS proxy pattern via OpenZeppelin's upgradeable contracts. It supports standard ERC20 functionality with additional features such as:

- Minting (restricted to the owner)
- Burning tokens
- Upgradeability with UUPS (only owner can upgrade)
- Fully compatible with proxy deployment and Hardhat Ignition

This repository is suitable for token deployment on various EVM networks and includes tools for compiling, deploying, verifying, testing, and auditing.

# Design Choices

### Upgradeability via UUPS

- The contract uses the UUPSUpgradeable pattern instead of TransparentUpgradeableProxy.
- UUPS was chosen for better gas efficiency and more direct control over upgradeability logic.
- Upgrade control is explicitly restricted via the \_authorizeUpgrade function, using the onlyOwner modifier.

### Initialization Support

- The contract inherits from Initializable and uses the initialize function instead of a constructor.
- This design is essential for proxy deployments, as constructors do not run when deploying through proxies.
- The constructor disables further initializations using \_disableInitializers() to protect the implementation contract.

### Minting & Burning

- Minting is restricted to the owner, using OpenZeppelin's OwnableUpgradeable.
- Burning is open to any holder via ERC20BurnableUpgradeable, allowing users to reduce their own balances.

### Modular & Composable

- Built entirely on modular OpenZeppelin contracts for reliability and auditability.
- Clear separation of concerns: ownership logic, upgrade logic, and token logic are inherited from well-tested libraries.

# Project structure

```
.
├── contracts/
│   └── UpgradeableERC20.sol          # Main upgradeable ERC20 token logic contract
├── ignition/
│   └── modules/
│       └── Token.ts                  # Ignition module for deployment
├── test/                             # Test cases
├── .env.example                      # Sample environment variables
├── hardhat.config.ts                 # Hardhat configuration
├── package.json
└── README.md                         # Current file
```

## Local development

### Prerequisites

- [node v20.18.1](https://www.npmjs.com/package/node/v/20.18.1) or higher
- [hardhat v2.24.0](https://www.npmjs.com/package/hardhat/v/2.24.0)
- [solidity v0.8.28](https://github.com/ethereum/solidity/releases/tag/v0.8.28)

### .ENV

Create and fill _.env_ file.

```sh
cp .env.example .env
```

- `DEPLOYER_KEY` - private key
- `INFURA_KEY` - infura api key for upload contracts to test network
- `POLYGONSCAN_API_KEY` - etherscan api key for verify contracts
- `COINMARKETCAP_API_KEY` - coinmarketcap api key

### Install the dependencies

```
npm i
```

OR

```
yarn install
```

---

### Compile contracts

```sh
npm run compile
```

---

### Deploy contract

```sh
npm run ignition:<NETWORK> (polygon, polygonAmoy) ignition/modules/Token.ts
```

---

### Verify contracts

```sh
npm run verify:<NETWORK> (polygon, polygonAmoy)
```

---

### Tests contracts

```sh
npm run test

```

---

### Coverage

```sh
npm run coverage
```

---

## Auto audit with slither

To run the analyzer, you must first install it globally

To audit all contracts, use the command :

```sh
slither .
```
