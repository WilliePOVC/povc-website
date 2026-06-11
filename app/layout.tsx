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

export const metadata: Metadata = {
  title: {
    default: 'Press On Ventures',
    template: '%s | Press On Ventures',
  },
  description:
    'Early-stage consumer venture capital. Investing in resilient founders building transformative consumer businesses.',
  metadataBase: new URL('https://www.presson.vc'),
  openGraph: {
    siteName: 'Press On Ventures',
    type: 'website',
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
