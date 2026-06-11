import Link from 'next/link';
import PowerMark from './ui/PowerMark';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <PowerMark className={styles.mark} />
              <span className={styles.word}>Press On Ventures</span>
            </div>
            <p className={styles.tagline}>
              Investing in resilient founders building transformative consumer businesses.
            </p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h4 className={styles.colHead}>Explore</h4>
              <Link href="/portfolio" className={styles.colLink}>Portfolio</Link>
              <Link href="/team" className={styles.colLink}>Team</Link>
              <Link href="/press" className={styles.colLink}>Press</Link>
              <Link href="/blog" className={styles.colLink}>Blog</Link>
            </div>
            <div className={styles.col}>
              <h4 className={styles.colHead}>Connect</h4>
              <a href="mailto:getintouch@presson.vc" className={styles.colLink}>
                getintouch@presson.vc
              </a>
              <a
                href="https://x.com/pressonvc"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.colLink}
              >
                X / Twitter
              </a>
              <a
                href="https://www.linkedin.com/company/pressonvc/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.colLink}
              >
                LinkedIn
              </a>
              <a
                href="https://www.fundpanel.io/Login"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.colLink}
              >
                Investor Login
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Press On Ventures</span>
          <span className={styles.legal}>
            For informational purposes only. Not an offer to sell or a solicitation to buy
            securities. Past performance is not indicative of future results.
          </span>
        </div>
      </div>
    </footer>
  );
}
