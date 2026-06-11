'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Company, CAT_LABELS } from '@/lib/data';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import ArrowRight from '@/components/ui/ArrowRight';
import styles from './portfolio.module.css';

interface Props {
  companies: Company[];
}

type Filter = 'all' | 'health' | 'travel';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'health', label: 'Health & Well-Being' },
  { key: 'travel', label: 'Travel & Experiential' },
];

export default function PortfolioClient({ companies }: Props) {
  const [active, setActive] = useState<Filter>('all');

  const healthCount = companies.filter((c) => c.cat === 'health').length;
  const travelCount = companies.filter((c) => c.cat === 'travel').length;

  const counts: Record<Filter, number> = {
    all: companies.length,
    health: healthCount,
    travel: travelCount,
  };

  const visible = active === 'all' ? companies : companies.filter((c) => c.cat === active);

  return (
    <section className="section" style={{ paddingTop: 'clamp(30px, 5vw, 56px)' }}>
      <div className="container">
        <div className={`${styles.controls} reveal`}>
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={active === f.key ? styles.filterActive : styles.filterBtn}
                onClick={() => setActive(f.key)}
              >
                {f.label}
                <span className={styles.ct}>{counts[f.key]}</span>
              </button>
            ))}
          </div>
          <div className={styles.count}>
            Showing {visible.length} of {companies.length} companies
          </div>
        </div>

        <div className={`${styles.grid} reveal`}>
          {companies.map((c) => (
            <Link
              key={c.slug}
              href={`/portfolio/${c.slug}`}
              className={`${styles.card} ${active !== 'all' && c.cat !== active ? styles.hide : ''}`}
            >
              <ArrowUpRight className={styles.cardArrow} />
              <div className={`${styles.pcCat} ${c.cat}`}>
                <span className={`cat-dot ${c.cat}`} />
                {CAT_LABELS[c.cat]}
              </div>
              <div className={styles.pcName}>{c.name}</div>
              <div className={styles.pcTag}>{c.tag}</div>
              <div className={styles.pcDesc}>{c.desc}</div>
              <div className={styles.pcFoot}>
                View company <ArrowRight className={styles.footArrow} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
