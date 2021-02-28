import styles from '../styles/Header.module.css';

export default function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles['top-title']}>
        <div className={styles['title-wrap']}>
          <div className={styles.title}>
            <h1>{props.title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
