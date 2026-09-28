import { SHOW_NAME, TOPICS } from './parse';

export const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCBZ2His5V_nTxXtBc4cxeUA';

export const PODCAST = {
  name: SHOW_NAME,
  eyebrow: 'The Press On Podcast',
  blurb:
    'Conversations with resilient founders building transformative consumer businesses across health, well-being, and experiences.',
  listen: {
    youtube: `https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`,
    spotify: '', // empty → pill hidden
    apple: '',
    rss: '', // audio-host podcast RSS, if any
  },
  pitchEmail: 'getintouch@presson.vc',
  topics: TOPICS,
  episodeMinSeconds: 180,
  siteUrl: 'https://www.presson.vc',
};
