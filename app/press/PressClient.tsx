'use client';

import { useState } from 'react';
import { PressItem, PRESS_SPOTLIGHT } from '@/lib/data';
import PowerMark from '@/components/ui/PowerMark';
import { assetPath } from '@/lib/basepath';
import blog from '../blog/blog.module.css';
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
      {/* Spotlight (matches Blog featured-post spacing) */}
      {PRESS_SPOTLIGHT && (
        <section className="section" style={{ paddingTop: 'clamp(30px, 5vw, 56px)' }}>
          <div className="container">
              {PRESS_SPOTLIGHT && (
                <a href={PRESS_SPOTLIGHT.url} target="_blank" rel="noopener noreferrer" className={`${blog.featured} reveal`}>
                  <div className={blog.featMain}>
                    <div className={blog.blFlag}>
                      <span className={blog.blFlagDot} />
                      Featured &middot; Press On Ventures
                    </div>
                    <h2 className={blog.featTitle}>{PRESS_SPOTLIGHT.title}</h2>
                    <p className={blog.featExcerpt}>{PRESS_SPOTLIGHT.excerpt}</p>
                    <div className={blog.featFoot}>
                      <div className={blog.blMeta}>
                        <b>{PRESS_SPOTLIGHT.pub}</b> &middot; {PRESS_SPOTLIGHT.author} &middot; {PRESS_SPOTLIGHT.date}
                      </div>
                      <span className="btn-ghost">Read on {PRESS_SPOTLIGHT.pub} <ArrowUpRight /></span>
                    </div>
                  </div>
                  <div className={blog.featSide}>
                    {PRESS_SPOTLIGHT.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={assetPath(PRESS_SPOTLIGHT.img)} alt="Willie Litvack and Sean Tolkin" className={blog.featBgImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className={blog.glyph}><PowerMark /></span>
                )}
                  </div>
                </a>
              )}
          </div>
        </section>
      )}

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
                <div className={styles.meta}>
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
