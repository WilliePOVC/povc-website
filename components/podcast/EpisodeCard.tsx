import Link from 'next/link';
import s from '@/app/podcast/podcast.module.css';
import EpisodeTile from './EpisodeTile';
import { PlayIcon } from './icons';
import { fmtMin, fmtMonthDay, pad2 } from '@/lib/podcast/format';
import type { Episode } from '@/lib/podcast/types';

export function guestText(ep: Episode) {
  if (!ep.guest) return null;
  if (!ep.guest.role) return ep.guest.name;
  const parts = ep.guest.role.split(',').map((x) => x.trim());
  return parts.length > 1 ? `${ep.guest.name}, ${parts.slice(0, -1).join(', ')} at ${parts.at(-1)}` : `${ep.guest.name}, ${ep.guest.role}`;
}

export default function EpisodeCard({ ep }: { ep: Episode }) {
  const upcoming = ep.status === 'upcoming';
  const meta = [`Ep ${pad2(ep.number)}`, ep.topic, fmtMin(ep.durationSec)].filter(Boolean).join(' · ');
  const inner = (
    <>
      <div className={s.cardTileWrap}>
        <EpisodeTile ep={ep} size="sm">
          {upcoming ? (
            <span className={s.comingBadge}>Coming {ep.scheduledAt ? fmtMonthDay(ep.scheduledAt) : 'soon'}</span>
          ) : (
            <span className={s.cardPlay}><PlayIcon /></span>
          )}
        </EpisodeTile>
      </div>
      <div className={s.cardBody}>
        <div className={s.cardMeta}>{meta}</div>
        <h3 className={s.cardTitle}>{ep.title}</h3>
        {guestText(ep) && <div className={s.cardGuest}>{guestText(ep)}</div>}
      </div>
    </>
  );
  if (upcoming) return <div className={`${s.card} ${s.cardUpcoming}`}>{inner}</div>;
  return <Link href={`/podcast/${ep.slug}`} className={s.card}>{inner}</Link>;
}
