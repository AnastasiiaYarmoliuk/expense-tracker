// middleware.js
export default async function middleware(request) {
  const url = new URL(request.url);

  // Перехоплення запитів, що йдуть на /ingest
  if (url.pathname.startsWith('/ingest')) {
    const hostname = 'eu.i.posthog.com'; // Твій хост із налаштувань PostHog

    // Формування нової адреси для PostHog
    const newPath = url.pathname.replace(/^\/ingest/, '');
    const targetUrl = new URL(newPath + url.search, `https://${hostname}`);

    // Копіювання заголовків запиту
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('host', hostname);

    // Проксіювання запиту
    return fetch(targetUrl, {
      method: request.method,
      headers: requestHeaders,
      body: request.body,
    });
  }
}

// Налаштування, які саме шляхи має обробляти цей middleware
export const config = {
  matcher: '/ingest/:path*',
};
