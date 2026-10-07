import s from '@/app/podcast/podcast.module.css';
import { PODCAST } from '@/lib/podcast/config';
import { YouTubeIcon, SpotifyIcon, AppleIcon, TikTokIcon, RssIcon } from './icons';

export default function SubscribeLinks() {
  const l = PODCAST.listen;
  return (
    <div className={s.subscribe}>
      <div className={s.subEyebrow}>Listen &amp; Subscribe</div>
      <div className={s.subPills}>
        <a href={l.youtube} target="_blank" rel="noopener noreferrer" className={`${s.pill} ${s.pillWhite}`}><YouTubeIcon />YouTube</a>
        {l.spotify && <a href={l.spotify} target="_blank" rel="noopener noreferrer" className={s.pill}><SpotifyIcon />Spotify</a>}
        {l.apple && <a href={l.apple} target="_blank" rel="noopener noreferrer" className={s.pill}><AppleIcon />Apple Podcasts</a>}
        {l.tiktok && <a href={l.tiktok} target="_blank" rel="noopener noreferrer" className={s.pill}><TikTokIcon />TikTok</a>}
        {l.rss && <a href={l.rss} target="_blank" rel="noopener noreferrer" className={s.rss} aria-label="Podcast RSS feed"><RssIcon /></a>}
      </div>
    </div>
  );
}
