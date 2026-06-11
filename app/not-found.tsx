import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found.</h1>
        <p className={styles.sub}>This page doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn-beige">
          Back to home
        </Link>
      </div>
    </div>
  );
}
