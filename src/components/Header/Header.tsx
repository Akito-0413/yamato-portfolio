import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          YamaTo's Portfolio
        </a>
        <nav className={styles.nav}>
          <a href="/" className={styles.link}>
            Top
          </a>
          <a href="/blog" className={styles.link}>
            Blog
          </a>
        </nav>
      </div>
    </header>
  );
}
