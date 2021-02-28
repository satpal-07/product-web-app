import styles from '../styles/Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`primary-background ${styles.footer}`}>
      <h4>&copy; Copyright {year} Satpal Singh</h4>
    </footer>
  );
}
