// middleware.js
export default async function middleware(request) {
  const url = new URL(request.url);

  // Перехоплюємо запити, що йдуть на /ingest
  if (url.pathname.startsWith('/ingest')) {
    const hostname = 'eu.i.posthog.com'; // Твій хост із налаштувань PostHog

    // Формуємо нову адресу для PostHog
    const newPath = url.pathname.replace(/^\/ingest/, '');
    const targetUrl = new URL(newPath + url.search, `https://${hostname}`);

    // Копіюємо заголовки запиту
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('host', hostname);

    // Проксіюємо запит
    return fetch(targetUrl, {
      method: request.method,
      headers: requestHeaders,
      body: request.body,
    });
  }
}

// Налаштовуємо, які саме шляхи має обробляти цей middleware
export const config = {
  matcher: '/ingest/:path*',
};
