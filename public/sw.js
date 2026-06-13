// Alien's Aileen — Service Worker
// Handles: app shell caching, audio file caching, offline fallback

const CACHE_VERSION = "v1";
const SHELL_CACHE = `aileen-shell-${CACHE_VERSION}`;
const AUDIO_CACHE = `aileen-audio-${CACHE_VERSION}`;

// Core routes/assets to pre-cache for offline shell
const SHELL_ASSETS = [
  "/",
  "/manifest.json",
  "/offline",
];

// ── INSTALL: pre-cache app shell ─────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => {
      return cache.addAll(SHELL_ASSETS).catch(() => {
        // Don't fail install if one asset is missing (e.g. /offline not built yet)
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: clean up old cache versions ────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== AUDIO_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: routing strategy ──────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Strategy 1: Audio files — cache-first, long-lived
  // Audio content doesn't change once recorded, so cache aggressively
  if (url.pathname.startsWith("/audio/") && url.pathname.endsWith(".m4a")) {
    event.respondWith(cacheFirst(request, AUDIO_CACHE));
    return;
  }

  // Strategy 2: Next.js static assets (_next/static) — cache-first
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  // Strategy 3: Navigation requests (pages) — network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // Strategy 4: Everything else — network-first, fall back to cache
  event.respondWith(networkFirst(request, SHELL_CACHE));
});

// ── STRATEGIES ────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // No cache, no network — return a basic error response
    return new Response("Offline — content not cached", {
      status: 503,
      statusText: "Offline",
    });
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response("Offline — content not cached", {
      status: 503,
      statusText: "Offline",
    });
  }
}

async function networkFirstWithOfflineFallback(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;

    const offlinePage = await cache.match("/offline");
    if (offlinePage) return offlinePage;

    return new Response(
      "<h1>You're offline</h1><p>This page hasn't been cached yet. Connect to the internet and try again.</p>",
      { status: 503, headers: { "Content-Type": "text/html" } }
    );
  }
}

// ── MESSAGE: allow app to trigger cache cleanup ──────────────────
self.addEventListener("message", (event) => {
  if (event.data?.type === "CLEAR_AUDIO_CACHE") {
    caches.delete(AUDIO_CACHE);
  }
});
