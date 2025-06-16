// decrypt.js
const ethers = require("ethers");
const fs = require("fs");
const readline = require("readline");

async function main() {
  const envContent = fs.readFileSync("./packages/hardhat/.env", "utf8");
  const match = envContent.match(/\{.+\}/s);
  if (!match) {
    console.error("❌ Couldn't find encrypted JSON in .env");
    return;
  }

  const encryptedJson = match[0];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter the password to decrypt your wallet: ", async function (password) {
    try {
      const wallet = await ethers.Wallet.fromEncryptedJson(encryptedJson, password);
      console.log("\n✅ Decrypted Private Key:\n", wallet.privateKey);
    } catch (err) {
      console.error("❌ Failed to decrypt:", err.message);
    }
    rl.close();
  });
}

main();
