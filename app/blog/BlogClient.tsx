'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BlogPost, BLOG_CATS } from '@/lib/data';
import PowerMark from '@/components/ui/PowerMark';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import styles from './blog.module.css';

interface Props {
  posts: BlogPost[];
}

const CAT_LABEL: Record<string, string> = {};
BLOG_CATS.forEach((c) => (CAT_LABEL[c.key] = c.label));

export default function BlogClient({ posts }: Props) {
  const [activeCat, setActiveCat] = useState('all');

  const featured = posts[0];
  const gridPosts = posts.slice(1);

  const visibleGrid =
    activeCat === 'all'
      ? gridPosts
      : posts.filter((p) => p.cat === activeCat);

  const showFeatured = activeCat === 'all';

  return (
    <section className="section" style={{ paddingTop: 'clamp(30px, 5vw, 56px)' }}>
      <div className="container">
        {/* Featured post */}
        {featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.featured} reveal ${!showFeatured ? styles.featHidden : ''}`}
            aria-hidden={!showFeatured}
            tabIndex={!showFeatured ? -1 : undefined}
          >
            <div className={styles.featMain}>
              <div className={styles.blFlag}>
                <span className={styles.blFlagDot} />
                Latest &middot; {CAT_LABEL[featured.cat] ?? featured.cat}
              </div>
              <h2 className={styles.featTitle}>{featured.title}</h2>
              <p className={styles.featExcerpt}>{featured.excerpt}</p>
              <div className={styles.featFoot}>
                <div className={styles.blMeta}>
                  <b>{featured.author}</b>
                  {featured.date && <> &middot; {featured.date}</>}
                </div>
                <span className="btn-ghost">
                  Read on Medium <ArrowUpRight />
                </span>
              </div>
            </div>
            <div className={`${styles.featSide} ${featured.logo ? styles.hasLogo : ''}`}>
              {featured.logo && (
                <Image
                  src={featured.logo}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 820px) 100vw, 40vw"
                  className={styles.featLogoImg}
                  onError={() => {/* graceful */}}
                />
              )}
              {!featured.logo && featured.img && (
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 820px) 100vw, 40vw"
                  className={styles.featBgImg}
                  unoptimized
                />
              )}
              <span className={`${styles.glyph} ${featured.logo ? styles.glyphHidden : ''}`}>
                <PowerMark />
              </span>
            </div>
          </a>
        )}

        {/* Controls */}
        <div className={`${styles.controls} reveal`}>
          <div className={styles.filters}>
            <button
              className={activeCat === 'all' ? styles.filterActive : styles.filterBtn}
              onClick={() => setActiveCat('all')}
            >
              All
            </button>
            {BLOG_CATS.map((c) => (
              <button
                key={c.key}
                className={activeCat === c.key ? styles.filterActive : styles.filterBtn}
                onClick={() => setActiveCat(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <a
            href="https://medium.com/@pressonvc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            All posts on Medium <ArrowUpRight />
          </a>
        </div>

        {/* Grid */}
        <div className={`${styles.grid} reveal`}>
          {visibleGrid.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.blCat}>{CAT_LABEL[p.cat] ?? p.cat}</div>
              <h3 className={styles.blTitle}>{p.title}</h3>
              <p className={styles.blExcerpt}>{p.excerpt}</p>
              <div className={styles.blFoot}>
                <div className={styles.blMeta}>
                  <b>{p.author}</b>
                  {p.date && <> &middot; {p.date}</>}
                </div>
                <ArrowUpRight className={styles.blGo} />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className={`${styles.cta} reveal`}>
          <a
            href="https://medium.com/@pressonvc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-beige"
          >
            Read more on Medium <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
