'use client';

import { useEffect } from 'react';

// Initialize IntersectionObserver-based reveal animations.
// Gated on prefers-reduced-motion. Content is always visible (not opacity:0) for SEO/print.
export default function RevealInit() {
  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'));

    if ('IntersectionObserver' in window) {
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

      els.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    } else {
      // Fallback: show all immediately
      els.forEach((el) => el.classList.add('in'));
    }
  }, []);

  return null;
}
