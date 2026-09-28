import s from '@/app/podcast/podcast.module.css';
import { PODCAST } from '@/lib/podcast/config';
import { ArrowUpRight } from './icons';

export default function PitchGuestCTA() {
  const href = `mailto:${PODCAST.pitchEmail}?subject=${encodeURIComponent(PODCAST.name + ' guest idea')}`;
  return (
    <section className={s.pitch}>
      <div className={`container ${s.pitchInner}`}>
        <div>
          <div className={s.eyebrowLight}>Be on the show</div>
          <h2 className={s.h2}>Know a founder who presses on?</h2>
        </div>
        <a href={href} className={s.pitchBtn}>{PODCAST.pitchEmail} <ArrowUpRight /></a>
      </div>
    </section>
  );
}
