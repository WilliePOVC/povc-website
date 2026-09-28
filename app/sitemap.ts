import type { MetadataRoute } from 'next';
import { COMPANIES } from '@/lib/data';
import { getPublished } from '@/lib/podcast/youtube';

export const dynamic = 'force-static';
const SITE = 'https://www.presson.vc';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/portfolio', '/team', '/thesis', '/podcast', '/press', '/blog'].map((p) => ({ url: `${SITE}${p}` }));
  const companies = COMPANIES.map((c) => ({ url: `${SITE}/portfolio/${c.slug}` }));
  const episodes = (await getPublished()).map((e) => ({ url: `${SITE}/podcast/${e.slug}`, lastModified: e.publishedAt }));
  return [...pages, ...companies, ...episodes];
}
