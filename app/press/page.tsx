import type { Metadata } from 'next';
import { fetchPressItems } from '@/lib/notion';
import PressClient from './PressClient';
import { PRESS_FEATURED, pressSortKey } from '@/lib/data';

export const revalidate = 3600; // ISR: revalidate hourly

export const metadata: Metadata = {
  title: 'Press',
  description:
    'Our portfolio, in the headlines. From robotic manicures to canned margaritas, our founders are building companies the world is paying attention to.',
};

export default async function PressPage() {
  const fetched = await fetchPressItems();
  // Guarantee reverse-chronological order (newest first) regardless of source.
  const pressItems = [...fetched].sort((a, b) => pressSortKey(b) - pressSortKey(a));

  // Derive featured-in publications from data
  const featuredPubs = [...new Set(pressItems.map((p) => p.pub))].filter(
    (pub) => PRESS_FEATURED.includes(pub)
  );
  // Fall back to full PRESS_FEATURED if we get nothing useful
  const displayPubs = featuredPubs.length > 0 ? featuredPubs : PRESS_FEATURED;

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <div className="eyebrow reveal">Press &amp; Recognition</div>
          <h1 className="reveal reveal-d1">Our portfolio, in the headlines.</h1>
          <p className="lede reveal reveal-d2">
            From robotic manicures rolling out in Ulta to canned margaritas making the Wall Street
            Journal, our founders are building companies the world is paying attention to.
          </p>
        </div>
      </header>

      <PressClient pressItems={pressItems} featuredPubs={displayPubs} />
    </>
  );
}
