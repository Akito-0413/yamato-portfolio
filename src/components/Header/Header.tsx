import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.headerNav}>
        <ul className={styles.headerNavList}>
          <li className={styles.headerNavItem}>
            <a href="#about" className={styles.headerNavLink}>
              About
            </a>
          </li>
          <li className={styles.headerNavItem}>
            <a href="#contact" className={styles.headerNavLink}>
              Contact
            </a>
          </li>
          <li className={styles.headerNavItem}>
            <a href="#memory" className={styles.headerNavLink}>
              Memory
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
