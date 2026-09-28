'use client';
import { useEffect, useMemo, useState } from 'react';
import s from '@/app/podcast/podcast.module.css';
import EpisodeCard from './EpisodeCard';
import { PODCAST } from '@/lib/podcast/config';
import type { Episode, Topic } from '@/lib/podcast/types';

const PAGE = 9;

export default function EpisodeGrid({ episodes, upcoming }: { episodes: Episode[]; upcoming: Episode[] }) {
  const all = useMemo(() => [...upcoming, ...episodes], [upcoming, episodes]);
  const topics = PODCAST.topics.filter((t) => all.some((e) => e.topic === t));
  const [topic, setTopic] = useState<Topic | null>(null);
  const [shown, setShown] = useState(PAGE);

  // Static export: read/write ?topic= directly (no server search params).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('topic');
    const t = topics.find((x) => x.toLowerCase() === q?.toLowerCase());
    if (t) setTopic(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick(t: Topic | null) {
    setTopic(t);
    setShown(PAGE);
    const url = new URL(window.location.href);
    if (t) url.searchParams.set('topic', t.toLowerCase()); else url.searchParams.delete('topic');
    window.history.replaceState(null, '', url.toString());
  }

  const filtered = topic ? all.filter((e) => e.topic === topic) : all;

  return (
    <>
      <div className={s.gridHead}>
        <div>
          <div className={s.eyebrowLight}>All Episodes</div>
          <h2 className={s.h2}>Every conversation.</h2>
        </div>
        {topics.length >= 2 && (
          <div className={s.chips} role="group" aria-label="Filter episodes by topic">
            <button className={`${s.chip} ${!topic ? s.chipActive : ''}`} aria-pressed={!topic} onClick={() => pick(null)}>All</button>
            {topics.map((t) => (
              <button key={t} className={`${s.chip} ${topic === t ? s.chipActive : ''}`} aria-pressed={topic === t} onClick={() => pick(t)}>{t}</button>
            ))}
          </div>
        )}
      </div>
      <div className={s.grid}>
        {filtered.slice(0, shown).map((ep) => <EpisodeCard key={ep.videoId} ep={ep} />)}
      </div>
      {filtered.length > shown && (
        <div className={s.moreWrap}>
          <button className={s.moreBtn} onClick={() => setShown((n) => n + PAGE)}>Load more episodes</button>
        </div>
      )}
    </>
  );
}
