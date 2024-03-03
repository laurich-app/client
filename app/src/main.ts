import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';

async function enableMocking() {
  if (!isDevMode()) {
    return;
  }

  const { worker } = await import('./mocks/browser');
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
