// Generate favicon assets: white power mark on the dark ink brand tile.
// Outputs: app/icon.png (32), app/apple-icon.png (180), public/icon.svg
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const INK = '#1f1f1f';
const MARK_W = 2143;
const MARK_H = 2181;

// The two-path power mark (white), centered with padding on a rounded ink tile.
// viewBox sized to the mark; we place it inside a padded square tile.
const markPaths = `
  <path fill-rule="evenodd" clip-rule="evenodd" d="M576.286 710.715L318.249 380.435L6.21854 692.463C4.24636 694.432 2.68179 696.77 1.61468 699.344C0.547567 701.919 -0.000968033 704.678 1.28241e-06 707.465V1511.11C-0.000968033 1513.9 0.547567 1516.66 1.61468 1519.23C2.68179 1521.8 4.24636 1524.14 6.21854 1526.11L654.759 2174.78C656.727 2176.75 659.064 2178.32 661.638 2179.38C664.212 2180.45 666.971 2181 669.757 2181H1473.23C1476.02 2181 1478.78 2180.45 1481.35 2179.39C1483.93 2178.32 1486.27 2176.75 1488.24 2174.78L2136.78 1526.11C2140.76 1522.13 2143 1516.74 2143 1511.11V707.465C2143 701.838 2140.76 696.442 2136.78 692.463L1821.16 376.777L1554.71 717.84C1639.16 826.726 1684.9 960.67 1684.69 1098.48C1684.69 1442.08 1406.21 1720.61 1062.68 1720.61C719.15 1720.61 440.685 1442.08 440.685 1098.48C440.481 957.561 488.312 820.784 576.286 710.715V710.715Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1304.94 0V1150.94H838.543V0H1304.94Z" fill="white"/>
`;

// Build a square tile SVG: ink background (rounded), mark centered at ~62% scale.
function tileSVG(size, { radiusRatio = 0.22, markScale = 0.6 } = {}) {
  const tile = 1000; // internal coordinate space
  const r = tile * radiusRatio;
  // Scale mark to markScale of tile, preserving aspect ratio (mark is slightly taller than wide)
  const scale = (tile * markScale) / MARK_H;
  const mw = MARK_W * scale;
  const mh = MARK_H * scale;
  const tx = (tile - mw) / 2;
  const ty = (tile - mh) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${tile} ${tile}">
  <rect width="${tile}" height="${tile}" rx="${r}" ry="${r}" fill="${INK}"/>
  <g transform="translate(${tx},${ty}) scale(${scale})">
    ${markPaths}
  </g>
</svg>`;
}

mkdirSync(join(ROOT, 'app'), { recursive: true });
mkdirSync(join(ROOT, 'public'), { recursive: true });

// Scalable SVG favicon (crisp at any size; smaller corner radius reads better tiny)
writeFileSync(join(ROOT, 'public', 'icon.svg'), tileSVG(512, { radiusRatio: 0.18, markScale: 0.6 }));

// 32px favicon PNG -> app/icon.png (Next.js App Router auto-detects)
await sharp(Buffer.from(tileSVG(32, { radiusRatio: 0.18, markScale: 0.62 })))
  .resize(32, 32)
  .png()
  .toFile(join(ROOT, 'app', 'icon.png'));

// 180px apple touch icon -> app/apple-icon.png
await sharp(Buffer.from(tileSVG(180, { radiusRatio: 0.22, markScale: 0.58 })))
  .resize(180, 180)
  .png()
  .toFile(join(ROOT, 'app', 'apple-icon.png'));

// Also a 512 maskable/PWA-friendly icon in public
await sharp(Buffer.from(tileSVG(512, { radiusRatio: 0.22, markScale: 0.6 })))
  .resize(512, 512)
  .png()
  .toFile(join(ROOT, 'public', 'icon-512.png'));

console.log('favicon assets written: app/icon.png, app/apple-icon.png, public/icon.svg, public/icon-512.png');
