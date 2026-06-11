'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PowerMark from './ui/PowerMark';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Team', href: '/team' },
  { label: 'Thesis', href: '/thesis' },
  { label: 'Press', href: '/press' },
  { label: 'Blog', href: '/blog' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} ref={menuRef as React.RefObject<HTMLElement>}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Press On Ventures — Home">
          <PowerMark className={styles.mark} />
          <span className={styles.word}>Press On</span>
        </Link>

        <div className={styles.links}>
          {NAV_LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`${styles.link} ${isActive(n.href) ? styles.active : ''}`}
            >
              {n.label}
            </Link>
          ))}
          <a
            href="https://www.fundpanel.io/Login"
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            Investor Login
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.hbar} ${menuOpen ? styles.hbarTop : ''}`} />
          <span className={`${styles.hbar} ${menuOpen ? styles.hbarMid : ''}`} />
          <span className={`${styles.hbar} ${menuOpen ? styles.hbarBot : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`${styles.mobileLink} ${isActive(n.href) ? styles.mobileLinkActive : ''}`}
            >
              {n.label}
            </Link>
          ))}
          <a
            href="https://www.fundpanel.io/Login"
            className={styles.mobileCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            Investor Login
          </a>
        </div>
      )}
    </nav>
  );
}
