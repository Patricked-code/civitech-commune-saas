"use client";

import { useEffect } from 'react';
import { siteConfig } from '../lib/site';

function normalizeOrigin(origin: string) {
  return origin.replace(/\/$/, '');
}

export function CanonicalHostRedirect() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canonical = normalizeOrigin(siteConfig.appUrl);
    const current = normalizeOrigin(window.location.origin);
    if (!canonical || current === canonical) return;

    try {
      const canonicalUrl = new URL(canonical);
      if (window.location.hostname !== canonicalUrl.hostname) {
        window.location.replace(canonical + window.location.pathname + window.location.search + window.location.hash);
      }
    } catch (error) {
      // Invalid canonical URL should not break rendering.
    }
  }, []);

  return null;
}
