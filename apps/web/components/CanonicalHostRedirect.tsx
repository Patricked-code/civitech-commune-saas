"use client";

import { useEffect } from 'react';
import { siteConfig } from '../lib/site';

function normalizeOrigin(origin: string) {
  return origin.replace(/\/$/, '');
}

function isLocalHost(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

export function CanonicalHostRedirect() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isLocalHost(window.location.hostname)) return;

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
