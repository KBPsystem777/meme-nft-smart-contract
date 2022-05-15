require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/NFT.sol/BBMNFT.json")

console.log("ABI: ", contract)

const contractAddress = "0x8CC01B1654288c79AF5B090e3664310F38acB792"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")
  // Transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  // Signing the transaction
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The transaction hash is: ",
              hash,
              "\nCheck Alchemy's member pool to view the status of your transaction"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction: ",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed: ", err)
    })
}

mintNFT("ipfs://QmXBBKrZkemxm4QhbzbTRjv78WUuiJ1UmzJqW9XLMUQ3XD")
