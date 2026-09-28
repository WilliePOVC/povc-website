// Pure parsing helpers — no runtime imports, so they run under `node --test` directly.
import type { Chapter, Topic } from './types';

export const SHOW_NAME = 'First Press';
export const TOPICS = ['Founders', 'Operators', 'Investors', 'Thesis'] as const;

export function parseIsoDuration(iso?: string): number | null {
  if (!iso) return null;
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m || (!m[1] && !m[2] && !m[3])) return null;
  return (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0));
}

export function toIsoDuration(sec: number): string {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return `PT${h ? h + 'H' : ''}${m ? m + 'M' : ''}${s || (!h && !m) ? s + 'S' : ''}`;
}

const EP_RE = /\b(?:ep(?:isode)?\.?\s*#?\s*)(\d{1,3})\b/i;

export function parseEpisodeNumber(title: string): number | null {
  const m = EP_RE.exec(title);
  return m ? parseInt(m[1], 10) : null;
}

export function cleanTitle(title: string, show = SHOW_NAME): string {
  const esc = show.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return title
    .replace(EP_RE, '')
    .replace(new RegExp(esc, 'ig'), '')
    .replace(/\s*[|·]\s*(?=[|·]|$)/g, '')
    .replace(/^[\s|·:—–-]+|[\s|·:—–-]+$/g, '')
    .trim();
}

export function slugify(s: string): string {
  return s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
    .replace(/-+$/, '');
}

export const episodeSlug = (n: number, title: string) =>
  `ep-${String(n).padStart(2, '0')}-${slugify(title)}`;

export const numberFromSlug = (slug: string) => {
  const m = /^ep-(\d+)/.exec(slug);
  return m ? parseInt(m[1], 10) : null;
};

const TS_RE = /^\s*\(?((?:\d{1,2}:)?\d{1,2}:\d{2})\)?\s*[-–—:]?\s*(.+?)\s*$/;
const toSec = (ts: string) => ts.split(':').map(Number).reduce((a, n) => a * 60 + n, 0);

export function parseChapters(desc: string): Chapter[] {
  const out: Chapter[] = [];
  for (const line of desc.split('\n')) {
    const m = TS_RE.exec(line);
    if (m) out.push({ t: toSec(m[1]), label: m[2] });
  }
  return out.length >= 2 ? out : [];
}

export function parseMeta(desc: string) {
  const get = (k: string) => new RegExp(`^\\s*${k}:\\s*(.+)$`, 'im').exec(desc)?.[1].trim() ?? null;
  const guestRaw = get('Guest');
  let guest: { name: string; role?: string } | null = null;
  if (guestRaw) {
    const [name, ...rest] = guestRaw.split(/\s+[—–-]\s+|,\s*/);
    guest = { name: name.trim(), role: rest.join(', ').trim() || undefined };
  }
  const topicRaw = get('Topic');
  const topic = (TOPICS as readonly string[]).find(
    (t) => t.toLowerCase() === topicRaw?.toLowerCase()) as Topic | undefined;
  const portfolio = get('Portfolio');
  return {
    guest,
    topic: topic ?? null,
    portfolioSlug: portfolio && /^[a-z0-9-]+$/.test(portfolio) ? portfolio : null,
  };
}

export function parseSummary(desc: string): string[] {
  const stop = /^\s*(Guest|Topic|Portfolio):|^\s*\(?(?:\d{1,2}:)?\d{1,2}:\d{2}/im;
  const idx = desc.search(stop);
  const head = idx === -1 ? desc : desc.slice(0, idx);
  return head.split(/\n\s*\n/)
    .map((p) => p.replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').replace(/[:\s]+$/, '').trim())
    .filter(Boolean).slice(0, 2);
}

export function decodeXml(s: string): string {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&amp;/g, '&');
}

export type RssEntry = { videoId: string; title: string; description: string; publishedAt: string; thumb: string };

export function parseRss(xml: string): RssEntry[] {
  const out: RssEntry[] = [];
  const tag = (s: string, t: string) => new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`).exec(s)?.[1] ?? '';
  for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const e = m[1];
    const videoId = tag(e, 'yt:videoId').trim();
    if (!videoId) continue;
    out.push({
      videoId,
      title: decodeXml(tag(e, 'title').trim()),
      description: decodeXml(tag(e, 'media:description')),
      publishedAt: tag(e, 'published').trim(),
      thumb: /<media:thumbnail url="([^"]+)"/.exec(e)?.[1] ?? '',
    });
  }
  return out;
}
