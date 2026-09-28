import s from '@/app/podcast/podcast.module.css';
import PowerMark from '@/components/ui/PowerMark';
import { PODCAST } from '@/lib/podcast/config';
import { pad2 } from '@/lib/podcast/format';
import type { Episode } from '@/lib/podcast/types';

type Props = { ep: Episode; size?: 'sm' | 'md' | 'lg' | 'xl'; variant?: Episode['tileVariant']; children?: React.ReactNode };

export default function EpisodeTile({ ep, size = 'md', variant, children }: Props) {
  const v = variant ?? ep.tileVariant;
  const guestLine = ep.guest ? [ep.guest.name, ep.guest.role?.split(',').pop()?.trim()].filter(Boolean).join(' · ') : null;
  return (
    <div className={`${s.tile} ${s['tile_' + v]} ${s['tile_' + size]}`} aria-hidden="true">
      <div className={s.tileTop}>
        <PowerMark className={s.tileMark} />
        <span>{PODCAST.name}</span>
      </div>
      <div className={s.tileBottom}>
        <div className={s.tileNum}>{pad2(ep.number)}</div>
        {(size === 'lg' || size === 'xl') && guestLine && <div className={s.tileGuest}>{guestLine}</div>}
      </div>
      {children}
    </div>
  );
}
