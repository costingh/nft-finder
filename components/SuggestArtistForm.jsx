import styles from "../styles/EthTransactionPanel.module.css";

export default function SuggestArtistForm({
  suggestArtistOpened,
  setSuggestArtistOpened,
}) {
  return (
    <div
      className={suggestArtistOpened ? styles.overlay : styles.overlayHidden}
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#e1e1e1"
        className={styles.closeMenu}
        onClick={() => setSuggestArtistOpened(false)}
      >
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
      </svg>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdWKLvdEkn3JA69C3w4Y5hEHtWXTl8N1h6U5-FzdZZJuERn-g/viewform?embedded=true"
        width="640"
        height="752"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
}
