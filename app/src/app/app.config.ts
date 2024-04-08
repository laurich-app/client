import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './store/auth.reducers';
import { AuthEffects } from './store/auth.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpInterceptorProviders } from './interceptors/http-auth.interceptor';
import { panierReducer } from './store/panier.reducers';
import { PanierEffects } from './store/panier.effects';
import { notificationReducer } from './store/notification.reducers';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideStore({
        auth: authReducer,
        panier: panierReducer,
        notification: notificationReducer,
    }),
    provideEffects([AuthEffects, PanierEffects]),
    provideAnimationsAsync(),
    provideNoopAnimations()
],
};
