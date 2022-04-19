//deployment to a non node.js server
//import 'https://cdn.skypack.dev/@officient/regenerator-runtime';

//depencies for node.js server
const ethers = require("ethers");
//async permitter
import "regenerator-runtime";

var wallet_addresses, wallet_balances, new_wallet_address,
    new_wallet_balance, new_wallet_private_key, new_wallet_public_key,
    new_wallet_mnemonics;

const provider = new ethers.providers.Web3Provider(window.ethereum);

var wallet_address = null,
    signer = null,
    accounts = null,
    wallet_balance = null;

//connecting to meta mask
const main = async () => {

   try {

      accounts = await provider.send("eth_requestAccounts", []);

      signer = provider.getSigner();
      wallet_address = await signer.getAddress();
      wallet_addresses.value = wallet_address;

      wallet_balances.value = await getBalance() + "ETH";
    

   } catch (exp) {
       console.log(exp);
   } 
} 

async function getBalance ()
{
    
    wallet_balance = await provider.getBalance(wallet_address);
    const balance = ethers.utils.formatEther(wallet_balance);
    
    return (balance);
}

//creating ethereum based wallets
const createWallet = async () => 
{

   const newWallet = await ethers.Wallet.createRandom();
   
   const wallet_details = {
       private_key : newWallet.privateKey,
       address : newWallet.address,
       public_key : newWallet.publicKey,
       mnemonics : newWallet.mnemonic.phrase
   };

   return wallet_details;

}

//window loading
window.onload = async () =>
{

          wallet_addresses = document.querySelector("#wallet_address"),
          wallet_balances = document.querySelector("#wallet_balance"),
          new_wallet_address = document.querySelector("#new_wallet_address"),
          new_wallet_balance = document.querySelector("#new_wallet_balance"),
          new_wallet_private_key = document.querySelector("#new_wallet_private_key"),
          new_wallet_public_key = document.querySelector("#new_wallet_public_key"),
          create_wallet = document.querySelector("#create_wallet"),
          connect_metamask = document.querySelector("#connect_metamask"),
          new_wallet_mnemonics = document.querySelector("#new_wallet_mnemonics");

    connect_metamask.addEventListener("click", async () => {
      main();
    });

    create_wallet.addEventListener("click", async () => {
        create_wallet.innerHTML = "Loading";
        var data = await createWallet(); 
        new_wallet_address.value = data.address;
        new_wallet_balance.value = "0.0ETH";
        new_wallet_mnemonics.value = data.mnemonics;
        new_wallet_private_key.value = data.private_key;
        new_wallet_public_key.value = data.public_key;
        create_wallet.innerHTML = "CREATE WALLET";
    });

}

