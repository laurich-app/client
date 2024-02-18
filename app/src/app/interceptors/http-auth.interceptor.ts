import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import {
  catchError,
  exhaustMap,
  from,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { Auth, Tokens } from '../models/auth';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth.actions';
import { Router } from '@angular/router';
import { AuthLogic } from '../store/auth.logic';
import { UtilisateursService } from '../services/utilisateurs.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<{ auth: Auth }>,
    private utilisateursService: UtilisateursService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap((auth) => {
        if (!auth.isLoggedIn || !auth.token) {
          return next.handle(req);
        }
        const authLogic: AuthLogic = AuthLogic.getInstance();
        return from(
          authLogic.checkToken$(this.utilisateursService, auth, this.store)
        ).pipe(
          switchMap((token: Tokens) => {
            const authReq = req.clone({
              headers: req.headers.set(
                'Authorization',
                'Bearer ' + token.accessToken
              ),
            });

            return next.handle(authReq);
          })
        );
      }),
      catchError((err) => {
        if (err.status == 401) {
          // Déconnecte l'utilisateur automatiquement si le token ne passe pas.
          this.store.dispatch(logout());
          this.router.navigateByUrl('/');
          return throwError(() => new Error('Vous avez été déconnecté'));
        }
        return throwError(() => err);
      })
    );
  }
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
];
