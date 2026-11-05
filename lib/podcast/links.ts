// Per-episode deep links (keyed by YouTube videoId). Missing = falls back to the show page.
export const EPISODE_LINKS: Record<string, { spotify?: string; apple?: string }> = {
  yPCRd2nWH_Q: {
    spotify: 'https://open.spotify.com/episode/1rYyw6ZpFfAhsyiABKb05s',
    apple: 'https://podcasts.apple.com/us/podcast/agentic-shopping-with-scout-ceo-ethan-arpi-first-press-ep-01/id6815350094?i=1000791331779',
  },
  H7JmPiBCZG0: {
    spotify: 'https://open.spotify.com/episode/1GmkqC2DA7abK6iOwhmQzp',
    apple: 'https://podcasts.apple.com/us/podcast/sunscreen-as-everyday-skincare-first-press-ep-02/id6815350094?i=1000791334643',
  },
  xf7NtIhOOBU: {
    spotify: 'https://open.spotify.com/episode/7w5JetgBmYaEWqQoRzNrf6',
    apple: 'https://podcasts.apple.com/us/podcast/building-with-purpose-with-cofertility-ceo-lauren/id6815350094?i=1000795994579',
  },
  a7iTuJGYkQA: {
    spotify: 'https://open.spotify.com/episode/3fXA2LcEMmaeMnSyV8FvfP',
    apple: 'https://podcasts.apple.com/us/podcast/willie-litvack-on-building-and-investing-at-press-on/id6815350094?i=1000800116277',
  },
};
