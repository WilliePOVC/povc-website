'use client';

import { useEffect } from 'react';

/* ════════════════════════════════════════════════════════════════════════
   Home — cinematic motion engine ("Nightfall+", show-off pass)

   Design goals:
   - Progressive enhancement. The server component renders a correct static
     end-state; this layer ONLY adds motion. Everything is gated behind
     prefers-reduced-motion and degrades cleanly without JS.
   - One rAF loop drives all continuous motion (pointer parallax, spotlight,
     card tilt, idle bloom) so we never stack timers or thrash layout.
   - GPU-only properties (transform / opacity / filter / clip-path). No layout
     reads in the hot path except cached rects refreshed on scroll/resize.

   Effects:
     HERO     kinetic char/word headline reveal, multi-stage accent ignition,
              dual-layer parallax cursor spotlight, depth parallax on the
              floating mark + aurora, boot-up exposure ramp.
     SCROLL   richer reveal (mask + lift + settle) handled in CSS; this file
              adds scroll-velocity skew + a progress signal.
     THESIS   scroll-lit quote with blooming beige + cursor-tilt cards.
     PORTF.   cursor-tracked 3D tilt + gloss sweep on logo tiles.
     CTA      power-mark ignition -> radiant burst -> idle breathing glow.
   ════════════════════════════════════════════════════════════════════════ */

