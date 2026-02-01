import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <Link href="/" className={styles.logo}>
          <span className={styles['logo-text']}>DreamLife</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="#features">Features</Link>
          <Link href="#preview">Preview</Link>
        </nav>
      </div>
    </header>
  );
}
