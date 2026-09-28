'use client';
import { useEffect, useRef, useState } from 'react';
import s from '@/app/podcast/podcast.module.css';
import EpisodeTile from './EpisodeTile';
import { PlayIcon } from './icons';
import type { Episode } from '@/lib/podcast/types';

type Props = { ep: Episode; size?: 'lg' | 'xl'; badge?: string; playSize?: 'md' | 'lg'; className?: string };

export default function YouTubeFacade({ ep, size = 'lg', badge, playSize = 'md', className = '' }: Props) {
  const [start, setStart] = useState<number | null>(null); // null = not playing
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onSeek = (e: Event) => {
      const t = (e as CustomEvent<number>).detail;
      if (start === null) { setStart(t); return; }
      frame.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [t, true] }), '*');
      frame.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      frame.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    window.addEventListener('podcast:seek', onSeek);
    return () => window.removeEventListener('podcast:seek', onSeek);
  }, [start]);

  if (start !== null) {
    const src = `https://www.youtube-nocookie.com/embed/${ep.videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&start=${start}`;
    return (
      <div className={`${s.player} ${className}`}>
        <iframe ref={frame} src={src} title={ep.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      </div>
    );
  }
  return (
    <div className={`${s.player} ${className}`}>
      <EpisodeTile ep={ep} size={size} variant="beige" />
      {badge && <span className={s.newBadge}>{badge}</span>}
      <button className={`${s.play} ${playSize === 'lg' ? s.playCenter : s.playCorner}`} onClick={() => setStart(0)}
        aria-label={`Play episode ${ep.number}: ${ep.title}`}>
        <PlayIcon />
      </button>
    </div>
  );
}
