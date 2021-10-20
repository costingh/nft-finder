import { useState } from "react";
import styles from "../styles/EthTransactionPanel.module.css";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError("Error");
    /* console.log(err.message); */
  }
};

export default function EthTransactionPanel({ donate, toggleDonationMenu }) {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: "0x85c550F57aC72F8ddcbf638dFfD4a60d610B4814",
    });
  };

  return (
    <div className={donate ? styles.overlay : styles.overlayHidden}>
      <form onSubmit={handleSubmit} className={styles.innerOverlay}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#e1e1e1"
          className={styles.closeMenu}
          onClick={toggleDonationMenu}
        >
          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
        <p className={styles.yellow}>Wallet Address:</p>
        <p className={styles.walletAddress}>
          0x85c550F57aC72F8ddcbf638dFfD4a60d610B4814
        </p>
        <p className={styles.alternativeDonationTitle}>OR</p>
        <div className={styles.donateBtn}>
          <input
            className={styles.selectPrice}
            name="ether"
            type="text"
            placeholder="Amount in ETH"
          />
          <button className={styles.btn} type="submit">
            PAY NOW
          </button>
        </div>

        <ErrorMessage message={error} />
        {/* <ErrorMessage message={error} />
        <TxList txs={txs} /> */}
      </form>
    </div>
  );
}
