import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "hardhat";
require('dotenv').config();


const sf = await Framework.create({
  networkName: "matic",
  provider: ethers.provider,
});

// Read example
const flowInfo = await sf.cfaV1.getFlow({
    superToken: "0x...",
    sender: "0x...",
    receiver: "0x...",
    providerOrSigner: provider
  });
  console.log("flowInfo", flowInfo);
  
  // Write operation example
  const signer = sf.createSigner({ privateKey: process.env.tkey, provider });
  const createFlowOperation = sf.cfaV1.createFlow({
    sender: "0x...",
    receiver: "0x...",
    superToken: "0x...",
    flowRate: "1000000000"
  });
  const txnResponse = await createFlowOperation.exec(signer);
  const txnReceipt = await txnResponse.wait();
  // Transaction Complete when code reaches here

// const sf = await Framework.create({networkName: "matic",provider});

// // create a signer
// const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });


// const usdcx = sf.loadSuperToken("0xCAa7349CEA390F89641fe306D93591f87595dc1F");

// const txn = await approveOperation.exec(signer);

// const receipt = await txn.wait();

// // or you can create and execute the transaction in a single line
// const approveTxn = await usdcx.approve({ receiver: "0xab...", amount: ethers.utils.parseUnits("100").toString() }).exec(signer);
// const approveTxnReceipt = await approveTxn.wait();
