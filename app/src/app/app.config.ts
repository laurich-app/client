import { ApplicationConfig, importProvidersFrom } from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideAnimationsAsync(),
  ],
};
