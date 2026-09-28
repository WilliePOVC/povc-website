'use client';
import { useState } from 'react';
import s from '@/app/podcast/podcast.module.css';

export default function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };
  const u = encodeURIComponent(url);
  return (
    <div className={s.share}>
      <button className={s.shareBtn} onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy link'}</button>
      <a className={s.shareBtn} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}>LinkedIn</a>
      <a className={s.shareBtn} target="_blank" rel="noopener noreferrer" href={`https://x.com/intent/post?url=${u}&text=${encodeURIComponent(title)}`}>X</a>
    </div>
  );
}
