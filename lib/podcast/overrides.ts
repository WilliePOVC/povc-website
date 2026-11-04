import type { Episode } from './types';

// Escape hatch: fix any episode's metadata without editing YouTube. Keyed by videoId.
// Prefer the Guest:/Topic:/Portfolio: lines in the YouTube description (see README.md).
export const OVERRIDES: Record<string, Partial<Episode>> = {
  // Ep. 01 — Scout (portfolio company)
  yPCRd2nWH_Q: {
    topic: 'Founders',
    guest: { name: 'Ethan Arpi', role: 'Co-founder & CEO, Scout' },
    portfolioSlug: 'scout',
  },
  // Ep. 02 — sunscreen category deep dive, hosted by Madeline Litvack & Josh Neckes
  H7JmPiBCZG0: { topic: 'Thesis' },
  // Ep. 04 — Willie Litvack on building and investing at Press On Ventures (added by Madeline 2026-11-04)
  a7iTuJGYkQA: { topic: 'Thesis', guest: { name: 'William Litvack', role: 'Founder & Managing Partner, Press On Ventures' } },
};
