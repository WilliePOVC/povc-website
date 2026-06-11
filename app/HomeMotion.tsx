'use client';

import { useEffect } from 'react';

// Home page cinematic motion layer.
//
// Progressive enhancement: the page's static end-state is fully rendered by the
// server component (page.tsx). This module ONLY adds motion on top and is gated
// behind `prefers-reduced-motion`, so if JS fails or motion is reduced the page
// still reads correctly. It hooks into elements by id/data-attribute rather than
// owning any markup.
//
//   - Hero headline: split into word spans that stagger in (translateY + blur),
//     with a one-shot "power-on flicker" on the accent words.
//   - Hero cursor spotlight: a soft beige glow that eases toward the pointer
//     (desktop / fine-pointer only).
//   - Thesis teaser quote: words light dim -> white left-to-right on scroll, the
//     final two resolving to beige with a glow.
//   - Contact CTA: the power mark "ignites" (fill sweeps up) when scrolled in.
export default function HomeMotion() {
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    // ── Hero: kinetic headline (word stagger + power-on flicker) ──
    (() => {
      const h1 = document.getElementById('heroH1');
      if (!h1 || REDUCED) return;
      if (h1.dataset.split === '1') return; // idempotent across re-mounts

      const splitWords = (node: Node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (child.textContent || '').split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
              } else {
                const s = document.createElement('span');
                s.className = 'hw';
                s.textContent = part;
                frag.appendChild(s);
              }
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1) {
            splitWords(child);
          }
        });
      };

      splitWords(h1);
      h1.dataset.split = '1';
      h1.classList.add('split');
      const ws = h1.querySelectorAll<HTMLElement>('.hw');
      ws.forEach((w, i) => {
        w.style.transitionDelay = `${0.12 + i * 0.09}s`;
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => h1.classList.add('in'));
      });
    })();

    // ── Hero: cursor spotlight ──
    (() => {
      if (REDUCED || !window.matchMedia('(pointer: fine)').matches) return;
      const hero = document.getElementById('heroSection');
      const spot = document.getElementById('heroSpot');
      if (!hero || !spot) return;

      let tx = 0,
        ty = 0,
        x = 0,
        y = 0;
      let raf: number | null = null;

      const tick = () => {
        x += (tx - x) * 0.08;
        y += (ty - y) * 0.08;
        spot.style.transform = `translate(${x - 310}px,${y - 310}px)`;
        if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = null;
        }
      };

      const onMove = (e: MouseEvent) => {
        const r = hero.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
        hero.classList.add('spotOn');
        if (!raf) raf = requestAnimationFrame(tick);
      };
      const onLeave = () => hero.classList.remove('spotOn');

      hero.addEventListener('mousemove', onMove);
      hero.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        hero.removeEventListener('mousemove', onMove);
        hero.removeEventListener('mouseleave', onLeave);
        if (raf) cancelAnimationFrame(raf);
      });
    })();

    // ── Thesis: scroll-lit quote ──
    (() => {
      const tq = document.getElementById('tq');
      if (!tq || REDUCED) return;
      if (tq.dataset.split !== '1') {
        const words = (tq.textContent || '').trim().split(/\s+/);
        tq.innerHTML = words
          .map((w, i) => {
            const hl = i >= words.length - 2 ? ' hl' : '';
            return `<span class="qw${hl}">${w}</span>`;
          })
          .join(' ');
        tq.dataset.split = '1';
      }
      const qws = tq.querySelectorAll<HTMLElement>('.qw');

      const quoteTick = () => {
        const r = tq.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        let p = (vh * 0.92 - r.top) / (vh * 0.52);
        p = Math.max(0, Math.min(1, p));
        const n = Math.round(p * qws.length);
        qws.forEach((w, i) => w.classList.toggle('lit', i < n));
      };

      quoteTick();
      window.addEventListener('scroll', quoteTick, { passive: true });
      window.addEventListener('resize', quoteTick, { passive: true });
      cleanups.push(() => {
        window.removeEventListener('scroll', quoteTick);
        window.removeEventListener('resize', quoteTick);
      });
    })();

    // ── Contact: power-on ignition when revealed ──
    (() => {
      const cta = document.getElementById('contact');
      if (!cta) return;
      if (REDUCED) {
        cta.classList.add('lit');
        return;
      }
      const igniteTick = () => {
        const r = cta.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800) * 0.78) {
          cta.classList.add('lit');
          window.removeEventListener('scroll', igniteTick);
        }
      };
      igniteTick();
      window.addEventListener('scroll', igniteTick, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', igniteTick));
    })();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
