import type { Metadata } from 'next';
import Link from 'next/link';
import PowerMark from '@/components/ui/PowerMark';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import ArrowRight from '@/components/ui/ArrowRight';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Press On Ventures',
  description:
    'Early-stage consumer venture capital. Investing in resilient founders building transformative consumer businesses.',
};

const THESIS_CATS = [
  {
    num: '01',
    kind: 'AI-Enabled Product Experiences',
    title: 'AI is the experience, not a feature.',
    desc: 'Companies whose product is fundamentally 10x better because of AI. Products that simply could not have existed two years ago.',
    examples: [
      { name: 'Feno', note: 'A professional clean and a personalized oral-health report in 20 seconds.', slug: 'feno' },
      { name: '10Beauty', note: 'Seven cameras, one robotic arm, salon-quality results in minutes.', slug: '10beauty' },
      { name: 'Magic Story', note: 'A photo becomes a Pixar-quality personalized hardcover in seconds.', slug: 'magic-story' },
    ],
  },
  {
    num: '02',
    kind: 'AI-Leveraged Operators',
    title: 'AI as an unfair advantage.',
    desc: 'Founders who use AI to do more with less and build operational leverage into every layer of the business from day one.',
    examples: [
      { name: 'Jacob Bar', note: 'Clean-label protein with the unit economics of a tech company.', slug: 'jacob-bar' },
      { name: 'Gato', note: 'A premium food brand scaling with a lean, AI-enabled team.', slug: 'gato' },
      { name: 'Vuelo', note: 'An AI-native travel platform with a personalized payment plan in every trip.', slug: 'vuelo' },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className={styles.hero}>
        <PowerMark className={styles.heroGlow} />
        <div className={styles.heroGrain} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.eyebrow} reveal`}>Early-Stage Consumer Venture Capital</div>
          <h1 className={`${styles.h1} reveal reveal-d1`}>
            Backing the founders who{' '}
            <span className={styles.accent}>press on.</span>
          </h1>
          <p className={`${styles.heroSub} reveal reveal-d2`}>
            Consumer wallet share is shifting toward wellness, longevity, and experiences. We invest
            early in the resilient teams transforming these categories at technology&rsquo;s bleeding
            edge.
          </p>
          <div className={`${styles.heroCue} reveal reveal-d3`}>
            <span className={styles.cueLine} />
            Scroll to explore
          </div>
        </div>
      </header>

      {/* Mission band */}
      <section className={styles.manifesto}>
        <div className="container">
          <div className={`${styles.manifestoEyebrow} reveal`}>Our Mission</div>
          <p className={`${styles.manifestoText} reveal reveal-d1`}>
            Investing in resilient founders building{' '}
            <span className={styles.muted}>transformative consumer businesses.</span>
          </p>
        </div>
      </section>

      {/* Market View / Thesis */}
      <section className={styles.thesis} id="thesis">
        <div className="container">
          <div className={`${styles.secHead} reveal`}>
            <div className={styles.thesisEyebrow}>Market View</div>
            <h2 className={styles.thesisTitle}>The next wave of AI is consumer.</h2>
            <p className={styles.mvLede}>
              As the generative-AI cycle matures, the easy enterprise trade is largely priced in. We
              believe the next leg of AI value creation will be in consumer.
            </p>
          </div>

          <div className={`${styles.mvCats} reveal`}>
            {THESIS_CATS.map((cat) => (
              <article className={styles.mvCat} key={cat.num}>
                <div className={styles.mvCatTop}>
                  <span className={styles.mvNum}>{cat.num}</span>
                  <span className={styles.mvKind}>{cat.kind}</span>
                </div>
                <h3 className={styles.mvCatTitle}>{cat.title}</h3>
                <p className={styles.mvCatDesc}>{cat.desc}</p>
                <div className={styles.mvEgs}>
                  {cat.examples.map((eg) => (
                    <Link
                      key={eg.slug}
                      href={`/portfolio/${eg.slug}`}
                      className={styles.mvEg}
                    >
                      <span>
                        <span className={styles.mvEgName}>{eg.name}</span>
                        <span className={styles.mvEgNote}>{eg.note}</span>
                      </span>
                      <ArrowUpRight className={styles.mvEgGo} />
                    </Link>
                  ))}
                </div>
              </article>
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
