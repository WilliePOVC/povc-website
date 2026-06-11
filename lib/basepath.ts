// Prefix for static asset paths (company logos, headshots, etc.)
// Used to prepend basePath when deploying to GitHub Pages subpath.
// Set NEXT_PUBLIC_BASE_PATH=/povc-website in the Pages build environment.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix an asset path with the base path for GitHub Pages compatibility. */
export function assetPath(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}
