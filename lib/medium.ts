// Press On Ventures — Medium RSS integration for Blog page
// Fetches https://medium.com/feed/@pressonvc, parses RSS/Atom XML

import { BlogPost, FALLBACK_BLOG } from './data';

const FEED_URL = 'https://medium.com/feed/@pressonvc';

// Category override map (by URL slug fragment)
const CAT_OVERRIDES: Record<string, string> = {
  'why-were-backing': 'portfolio',
  'introducing': 'portfolio',
  'your-business-needs-a-brain': 'tools',
  'stop-guessing-start-testing': 'best',
  'ai-assisted-mvp-development': 'tools',
  'what-the-ref': 'best',
  'americas-next-top-model': 'best',
  'perfectionism': 'best',
  'turning-perfectionism': 'best',
  'rise-of-ai-in-programming': 'tools',
  'chatgpt-craze': 'trends',
  'everyone-uses-ai': 'trends',
  'code-blue': 'trends',
  'watch-what-you-trust': 'trends',
};

// Company logo map keyed by URL slug fragment
const LOGO_MAP: Record<string, string> = {
  'why-were-backing-vuelo': '/company-logos/vuelo.png',
  'why-were-backing-gato': '/company-logos/gato.svg',
  'why-were-backing-magic-story': '/company-logos/magicstory.png',
  'why-were-backing-cofertility': '/company-logos/cofertility.png',
  'why-were-backing-10beauty': '/company-logos/10beauty.png',
  'why-were-backing-feno': '/company-logos/feno.png',
  'why-were-backing-sipmargs': '/company-logos/sipmargs.png',
  'why-were-backing-jacob': '/company-logos/jacobbar.png',
};

function getCategory(url: string, title: string): string {
  const lower = url.toLowerCase();
  const titleLower = title.toLowerCase();

  // Title-based overrides first
  if (titleLower.startsWith("why we're backing") || titleLower.startsWith('why were backing')) return 'portfolio';
  if (titleLower.startsWith('introducing ')) return 'portfolio';

  // URL slug overrides
  for (const [slug, cat] of Object.entries(CAT_OVERRIDES)) {
    if (lower.includes(slug)) return cat;
  }

  return 'trends'; // default
}

function getLogo(url: string): string | undefined {
  const lower = url.toLowerCase();
  for (const [slug, logo] of Object.entries(LOGO_MAP)) {
    if (lower.includes(slug)) return logo;
  }
  return undefined;
}

function extractText(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = xml.match(re);
  if (!m) return '';
  return m[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .trim();
}

function extractCdata(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const m = xml.match(re);
  return m ? m[1].trim() : '';
}

function parseDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function extractExcerpt(htmlContent: string): string {
  // Strip HTML tags and get first ~200 chars
  const text = htmlContent
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.slice(0, 220).trim() + (text.length > 220 ? '...' : '');
}

function extractHeroImage(htmlContent: string): string | undefined {
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  const figMatch = htmlContent.match(/<figure[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
  if (figMatch) return figMatch[1];
  return undefined;
}

function parseItems(xml: string): BlogPost[] {
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  const posts: BlogPost[] = [];
  let match;

  while ((match = itemRe.exec(xml)) !== null) {
    const item = match[1];

    const title = extractText(item, 'title');
    const url = extractText(item, 'link').replace(/^.*?(https?:\/\/)/, '$1') ||
      extractText(item, 'guid');
    const dateStr = extractText(item, 'pubDate');
    const author = extractCdata(item, 'dc:creator') || extractText(item, 'dc:creator') || 'Press On Ventures';
    const contentRaw = extractCdata(item, 'content:encoded') || extractText(item, 'content:encoded');

    if (!title || !url) continue;

    const cleanUrl = url.replace(/\?source=[^&]+/g, '');
    const excerpt = extractExcerpt(contentRaw);
    const img = extractHeroImage(contentRaw);
    const cat = getCategory(cleanUrl, title);
    const logo = getLogo(cleanUrl);

    const iso = dateStr ? new Date(dateStr).toISOString() : undefined;

    posts.push({
      title,
      author,
      date: parseDate(dateStr),
      dateISO: iso && iso !== 'Invalid Date' ? iso : undefined,
      cat,
      url: cleanUrl,
      excerpt,
      img: img ?? undefined,
      logo: logo ?? undefined,
    });
  }

  return posts;
}

// Normalize a Medium URL to its slug-id so the same post from the live feed and
// the curated archive dedupe cleanly (strip query params and trailing slashes).
function urlKey(url: string): string {
  return url
    .replace(/[?#].*$/, '')
    .replace(/\/+$/, '')
    .split('/')
    .pop()!
    .toLowerCase();
}

// Merge the live Medium feed (newest ~10) with the curated archive of older
// posts. The live feed wins on duplicates (freshest metadata), the archive
// supplies everything Medium's RSS no longer returns. Result is
// reverse-chronological; archive array order breaks ties for undated posts.
function mergeWithArchive(feed: BlogPost[]): BlogPost[] {
  const seen = new Set(feed.map((p) => urlKey(p.url)));
  const archiveExtra = FALLBACK_BLOG.filter((p) => !seen.has(urlKey(p.url)));

  // Assign a tie-break ordinal: feed posts first (newest), then archive order.
  const withOrder = [
    ...feed.map((p, i) => ({ p, src: 0, i })),
    ...archiveExtra.map((p, i) => ({ p, src: 1, i })),
  ];

  withOrder.sort((a, b) => {
    const at = a.p.dateISO ? Date.parse(a.p.dateISO) : NaN;
    const bt = b.p.dateISO ? Date.parse(b.p.dateISO) : NaN;
    const ad = a.p.date ? Date.parse(a.p.date) : NaN;
    const bd = b.p.date ? Date.parse(b.p.date) : NaN;
    const aKey = !Number.isNaN(at) ? at : ad;
    const bKey = !Number.isNaN(bt) ? bt : bd;
    if (!Number.isNaN(aKey) && !Number.isNaN(bKey) && aKey !== bKey) {
      return bKey - aKey; // newest first
    }
    // Fall back to source + original array order to keep a stable, sensible order.
    if (a.src !== b.src) return a.src - b.src;
    return a.i - b.i;
  });

  return withOrder.map((x) => x.p);
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const resp = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'PressonVC-Website/1.0' },
      next: { revalidate: 3600 }, // ISR: revalidate hourly
    });

    if (!resp.ok) {
      console.warn(`[medium] HTTP ${resp.status} - using fallback archive`);
      return FALLBACK_BLOG;
    }

    const xml = await resp.text();
    const posts = parseItems(xml);

    if (posts.length === 0) {
      console.warn('[medium] No posts parsed - using fallback archive');
      return FALLBACK_BLOG;
    }

    // Merge the fresh feed with older archived posts Medium RSS no longer serves.
    return mergeWithArchive(posts);
  } catch (err) {
    console.warn('[medium] Fetch failed - using fallback archive:', err);
    return FALLBACK_BLOG;
  }
}
