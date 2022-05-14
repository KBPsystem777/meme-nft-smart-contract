const { ethers } = require("hardhat")

async function main() {
  const MyNFT = await ethers.getContractFactory("BBMNFT")

  // Start deployment
  // Returning a promise that resolves to a contract obj.
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address: ", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error)
    process.exit(1)
  })
