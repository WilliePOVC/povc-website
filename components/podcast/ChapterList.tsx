'use client';
import s from '@/app/podcast/podcast.module.css';
import { fmtTs } from '@/lib/podcast/format';
import type { Chapter } from '@/lib/podcast/types';

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
  return (
    <ol className={s.chapters}>
      {chapters.map((c) => (
        <li key={c.t}>
          <button className={s.chapter} onClick={() => window.dispatchEvent(new CustomEvent('podcast:seek', { detail: c.t }))}>
            <span className={s.chapterTs}>{fmtTs(c.t)}</span>
            <span>{c.label}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
