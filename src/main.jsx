import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import './index.css';
import App from './App.jsx';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://13ec5481d6f1be217ddccbc4ea7e19b6@o4511347337461760.ingest.de.sentry.io/4511347513163856',

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  tracesSampleRate: 1.0,

  replaysSessionSampleRate: 0.1, // 10% звичайних сесій
  replaysOnErrorSampleRate: 1.0,

  environment: import.meta.env.VITE_APP_STATUS,
});

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: window.location.origin + '/ingest',
  person_profiles: 'identified_only',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
