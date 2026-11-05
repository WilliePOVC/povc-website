// Build-time YouTube sync. The site is a static export on GitHub Pages, so this runs
// during `next build`; the deploy workflow rebuilds when the channel feed changes.
import { cache } from 'react';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import type { Episode } from './types';
import { PODCAST, CHANNEL_ID } from './config';
import { OVERRIDES } from './overrides';
import {
  parseIsoDuration, parseEpisodeNumber, cleanTitle, episodeSlug,
  parseChapters, parseMeta, parseSummary, parseRss, numberFromSlug,
} from './parse';

const API = 'https://www.googleapis.com/youtube/v3';
const KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_ENV = process.env.YOUTUBE_PLAYLIST_ID;
// UU… = all uploads; UULF… = long-form uploads only (excludes Shorts) — used for RSS.
const UPLOADS = 'UU' + CHANNEL_ID.slice(2);
const LONGFORM = 'UULF' + CHANNEL_ID.slice(2);
const usingUploads = !PLAYLIST_ENV;

type Raw = {
  id: string; title: string; description: string; publishedAt: string; thumb: string;
  durationSec: number | null; upcoming: boolean; scheduledAt?: string;
};

async function yt<T>(path: string, params: Record<string, string>): Promise<T> {
  const qs = new URLSearchParams({ ...params, key: KEY! });
  const res = await fetch(`${API}/${path}?${qs}`, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`YouTube ${path} ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

async function fromApi(): Promise<Raw[]> {
  const ids: string[] = [];
  let pageToken = '';
  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = await yt('playlistItems', {
      part: 'contentDetails', playlistId: PLAYLIST_ENV || UPLOADS, maxResults: '50',
      ...(pageToken && { pageToken }),
    });
    for (const it of r.items ?? []) ids.push(it.contentDetails.videoId);
    pageToken = r.nextPageToken ?? '';
  } while (pageToken && ids.length < 500);

  const out: Raw[] = [];
  for (let i = 0; i < ids.length; i += 50) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = await yt('videos', {
      part: 'snippet,contentDetails,status,liveStreamingDetails', id: ids.slice(i, i + 50).join(','),
    });
    for (const v of r.items ?? []) {
      if (v.status?.privacyStatus !== 'public') continue;
      const upcoming = v.snippet.liveBroadcastContent === 'upcoming';
      const durationSec = upcoming ? null : parseIsoDuration(v.contentDetails?.duration);
      if (!upcoming && usingUploads && (durationSec ?? 0) < PODCAST.episodeMinSeconds) continue;
      const t = v.snippet.thumbnails ?? {};
      out.push({
        id: v.id, title: v.snippet.title, description: v.snippet.description ?? '',
        publishedAt: v.snippet.publishedAt,
        thumb: (t.maxres ?? t.standard ?? t.high ?? t.medium ?? t.default)?.url ?? '',
        durationSec, upcoming, scheduledAt: v.liveStreamingDetails?.scheduledStartTime,
      });
    }
  }
  return out;
}

async function fromRss(): Promise<Raw[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ENV || LONGFORM}`;
  // YouTube's RSS endpoint intermittently returns 404/500 to CI runners; retry with backoff.
  let res: Response | null = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    res = await fetch(url, { cache: 'force-cache' }).catch(() => null);
    if (res?.ok) break;
    console.warn(`[podcast] YouTube RSS attempt ${attempt} failed (${res?.status ?? 'network'})`);
    if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 5000));
  }
  let xml: string;
  if (res?.ok) {
    xml = await res.text();
  } else {
    // YouTube blocks some CI IPs. Fall back to the committed snapshot (refresh: scripts/snapshot-podcast-feed.sh).
    const snap = path.join(process.cwd(), 'lib/podcast/feed-snapshot.xml');
    if (!existsSync(snap)) throw new Error(`YouTube RSS ${res?.status ?? 'network error'} and no snapshot`);
    console.warn('[podcast] YouTube RSS unavailable; using lib/podcast/feed-snapshot.xml');
    xml = readFileSync(snap, 'utf8');
  }
  return parseRss(xml).map((e) => ({
    id: e.videoId, title: e.title, description: e.description, publishedAt: e.publishedAt,
    thumb: `https://i.ytimg.com/vi/${e.videoId}/maxresdefault.jpg`, durationSec: null, upcoming: false,
  }));
}

const VARIANTS: Episode['tileVariant'][] = ['beige', 'dark', 'grey'];

export function normalize(rows: Raw[]): Episode[] {
  const sorted = [...rows].sort((a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt));
  return sorted.map((v, i) => {
    const number = parseEpisodeNumber(v.title) ?? i + 1;
    const title = cleanTitle(v.title) || v.title;
    const base: Episode = {
      videoId: v.id,
      number,
      slug: episodeSlug(number, title),
      title,
      summary: parseSummary(v.description),
      publishedAt: v.publishedAt,
      durationSec: v.durationSec,
      status: v.upcoming ? 'upcoming' : 'published',
      scheduledAt: v.scheduledAt,
      ...parseMeta(v.description),
      chapters: parseChapters(v.description),
      youtubeThumb: v.thumb,
      tileVariant: VARIANTS[(number - 1) % 3],
    };
    return { ...base, ...(OVERRIDES[v.id] ?? {}) };
  });
}

let warned = false;
export const getEpisodes = cache(async (): Promise<Episode[]> => {
  if (KEY) {
    try {
      return normalize(await fromApi());
    } catch (err) {
      console.warn('[podcast] YouTube API failed, falling back to RSS:', (err as Error).message);
    }
  } else if (!warned) {
    warned = true;
    console.warn('[podcast] YOUTUBE_API_KEY not set — using RSS feed (no durations, latest 15)');
  }
  // If RSS also fails this throws, failing the build — the last good deploy stays live.
  return normalize(await fromRss());
});

export async function getPublished() {
  return (await getEpisodes())
    .filter((e) => e.status === 'published')
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getUpcoming() {
  return (await getEpisodes()).filter((e) => e.status === 'upcoming');
}

export async function getEpisodeBySlug(slug: string) {
  const all = await getPublished();
  return all.find((e) => e.slug === slug)
    ?? all.find((e) => e.number === numberFromSlug(slug))
    ?? null;
}
