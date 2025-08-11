import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          YamaTo&apos;s Portfolio
        </Link>

        <nav className={styles.nav}>
          <Link href="#career" className={styles.link}>
            Career
          </Link>
          <Link href="/blog" className={styles.link}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
