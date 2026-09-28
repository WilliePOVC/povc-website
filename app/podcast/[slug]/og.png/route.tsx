import { ImageResponse } from 'next/og';
import { getPublished, getEpisodeBySlug } from '@/lib/podcast/youtube';
import { PODCAST } from '@/lib/podcast/config';
import { pad2 } from '@/lib/podcast/format';

// Served as a real .png file so GitHub Pages sends Content-Type: image/png.
export const dynamic = 'force-static';
export const dynamicParams = false;
const size = { width: 1200, height: 630 };

export async function generateStaticParams() {
  return (await getPublished()).map((e) => ({ slug: e.slug }));
}

async function inter(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@700', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534 (KHTML, like Gecko)' },
    })).text();
    const src = /src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/.exec(css)?.[1];
    return src ? await (await fetch(src)).arrayBuffer() : null;
  } catch { return null; }
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const ep = await getEpisodeBySlug((await params).slug);
  const font = await inter();
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: '#E0D8D1', color: '#292929', padding: 64, fontFamily: font ? 'Inter' : 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5, textTransform: 'uppercase', fontWeight: 700 }}>
          {PODCAST.name} · Press On Ventures
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48 }}>
          <div style={{ fontSize: 260, fontWeight: 700, lineHeight: 0.8, letterSpacing: -14 }}>{pad2(ep?.number ?? 0)}</div>
          <div style={{ display: 'flex', flex: 1, fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>{ep?.title ?? PODCAST.name}</div>
        </div>
      </div>
    ),
    { ...size, ...(font ? { fonts: [{ name: 'Inter', data: font, weight: 700 as const, style: 'normal' as const }] } : {}) },
  );
}
