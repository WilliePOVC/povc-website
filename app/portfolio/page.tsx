import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { COMPANIES } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Twelve teams, one conviction: press on. We partner early with founders building across consumer health & well-being and travel & experiential.',
};

export default function PortfolioPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <div className="eyebrow reveal">The Portfolio</div>
          <h1 className="reveal reveal-d1">Twelve teams, one conviction: press on.</h1>
          <p className="lede reveal reveal-d2">
            We partner early, from pre-seed through Series A, with founders building across consumer
            health &amp; well-being and travel &amp; experiential. These are the companies we&apos;re
            proud to back.
          </p>
        </div>
      </header>
      <PortfolioClient companies={COMPANIES} />
    </>
  );
}
