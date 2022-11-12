const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const [_arg0, _arg1, publicKey] = process.argv;

console.log("Public Key of the generated keypair", publicKey);

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(new PublicKey(publicKey));
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("airdropping sol");

    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const mainFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

mainFunction();
