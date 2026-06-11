import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COMPANIES, getCompany, getAdjacentCompanies, CAT_LABELS, FALLBACK_PRESS_ITEMS } from '@/lib/data';
import { assetPath } from '@/lib/basepath';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import ArrowRight from '@/components/ui/ArrowRight';
import styles from './company.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

// Static generation for all 12 companies
export async function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};
  return {
    title: company.name,
    description: company.desc,
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompany(slug);

  if (!company) notFound();

  const { prev, next } = getAdjacentCompanies(slug);
  const mono = company.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
  const pressItems = FALLBACK_PRESS_ITEMS.filter((p) => p.company === company.name);

  return (
    <>
      <header className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link href="/portfolio" className={`${styles.crumb} reveal`}>
            <ArrowRight className={styles.crumbArrow} />
            Portfolio
          </Link>

          <div className={`${styles.coHead} reveal reveal-d1`}>
            <div>
              <div className={styles.coCat}>
                <span className={`cat-dot ${company.cat}`} />
                {CAT_LABELS[company.cat]}
              </div>
              <div className={styles.coName}>{company.name}</div>
              <div className={styles.coTag}>{company.tag}</div>
            </div>
          </div>

          <div className={`${styles.coHeroImg} reveal reveal-d2`}>
            {company.logo ? (
              <img
                src={assetPath(`/company-logos/${company.logo}`)}
                alt={`${company.name} logo`}
                className={styles.heroLogo}
                loading="eager"
              />
            ) : (
              <span className={styles.mono}>{mono}</span>
            )}
          </div>
        </div>
      </header>

      <section className="container">
        <div className={styles.coBody}>
          <div className={styles.coMain}>
            <h2 className={`${styles.sectionLabel} reveal`}>Overview</h2>
            <p className={`${styles.lead} reveal`}>{company.desc}</p>

            <div className={`${styles.why} reveal`}>
              <h2 className={styles.sectionLabel}>Why we partnered</h2>
              <p className={styles.whyText}>{company.why}</p>
            </div>
          </div>

          <aside className={`${styles.coSide} reveal reveal-d1`}>
            <div className={styles.sideRow}>
              <div className={styles.sideKey}>Category</div>
              <div className={styles.sideVal}>{CAT_LABELS[company.cat]}</div>
            </div>

            {company.stage && (
              <div className={styles.sideRow}>
                <div className={styles.sideKey}>Stage at entry</div>
                <div className={styles.sideVal}>{company.stage}</div>
              </div>
            )}

            <div className={styles.sideRow}>
              <div className={styles.sideKey}>
                Founder{company.founders.length > 1 ? 's' : ''}
              </div>
              <div className={styles.founders}>
                {company.founders.map((f) => (
                  <a
                    key={f.name}
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.founderLink}
                  >
                    {f.name}
                    <ArrowUpRight className={styles.founderArrow} />
                  </a>
                ))}
              </div>
            </div>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-beige ${styles.visitBtn}`}
              >
                Visit website
                <ArrowUpRight />
              </a>
            )}
          </aside>
        </div>
      </section>

      {pressItems.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-eyebrow reveal">In the press</div>
            <h2 className={`sec-title reveal`} style={{ marginBottom: 36 }}>
              {company.name} in the news
            </h2>
            <div className={`${styles.coPress} reveal`}>
              {pressItems.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.prItem}
                >
                  <div>
                    <div className={styles.prPub}>{p.pub}</div>
                    <div className={styles.prDate}>{p.date}</div>
                  </div>
                  <div className={styles.prTitle}>{p.title}</div>
                  <span className={styles.prGo}><ArrowUpRight /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <nav className={`${styles.coNav} reveal`} aria-label="Company navigation">
        <Link href={`/portfolio/${prev.slug}`} className={styles.navLink}>
          <div className={styles.navDir}>Previous</div>
          <div className={styles.navName}>{prev.name}</div>
        </Link>
        <Link href={`/portfolio/${next.slug}`} className={`${styles.navLink} ${styles.navLinkRight}`}>
          <div className={styles.navDir}>Next</div>
          <div className={styles.navName}>{next.name}</div>
        </Link>
      </nav>
    </>
  );
}
