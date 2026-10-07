import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import s from '../podcast.module.css';
import { getPublished, getEpisodeBySlug } from '@/lib/podcast/youtube';
import { PODCAST } from '@/lib/podcast/config';
import { fmtDate, fmtMin, pad2 } from '@/lib/podcast/format';
import { toIsoDuration } from '@/lib/podcast/parse';
import { getCompany } from '@/lib/data';
import { assetPath } from '@/lib/basepath';
import YouTubeFacade from '@/components/podcast/YouTubeFacade';
import ChapterList from '@/components/podcast/ChapterList';
import ShareRow from '@/components/podcast/ShareRow';
import EpisodeCard from '@/components/podcast/EpisodeCard';
import { YouTubeIcon, SpotifyIcon, AppleIcon, TikTokIcon } from '@/components/podcast/icons';

// Static export: every episode page is generated at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublished()).map((e) => ({ slug: e.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const ep = await getEpisodeBySlug((await params).slug);
  if (!ep) return {};
  return {
    title: `${ep.title} | ${PODCAST.name}`,
    description: ep.summary[0],
    alternates: { canonical: `/podcast/${ep.slug}` },
    openGraph: {
      title: ep.title, description: ep.summary[0], type: 'video.episode', url: `/podcast/${ep.slug}`,
      images: [{ url: `/podcast/${ep.slug}/og.png`, width: 1200, height: 630, alt: `${ep.title}: ${PODCAST.name}` }],
    },
    twitter: { card: 'summary_large_image', images: [`/podcast/${ep.slug}/og.png`] },
  };
}

export default async function EpisodePage({ params }: Params) {
  const { slug } = await params;
  const ep = await getEpisodeBySlug(slug);
  if (!ep) notFound();

  const all = await getPublished();
  const more = all.filter((e) => e.videoId !== ep.videoId).slice(0, 3);
  const company = ep.portfolioSlug ? getCompany(ep.portfolioSlug) : null;
  const url = `${PODCAST.siteUrl}/podcast/${ep.slug}`;
  const meta = [`Episode ${pad2(ep.number)}`, fmtDate(ep.publishedAt), fmtMin(ep.durationSec), ep.topic].filter(Boolean).join(' · ');

  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'PodcastEpisode', name: ep.title, url,
      episodeNumber: ep.number, datePublished: ep.publishedAt, description: ep.summary.join(' '),
      partOfSeries: { '@type': 'PodcastSeries', name: PODCAST.name, url: `${PODCAST.siteUrl}/podcast` },
    },
    {
      '@context': 'https://schema.org', '@type': 'VideoObject', name: ep.title,
      description: ep.summary.join(' ') || ep.title, thumbnailUrl: ep.youtubeThumb, uploadDate: ep.publishedAt,
      ...(ep.durationSec ? { duration: toIsoDuration(ep.durationSec) } : {}),
      embedUrl: `https://www.youtube-nocookie.com/embed/${ep.videoId}`, contentUrl: `https://youtu.be/${ep.videoId}`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className={s.epHero}>
        <div className="container">
          <nav className={s.crumb} aria-label="Breadcrumb">
            <Link href="/podcast">Podcast</Link> <span aria-hidden="true">/</span> <span>Episode {pad2(ep.number)}</span>
          </nav>
          <YouTubeFacade ep={ep} size="xl" playSize="lg" className={s.epPlayer} />
        </div>
      </header>

      <section className={s.epBody}>
        <div className={`container ${s.epCols}`}>
          <article id="notes" className={s.epMain}>
            <div className={s.eyebrowLight}>{meta}</div>
            <h1 className={s.epTitle}>{ep.title}</h1>
            {ep.summary.map((p, i) => <p key={i} className={s.epSummary}>{p}</p>)}

            {ep.chapters.length > 0 && (
              <>
                <h2 className={s.h3}>Chapters</h2>
                <ChapterList chapters={ep.chapters} />
              </>
            )}

            <h2 className={s.h3}>Mentioned in this episode</h2>
            <div className={s.mentions}>
              {company && (
                <Link href={`/portfolio/${company.slug}`} className={s.mention}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={assetPath(`/company-logos/${company.logo}`)} alt="" className={s.mentionLogo} />
                  <span>{company.name}</span>
                  <span className={s.mentionLabel}>Portfolio</span>
                </Link>
              )}
              <Link href="/thesis" className={s.mention}>Our thesis →</Link>
            </div>
            {/* Transcript accordion slot — v2 */}
          </article>

          <aside className={s.epAside}>
            {ep.guest && (
              <div className={s.guestCard}>
                <div className={s.eyebrowLight}>Guest</div>
                <div className={s.guestName}>{ep.guest.name}</div>
                {ep.guest.role && <div className={s.guestRole}>{ep.guest.role}</div>}
              </div>
            )}
            <div className={s.listenCard}>
              <div className={s.eyebrowLight}>Listen on</div>
              <a href={`https://youtu.be/${ep.videoId}`} target="_blank" rel="noopener noreferrer" className={s.listenDark}><YouTubeIcon />YouTube</a>
              {PODCAST.listen.spotify && <a href={PODCAST.listen.spotify} target="_blank" rel="noopener noreferrer" className={s.listenOutline}><SpotifyIcon />Spotify</a>}
              {PODCAST.listen.apple && <a href={PODCAST.listen.apple} target="_blank" rel="noopener noreferrer" className={s.listenOutline}><AppleIcon />Apple Podcasts</a>}
              {PODCAST.listen.tiktok && <a href={PODCAST.listen.tiktok} target="_blank" rel="noopener noreferrer" className={s.listenOutline}><TikTokIcon />TikTok</a>}
            </div>
            <ShareRow url={url} title={`${ep.title} | ${PODCAST.name}`} />
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className={s.more}>
          <div className="container">
            <div className={s.gridHead}>
              <h2 className={s.h2}>More episodes</h2>
              <Link href="/podcast" className={s.allLink}>All episodes →</Link>
            </div>
            <div className={s.grid}>{more.map((e) => <EpisodeCard key={e.videoId} ep={e} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
