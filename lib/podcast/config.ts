import { SHOW_NAME, TOPICS } from './parse';

export const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCBZ2His5V_nTxXtBc4cxeUA';

export const PODCAST = {
  name: SHOW_NAME,
  eyebrow: 'The Press On Podcast',
  blurb:
    'Conversations with resilient founders building transformative consumer businesses across health, well-being, and experiences.',
  listen: {
    youtube: `https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`,
    spotify: 'https://open.spotify.com/show/58n8UK1qjktL5t3sNAzVzr',
    apple: 'https://podcasts.apple.com/us/podcast/first-press-by-press-on-ventures/id6815350094',
    tiktok: 'https://www.tiktok.com/@firstpress_povc',
    rss: '', // audio-host podcast RSS, if any
  },
  // 'youtube' = use each video's YouTube thumbnail (title card); 'branded' = generated number tiles
  tileMode: 'youtube' as 'youtube' | 'branded',
  pitchEmail: 'getintouch@presson.vc',
  topics: TOPICS,
  episodeMinSeconds: 180,
  siteUrl: 'https://www.presson.vc',
};
