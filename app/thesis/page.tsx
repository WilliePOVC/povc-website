import type { Metadata } from 'next';
import Link from 'next/link';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import styles from './thesis.module.css';

export const metadata: Metadata = {
  title: 'Thesis',
  description:
    'The next wave of AI is consumer. As the generative-AI cycle matures, the easy enterprise trade is largely priced in. We believe the next leg of AI value creation will be in consumer.',
};

const THESIS_CATS = [
  {
    num: '01',
    kind: 'AI-Enabled Product Experiences',
    title: 'AI is the experience, not a feature.',
    desc: 'Companies whose product is fundamentally 10\u00d7 better because of AI. Products that simply could not have existed two years ago.',
    examples: [
      {
        name: 'Feno',
        note: 'A professional clean and a personalized oral-health report in 20 seconds.',
        slug: 'feno',
      },
      {
        name: '10Beauty',
        note: 'A salon-quality manicure in 17 minutes, via computer-vision robotics.',
        slug: '10beauty',
      },
      {
        name: 'Magic Story',
        note: 'A multi-agent \u201cAutomated Hollywood\u201d for personalized children\u2019s media.',
        slug: 'magic-story',
      },
    ],
  },
  {
    num: '02',
    kind: 'AI-Leveraged Operators',
    title: 'AI as an unfair advantage.',
    desc: 'Consumer-product teams using AI across GTM, creative, and ops, compressing years of burn into months of disciplined execution.',
    examples: [
      {
        name: 'Jacob Bar',
        note: 'AI-leveraged GTM and creative built for capital-efficient growth.',
        slug: 'jacob-bar',
      },
      {
        name: 'Gato',
        note: 'Lean, AI-native operations driving disciplined, profitable growth.',
        slug: 'gato',
      },
      {
        name: 'SipMargs',
        note: 'AI-amplified marketing and creative behind a breakout RTD brand.',
        slug: 'sipmargs',
      },
    ],
  },
];

export default function ThesisPage() {
  return (
    <>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.eyebrow} reveal`}>Thesis</div>
          <h1 className={`${styles.h1} reveal reveal-d1`}>The next wave of AI is consumer.</h1>
          <p className={`${styles.lede} reveal reveal-d2`}>
            As the generative-AI cycle matures, the easy enterprise trade is largely priced in. We
            believe the next leg of AI value creation will be in consumer.
          </p>
        </div>
      </header>

      {/* Pull-quote */}
      <section className={styles.quoteWrap}>
        <div className="container">
          <p className={`${styles.quote} reveal`}>
            Consumers don&rsquo;t buy AI. <span className={styles.quoteAccent}>They buy better products.</span>
          </p>
        </div>
      </section>

      {/* Category columns */}
      <section className={styles.cats}>
        <div className="container">
          <div className={`${styles.mvCats} reveal`}>
            {THESIS_CATS.map((cat) => (
              <article className={styles.mvCat} key={cat.num}>
                <div className={styles.mvCatTop}>
                  <span className={styles.mvNum}>{cat.num}</span>
                  <span className={styles.mvKind}>{cat.kind}</span>
                </div>
                <h2 className={styles.mvCatTitle}>{cat.title}</h2>
                <p className={styles.mvCatDesc}>{cat.desc}</p>
                <div className={styles.mvEgs}>
                  {cat.examples.map((eg) => (
                    <Link key={eg.slug} href={`/portfolio/${eg.slug}`} className={styles.mvEg}>
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
    </>
  );
}
