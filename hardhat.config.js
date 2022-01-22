require("@nomiclabs/hardhat-waffle");

let secret = require("./secret.json")



// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });
//`https://rpc-mumbai.maticvigil.com/v1/208a7a3545b45bf99cc27b30564b25788a4b7136

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId:1337
    },
    mumbai: {
      url: secret.url,
      accounts: [secret.privatekey],
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};


/// Matic Config for mumbai testnet

// Network Name: Mumbai Testnet
// New RPC URL: https://rpc-mumbai.matic.today
// Chain ID: 80001
// Currency Symbol: MATIC
// Block Explorer URL: https://explorer-mumbai.maticvigil.com/
