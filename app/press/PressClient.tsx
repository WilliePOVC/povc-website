'use client';

import { useState } from 'react';
import { PressItem } from '@/lib/data';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import styles from './press.module.css';

interface Props {
  pressItems: PressItem[];
  featuredPubs: string[];
}

export default function PressClient({ pressItems, featuredPubs }: Props) {
  const [activeCo, setActiveCo] = useState('all');

  // Derive companies that have coverage
  const companies = [...new Set(pressItems.map((p) => p.company))].sort();

  const visible = activeCo === 'all'
    ? pressItems
    : pressItems.filter((p) => p.company === activeCo);

  return (
    <>
      {/* Featured in band */}
      <section className={`${styles.feat} reveal`}>
        <div className="container">
          <div className={styles.featLabel}>Portfolio featured in</div>
          <div className={styles.featNames}>
            {featuredPubs.map((pub) => (
              <span key={pub}>{pub}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage list */}
      <section className="section">
        <div className="container">
          <div className="sec-eyebrow reveal">Coverage</div>
          <h2 className="sec-title reveal" style={{ marginBottom: 36 }}>
            Selected press.
          </h2>

          <div className={`${styles.filters} reveal`}>
            <button
              className={activeCo === 'all' ? styles.filterActive : styles.filterBtn}
              onClick={() => setActiveCo('all')}
            >
              All coverage
            </button>
            {companies.map((co) => (
              <button
                key={co}
                className={activeCo === co ? styles.filterActive : styles.filterBtn}
                onClick={() => setActiveCo(co)}
              >
                {co}
              </button>
            ))}
          </div>

          <div className={`${styles.list} reveal`}>
            {visible.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <div>
                  <div className={styles.pub}>{p.pub}</div>
                  <div className={styles.date}>{p.date}</div>
                </div>
                <div className={styles.title}>{p.title}</div>
                <span className={styles.co}>{p.company}</span>
                <span className={styles.go}><ArrowUpRight /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
