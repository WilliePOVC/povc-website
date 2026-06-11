'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Initialize IntersectionObserver-based reveal animations.
// Gated on prefers-reduced-motion. Content is always visible (not opacity:0) for SEO/print.
//
// Keyed on pathname so it re-runs on client-side route changes. Without this,
// the observer only attaches on the very first load, so navigating to another
// page (Portfolio, Team, Press, etc.) mounts `.reveal` elements at opacity:0
// with nothing to reveal them, producing a blank screen until a hard refresh.
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'));

      // If reduced motion is preferred, just show everything immediately.
      if (prefersReduced || !('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('in'));
        return undefined;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
      );

      // Reveal anything already in view on mount (e.g. above-the-fold hero),
      // and observe the rest.
      els.forEach((el) => observer.observe(el));

      return observer;
    };

    // Run after the new route's DOM has painted so freshly-mounted
    // `.reveal` elements are present in the document.
    let observer: IntersectionObserver | undefined;
    const raf = requestAnimationFrame(() => {
      observer = reveal();
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