export default function HomeMotion() {
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FINE = window.matchMedia('(pointer: fine)').matches;
    const cleanups: Array<() => void> = [];
    const onCleanup = (fn: () => void) => cleanups.push(fn);

    // Shared pointer state (normalized -1..1 around viewport center) + raw px.
    const ptr = { nx: 0, ny: 0, px: 0, py: 0, active: false };

    /* ─────────────────────────────────────────────────────────────────────
       HERO — kinetic headline (split to words, then chars for the reveal)
       ───────────────────────────────────────────────────────────────────── */
    (() => {
      const h1 = document.getElementById('heroH1');
      if (!h1 || REDUCED || h1.dataset.split === '1') return;

      // Walk text nodes, wrap each word in .hw and each char in .hc so we can
      // animate a per-character mask reveal while keeping words unbreakable.
      const wrap = (node: Node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (child.textContent || '').split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
                return;
              }
              const word = document.createElement('span');
              word.className = 'hw';
              Array.from(part).forEach((ch) => {
                const c = document.createElement('span');
                c.className = 'hc';
                c.textContent = ch;
                word.appendChild(c);
              });
              frag.appendChild(word);
            });
            node.replaceChild(frag, child);
          } else if (
            child.nodeType === 1 &&
            !(child as HTMLElement).classList.contains('hw')
          ) {
            wrap(child);
          }
        });
      };

      wrap(h1);
      h1.dataset.split = '1';
      h1.classList.add('split');

      const chars = Array.from(h1.querySelectorAll<HTMLElement>('.hc'));
      chars.forEach((c, i) => {
        // Slight non-linear easing of the stagger so it accelerates in.
        c.style.transitionDelay = `${0.18 + Math.pow(i, 0.92) * 0.022}s`;
      });

      requestAnimationFrame(() =>
        requestAnimationFrame(() => h1.classList.add('in'))
      );

      // Fire the accent ignition only after the last char has landed.
      const total = 0.18 + Math.pow(chars.length, 0.92) * 0.022 + 0.7;
      const t = window.setTimeout(() => {
        const accent = h1.querySelector('.hero-accent');
        if (accent) accent.classList.add('ignite');
      }, total * 1000);
      onCleanup(() => clearTimeout(t));
    })();

    /* ─────────────────────────────────────────────────────────────────────
       HERO — boot-up exposure ramp (one-time "power on" of the whole stage)
       ───────────────────────────────────────────────────────────────────── */
    (() => {
      const hero = document.getElementById('heroSection');
      if (!hero || REDUCED) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => hero.classList.add('booted'))
      );
    })();

    /* ─────────────────────────────────────────────────────────────────────
       THESIS — scroll-lit quote (split to words once)
       ───────────────────────────────────────────────────────────────────── */
    let quoteTick: (() => void) | null = null;
    (() => {
      const tq = document.getElementById('tq');
      if (!tq || REDUCED) return;
      if (tq.dataset.split !== '1') {
        const words = (tq.textContent || '').trim().split(/\s+/);
        tq.innerHTML = words
          .map((w, i) => {
            const hl = i >= words.length - 2 ? ' hl' : '';
            return `<span class="qw${hl}"><span class="qwInk">${w}</span></span>`;
          })
          .join(' ');
        tq.dataset.split = '1';
      }
      const qws = Array.from(tq.querySelectorAll<HTMLElement>('.qw'));
      quoteTick = () => {
        const r = tq.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        let p = (vh * 0.9 - r.top) / (vh * 0.5);
        p = Math.max(0, Math.min(1, p));
        const n = Math.round(p * qws.length);
        qws.forEach((w, i) => w.classList.toggle('lit', i < n));
      };
      quoteTick();
    })();

    /* ─────────────────────────────────────────────────────────────────────
       CTA — ignition -> burst -> idle glow
       ───────────────────────────────────────────────────────────────────── */
    let ctaTick: (() => void) | null = null;
    (() => {
      const cta = document.getElementById('contact');
      if (!cta) return;
      if (REDUCED) {
        cta.classList.add('lit', 'burst');
        return;
      }
      ctaTick = () => {
        const r = cta.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800) * 0.74) {
          cta.classList.add('lit');
          // Burst fires after the fill sweep completes (~1.3s).
          const t = window.setTimeout(() => cta.classList.add('burst'), 1250);
          onCleanup(() => clearTimeout(t));
          ctaTick = null;
        }
      };
      ctaTick();
    })();

    /* ─────────────────────────────────────────────────────────────────────
       Card tilt registry (thesis cards + portfolio tiles)
       ───────────────────────────────────────────────────────────────────── */
    type Tilt = { el: HTMLElement; rect: DOMRect; hov: boolean; max: number };
    const tilts: Tilt[] = [];
    if (FINE && !REDUCED) {
      const reg = (sel: string, max: number) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          const item: Tilt = { el, rect: el.getBoundingClientRect(), hov: false, max };
          const enter = () => {
            item.rect = el.getBoundingClientRect();
            item.hov = true;
            el.classList.add('tilt-on');
          };
          const leave = () => {
            item.hov = false;
            el.classList.remove('tilt-on');
            el.style.setProperty('--rx', '0deg');
            el.style.setProperty('--ry', '0deg');
            el.style.setProperty('--gx', '50%');
            el.style.setProperty('--gy', '50%');
          };
          el.addEventListener('mouseenter', enter);
          el.addEventListener('mouseleave', leave);
          onCleanup(() => {
            el.removeEventListener('mouseenter', enter);
            el.removeEventListener('mouseleave', leave);
          });
          tilts.push(item);
        });
      };
      reg('[data-tilt="card"]', 6);
      reg('[data-tilt="tile"]', 10);
    }

    /* ─────────────────────────────────────────────────────────────────────
       Magnetic elements (CTA email, nav-ish links flagged data-magnet)
       ───────────────────────────────────────────────────────────────────── */
    type Mag = { el: HTMLElement; rect: DOMRect; hov: boolean; str: number };
    const magnets: Mag[] = [];
    if (FINE && !REDUCED) {
      document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
        const str = parseFloat(el.dataset.magnet || '0.3');
        const m: Mag = { el, rect: el.getBoundingClientRect(), hov: false, str };
        const enter = () => {
          m.rect = el.getBoundingClientRect();
          m.hov = true;
        };
        const leave = () => {
          m.hov = false;
          el.style.setProperty('--mx', '0px');
          el.style.setProperty('--my', '0px');
        };
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
        onCleanup(() => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mouseleave', leave);
        });
        magnets.push(m);
      });
    }

    /* ─────────────────────────────────────────────────────────────────────
       Pointer tracking (one listener) — feeds spotlight, parallax, tilt
       ───────────────────────────────────────────────────────────────────── */
    const hero = document.getElementById('heroSection');
    const spot = document.getElementById('heroSpot');
    const spot2 = document.getElementById('heroSpot2');
    let heroRect = hero?.getBoundingClientRect() ?? null;

    const onMove = (e: MouseEvent) => {
      ptr.px = e.clientX;
      ptr.py = e.clientY;
      ptr.nx = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.ny = (e.clientY / window.innerHeight) * 2 - 1;
      ptr.active = true;
      if (hero && heroRect) {
        if (
          e.clientY >= heroRect.top &&
          e.clientY <= heroRect.bottom
        ) {
          hero.classList.add('spot-on');
        }
      }
    };
    const onLeaveDoc = () => {
      ptr.active = false;
      hero?.classList.remove('spot-on');
    };
    if (FINE && !REDUCED) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget) onLeaveDoc();
      });
      onCleanup(() => window.removeEventListener('mousemove', onMove));
    }

    /* ─────────────────────────────────────────────────────────────────────
       Scroll / resize — cache rects, drive scroll-bound effects + velocity
       ───────────────────────────────────────────────────────────────────── */
    const onScroll = () => {
      const y = window.scrollY;
      quoteTick?.();
      ctaTick?.();
      heroRect = hero?.getBoundingClientRect() ?? null;
      // Hero content parallax-out as you scroll past it.
      if (hero) {
        const p = Math.min(1, Math.max(0, y / (window.innerHeight * 0.9)));
        hero.style.setProperty('--scrollP', p.toFixed(4));
      }
    };
    const onResize = () => {
      heroRect = hero?.getBoundingClientRect() ?? null;
      tilts.forEach((t) => (t.rect = t.el.getBoundingClientRect()));
      magnets.forEach((m) => (m.rect = m.el.getBoundingClientRect()));
      quoteTick?.();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onCleanup(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    });

    /* ─────────────────────────────────────────────────────────────────────
       Master rAF loop — eases all continuous motion toward targets
       ───────────────────────────────────────────────────────────────────── */
    let raf = 0;
    // smoothed pointer
    const s = { nx: 0, ny: 0, sx: 0, sy: 0 };
    const loop = () => {
      // Ease smoothed pointer
      s.nx += (ptr.nx - s.nx) * 0.07;
      s.ny += (ptr.ny - s.ny) * 0.07;
      s.sx += (ptr.px - s.sx) * 0.12;
      s.sy += (ptr.py - s.sy) * 0.12;

      // Spotlights (two layers, slightly different lag for depth)
      if (spot) spot.style.transform = `translate(${s.sx - 320}px,${s.sy - 320}px)`;
      if (spot2) spot2.style.transform = `translate(${ptr.px - 160}px,${ptr.py - 160}px)`;

      // Hero depth parallax (mark + aurora react to pointer)
      if (hero) {
        hero.style.setProperty('--px', s.nx.toFixed(4));
        hero.style.setProperty('--py', s.ny.toFixed(4));
      }

      // Card tilt
      for (const t of tilts) {
        if (!t.hov) continue;
        const cx = t.rect.left + t.rect.width / 2;
        const cy = t.rect.top + t.rect.height / 2;
        const dx = (ptr.px - cx) / (t.rect.width / 2);
        const dy = (ptr.py - cy) / (t.rect.height / 2);
        t.el.style.setProperty('--ry', `${(dx * t.max).toFixed(2)}deg`);
        t.el.style.setProperty('--rx', `${(-dy * t.max).toFixed(2)}deg`);
        t.el.style.setProperty('--gx', `${(((ptr.px - t.rect.left) / t.rect.width) * 100).toFixed(1)}%`);
        t.el.style.setProperty('--gy', `${(((ptr.py - t.rect.top) / t.rect.height) * 100).toFixed(1)}%`);
      }

      // Magnets
      for (const m of magnets) {
        if (!m.hov) continue;
        const cx = m.rect.left + m.rect.width / 2;
        const cy = m.rect.top + m.rect.height / 2;
        m.el.style.setProperty('--mx', `${((ptr.px - cx) * m.str).toFixed(1)}px`);
        m.el.style.setProperty('--my', `${((ptr.py - cy) * m.str).toFixed(1)}px`);
      }

      raf = requestAnimationFrame(loop);
    };
    if (!REDUCED) raf = requestAnimationFrame(loop);
    onCleanup(() => cancelAnimationFrame(raf));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
