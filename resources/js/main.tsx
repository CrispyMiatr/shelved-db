import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import './bootstrap';
import '../css/app.scss';
import '../css/main.scss';

const appName = import.meta.env.VITE_APP_NAME || 'Shelved.';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    if (import.meta.env.SSR) {
      hydrateRoot(
        el,
        <StrictMode>
          <App {...props} />
        </StrictMode>
      );
      return;
    }

    const root = createRoot(el);
    root.render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  },
  progress: {
    color: '#f1c525',
  },
});