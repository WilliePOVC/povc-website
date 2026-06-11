import type { Metadata } from 'next';
import Link from 'next/link';
import PowerMark from '@/components/ui/PowerMark';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import ArrowRight from '@/components/ui/ArrowRight';
import { getCompany, CAT_LABELS, type Company } from '@/lib/data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Press On Ventures',
  description:
    'Early-stage consumer venture capital. Investing in resilient founders building transformative consumer businesses across health, wellbeing, and experiences.',
};

// Five hand-picked companies for the homepage teaser. To change the featured
// set, edit this list of slugs.
const FEATURED_SLUGS = ['10beauty', 'cofertility', 'jacob-bar', 'magic-story', 'vuelo'];
const FEATURED: Company[] = FEATURED_SLUGS.map((s) => getCompany(s)).filter(
  (c): c is Company => c !== null
);

export default function HomePage() {
  return (
    <>
      {/* Hero (mission folded into the sub) */}
      <header className={styles.hero}>
        <PowerMark className={styles.heroGlow} />
        <div className={styles.heroGrain} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.eyebrow} reveal`}>Early-Stage Consumer Venture Capital</div>
          <h1 className={`${styles.h1} reveal reveal-d1`}>
            Backing founders who{' '}
            <span className={styles.accent}>press on.</span>
          </h1>
          <p className={`${styles.heroSub} reveal reveal-d2`}>
            Investing in resilient founders building transformative consumer businesses across
            health, wellbeing, and experiences.
          </p>
          <div className={`${styles.heroCue} reveal reveal-d3`}>
            <span className={styles.cueLine} />
            Scroll to explore
          </div>
        </div>
      </header>

      {/* Selected Portfolio (5 featured) */}
      <section className={styles.featured}>
        <div className="container">
          <div className={`${styles.ftHead} reveal`}>
            <div className={styles.ftHeadLeft}>
              <div className={styles.ftEyebrow}>Selected Portfolio</div>
              <h2 className={styles.ftTitle}>A glimpse of who we back.</h2>
            </div>
            <Link href="/portfolio" className={styles.ftViewAll}>
              View full portfolio <ArrowRight className={styles.ftViewAllArrow} />
            </Link>
          </div>

          <div className={`${styles.ftGrid} reveal reveal-d1`}>
            {FEATURED.map((c) => (
              <Link
                key={c.slug}
                href={`/portfolio/${c.slug}`}
                className={styles.ftCard}
              >
                <div className={styles.ftCardTop}>
                  <span className={styles.ftCat}>
                    <span className={`cat-dot ${c.cat}`} />
                    {CAT_LABELS[c.cat]}
                  </span>
                  <ArrowUpRight className={styles.ftCardArrow} />
                </div>
                <div className={styles.ftCardBody}>
                  <div className={styles.ftCardName}>{c.name}</div>
                  <div className={styles.ftCardTag}>{c.tag}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta} id="contact">
        <div className="container">
          <PowerMark className={styles.ctaMark} />
          <h2 className={`${styles.ctaH2} reveal`}>
            Building something transformative? Let&rsquo;s talk.
          </h2>
          <a
            href="mailto:getintouch@presson.vc"
            className={`${styles.ctaMail} reveal reveal-d1`}
          >
            getintouch@presson.vc
          </a>
          <div className={`${styles.ctaLinks} reveal reveal-d2`}>
            <Link href="/portfolio" className={styles.ctaLink}>
              View Portfolio <ArrowRight className={styles.ctaLinkArrow} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
