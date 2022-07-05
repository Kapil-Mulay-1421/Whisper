import * as nearAPI from "near-api-js";

const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};


// sends NEAR tokens
const transact = async (sender, receiver, amount) => {
    // connect to NEAR
    const near = await connect(config);

    // create wallet connection
    const wallet = new WalletConnection(near);
    
    try {
      const account = await near.account(sender);
      await account.sendMoney(
      receiver, // receiver account
      amount // amount in yoctoNEAR
      );
    } catch(err) {
      alert("Sorry, couldn't transfer " + err)
    }
   
}

export { transact }
