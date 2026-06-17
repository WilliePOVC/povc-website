import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealInit from '@/components/RevealInit';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

// OG/Twitter crawlers require ABSOLUTE image URLs (they fetch from an external
// server, so basePath-relative paths won't resolve). Point metadataBase at the
// actual deploy origin: the GitHub Pages preview now, presson.vc once it lands
// there. The og-image lives under the basePath on Pages.
const isPages = process.env.PAGES === 'true';
const SITE_URL = isPages
  ? 'https://williepovc.github.io'
  : 'https://www.presson.vc';
const BASE_PATH = isPages ? '/povc-website' : '';
const OG_IMAGE = `${SITE_URL}${BASE_PATH}/og-image.png`;

const SITE_DESCRIPTION =
  'Early-stage consumer venture capital. Investing in resilient founders building transformative consumer businesses.';

export const metadata: Metadata = {
  title: {
    default: 'Press On Ventures',
    template: '%s | Press On Ventures',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Press On Ventures',
    description: SITE_DESCRIPTION,
    siteName: 'Press On Ventures',
    type: 'website',
    url: `${SITE_URL}${BASE_PATH}/`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Press On Ventures. Backing Founders who Press On.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press On Ventures',
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <RevealInit />
      </body>
    </html>
  );
}
