import type { Metadata } from 'next';
import Link from 'next/link';
import PowerMark from '@/components/ui/PowerMark';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import ArrowRight from '@/components/ui/ArrowRight';
import { getCompany, type Company } from '@/lib/data';
import { assetPath } from '@/lib/basepath';
import HomeMotion from './HomeMotion';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Press On Ventures',
  description:
    'Early-stage consumer venture capital. Investing in resilient founders building transformative consumer businesses across health, well-being, and experiences.',
};

// Five hand-picked companies for the homepage teaser. To change the featured
// set, edit this list of slugs.
const FEATURED_SLUGS = ['10beauty', 'cofertility', 'jacob-bar', 'magic-story', 'vuelo'];
const FEATURED: Company[] = FEATURED_SLUGS.map((s) => getCompany(s)).filter(
  (c): c is Company => c !== null
);

// Thesis teaser cards (mirrors the Thesis page's two categories).
const THESIS_CARDS = [
  {
    num: '01',
    kind: 'AI-Enabled Product Experiences',
    title: 'AI is the experience, not a feature.',
    egs: ['Feno', '10Beauty', 'Magic Story'],
  },
  {
    num: '02',
    kind: 'AI-Leveraged Operators',
    title: 'AI as an unfair advantage.',
    egs: ['Jacob Bar', 'Gato', 'SipMargs'],
  },
];

function monogram(name: string): string {
  return name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
}

export default function HomePage() {
  return (
    <>
      <HomeMotion />

      {/* ── Hero (alive) ─────────────────────────────────── */}
      <header className={styles.hero} id="heroSection">
        <div className={styles.heroAurora} aria-hidden>
          <span className={`${styles.blob} ${styles.b1}`} />
          <span className={`${styles.blob} ${styles.b2}`} />
          <span className={`${styles.blob} ${styles.b3}`} />
        </div>
        <div className={styles.heroBeam} aria-hidden />
        <div className={styles.heroMarkWrap} aria-hidden>
          <PowerMark className={styles.heroGlow} />
        </div>
        <div className={styles.heroGrain} aria-hidden />
        <div className={styles.heroVignette} aria-hidden />
        <div className={styles.heroSpot} id="heroSpot" aria-hidden />
        <div className={styles.heroSpot2} id="heroSpot2" aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.eyebrow} reveal`}>Early-Stage Consumer Venture Capital</div>
          <h1 className={styles.h1} id="heroH1">
            Backing founders who{' '}
            <span className={`${styles.accent} hero-accent`}>press on.</span>
          </h1>
          <p className={`${styles.heroSub} reveal reveal-d3`}>
            Investing in resilient founders building transformative consumer businesses across
            health, well-being, and experiences.
          </p>
        </div>
        <div className={`${styles.scrollCue} reveal reveal-d4`} aria-hidden>
          <span className={styles.scrollCueText}>Scroll</span>
          <span className={styles.scrollCueLine} />
        </div>
      </header>

      {/* ── Thesis teaser (dark, kinetic) ────────────────── */}
      <section className={styles.thesisTeaser}>
        <div className="container">
          <div className={`${styles.ttHead} reveal`}>
            <div className={styles.secEyebrow}>Our Thesis</div>
            <Link href="/thesis" className={styles.ttViewAll}>
              View thesis <ArrowRight className={styles.viewAllArrow} />
            </Link>
          </div>

          <blockquote className={`${styles.tq} reveal`} id="tq">
            Consumers don&rsquo;t buy AI, they buy better products.
          </blockquote>

          <div className={`${styles.ttCards} reveal`}>
            {THESIS_CARDS.map((card) => (
              <Link key={card.num} href="/thesis" className={styles.ttCard} data-tilt="card">
                <span className={styles.ttSheen} aria-hidden />
                <ArrowUpRight className={styles.ttGo} />
                <div className={styles.ttCardTop}>
                  <span className={styles.ttNum}>{card.num}</span>
                  <span className={styles.ttKind}>{card.kind}</span>
                </div>
                <div className={styles.ttTitle}>{card.title}</div>
                <div className={styles.ttEgs}>
                  {card.egs.map((e) => (
                    <span key={e}>{e}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected Portfolio (light, logo tiles) ───────── */}
      <section className={styles.featured}>
        <div className="container">
          <div className={`${styles.ftHead} reveal`}>
            <div>
              <div className={styles.secEyebrow}>Selected Portfolio</div>
              <h2 className={styles.ftTitle}>A glimpse of who we back.</h2>
            </div>
            <Link href="/portfolio" className={styles.ftViewAll}>
              View full portfolio <ArrowRight className={styles.viewAllArrow} />
            </Link>
          </div>

          <div className={styles.ftGrid}>
            {FEATURED.map((c, i) => (
              <Link
                key={c.slug}
                href={`/portfolio/${c.slug}`}
                className={`${styles.ftCard} reveal reveal-d${i + 1}`}
              >
                <div className={styles.ftTile} data-tilt="tile">
                  <span className={styles.ftSheen} aria-hidden />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath(c.logoUrl)}
                    alt={`${c.name} logo`}
                    loading="lazy"
                    className={styles.ftLogo}
                  />
                  <span className={styles.ftMono}>{monogram(c.name)}</span>
                  <span className={styles.ftGo}>
                    <ArrowUpRight />
                  </span>
                </div>
                <div className={styles.ftName}>{c.name}</div>
                <div className={styles.ftTag}>{c.tag}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA (igniting power mark) ─────────────── */}
      <section className={styles.cta} id="contact">
        <div className={styles.ctaMark}>
          <span className={`${styles.ctaBurst} cta-burst`} aria-hidden />
          <span className={`${styles.ctaHalo} cta-halo`} aria-hidden />
          <PowerMark className={`${styles.ctaMarkLayer} ${styles.ctaGhost}`} />
          <PowerMark className={`${styles.ctaMarkLayer} ${styles.ctaFill} cta-fill`} />
        </div>
        <div className="container">
          <h2 className={`${styles.ctaH2} reveal`}>
            Building something transformative? Let&rsquo;s talk.
          </h2>
          <a
            href="mailto:getintouch@presson.vc"
            className={`${styles.ctaMail} reveal reveal-d1`}
            data-magnet="0.25"
          >
            getintouch@presson.vc
          </a>
        </div>
      </section>
    </>
  );
}
