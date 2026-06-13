"use client";

import { useEffect } from "react";

/**
 * Registers the service worker for PWA offline support and audio caching.
 * Mount this once in app/layout.tsx, inside <body>.
 *
 * Fails gracefully: if service workers aren't supported (or registration
 * fails for any reason), the app continues to work as a normal website.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Only register in production — avoids caching issues during dev
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => {
        // Silent failure — app works fine without SW
        console.warn("Service worker registration failed:", err);
      });
  }, []);

  return null;
}
