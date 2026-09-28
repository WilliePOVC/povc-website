export type Topic = 'Founders' | 'Operators' | 'Investors' | 'Thesis';

export type Chapter = { t: number; label: string }; // seconds

export type Episode = {
  videoId: string;
  number: number;
  slug: string;
  title: string;
  summary: string[];
  publishedAt: string;
  durationSec: number | null; // null from RSS fallback
  status: 'published' | 'upcoming';
  scheduledAt?: string;
  topic: Topic | null;
  guest: { name: string; role?: string } | null;
  portfolioSlug: string | null;
  chapters: Chapter[];
  youtubeThumb: string;
  tileVariant: 'beige' | 'dark' | 'grey';
};
