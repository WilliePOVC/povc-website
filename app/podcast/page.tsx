import type { Metadata } from 'next';
import Link from 'next/link';
import s from './podcast.module.css';
import { getPublished, getUpcoming } from '@/lib/podcast/youtube';
import { PODCAST } from '@/lib/podcast/config';
import { fmtDate, fmtMin } from '@/lib/podcast/format';
import SubscribeLinks from '@/components/podcast/SubscribeLinks';
import YouTubeFacade from '@/components/podcast/YouTubeFacade';
import EpisodeGrid from '@/components/podcast/EpisodeGrid';
import PitchGuestCTA from '@/components/podcast/PitchGuestCTA';
import { PlayIcon, ArrowUpRight, YouTubeIcon } from '@/components/podcast/icons';

export const metadata: Metadata = {
  title: 'Podcast',
  description: `${PODCAST.name}: conversations with resilient founders building transformative consumer businesses.`,
  alternates: { canonical: '/podcast' },
};

export default async function PodcastPage() {
  const [published, upcoming] = await Promise.all([getPublished(), getUpcoming()]);
  const [featured, ...rest] = published;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'PodcastSeries', name: PODCAST.name,
    url: `${PODCAST.siteUrl}/podcast`, author: { '@type': 'Organization', name: 'Press On Ventures' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className={s.hero}>
        <div className="container">
          <div className={s.heroRow}>
            <div>
              <div className={`${s.eyebrowBeige} reveal`}>{PODCAST.eyebrow}</div>
              <h1 className={`${s.heroTitle} reveal reveal-d1`}>{PODCAST.name}.</h1>
              <p className={`${s.heroBlurb} reveal reveal-d2`}>{PODCAST.blurb}</p>
            </div>
            <div className="reveal reveal-d2"><SubscribeLinks /></div>
          </div>

          {featured ? (
            <div className={`${s.featured} reveal`}>
              <YouTubeFacade ep={featured} size="lg" badge="New" className={s.featuredPlayer} />
              <div className={s.featuredText}>
                <div className={s.eyebrowBeige}>
                  {['Latest episode', fmtDate(featured.publishedAt), fmtMin(featured.durationSec)].filter(Boolean).join(' · ')}
                </div>
                <h2 className={s.featuredTitle}>{featured.title}</h2>
                {featured.summary[0] && <p className={s.featuredSummary}>{featured.summary[0]}</p>}
                <div className={s.featuredBtns}>
                  <Link href={`/podcast/${featured.slug}`} className={`btn-beige ${s.btnTall}`}><PlayIcon />Watch episode</Link>
                  <Link href={`/podcast/${featured.slug}#notes`} className={s.pill}>Show notes <ArrowUpRight /></Link>
                </div>
              </div>
            </div>
          ) : (
            <div className={s.featuredEmpty}>
              <p>Episodes are temporarily unavailable.</p>
              <a href={PODCAST.listen.youtube} target="_blank" rel="noopener noreferrer" className={s.pill}>Watch on YouTube <ArrowUpRight /></a>
            </div>
          )}
        </div>
      </header>

      <section className={s.episodes}>
        <div className="container">
          {rest.length === 0 && upcoming.length === 0 ? (
            <div className={s.launch}>
              <h2 className={s.h2}>New episodes are on the way.</h2>
              <a href={PODCAST.listen.youtube} target="_blank" rel="noopener noreferrer" className={s.darkPill}><YouTubeIcon />Subscribe on YouTube</a>
            </div>
          ) : (
            <EpisodeGrid episodes={rest} upcoming={upcoming} />
          )}
        </div>
      </section>

      <PitchGuestCTA />
    </>
  );
}
