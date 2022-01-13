//add the required modules
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");
//keypair class allows us to create a new wallet
   const newPair = new Keypair();
   console.log(newPair);
   const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
   const secretKey = newPair._keypair.secretKey;
   console.log(typeof(secretKey))
   const getWalletBalance = async () => {
       try{
           const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
           //create a wallet object from secret key.
           const myWallet = await Keypair.fromSecretKey(secretKey);
           //querying the balance
           const walletBalance = await connection.getBalance(
               new PublicKey(myWallet.publicKey)
           );
           console.log(`=> For wallet address ${publicKey}`)
           console.log(`Wallet Balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
       } catch(ex) {
           console.log(ex);
       }
   };
   //airdrop sol into our wallet
   const airDropSol = async () => {
       try{
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.log(`- Airdropping 2 SOL -`)
        // allocating sol to a specific address
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2*LAMPORTS_PER_SOL
        ); await connection.confirmTransaction(fromAirDropSignature);
       } catch(ex){
           console.log(ex);
       }
   };
   const driverFunction = async()=> {
       await getWalletBalance();
       await airDropSol();
       await getWalletBalance();
   }
   driverFunction();
