require('dotenv').config(); 
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      url: process.env.FUJI_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
