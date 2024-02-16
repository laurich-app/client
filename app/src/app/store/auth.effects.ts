import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { lastValueFrom, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  share,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { Auth, Tokens } from '../models/auth';
import { UtilisateursService } from '../services/utilisateurs.service';
import { TokenAction, login, logout, TokenActionTypes } from './auth.actions';
import { TokenRaffraichissementResponseDTO } from '../dtos/responses/utilisateurs/TokenRaffraichissimentResponseDTO';
import { expireToken } from '../utils/functions';

@Injectable()
export class AuthEffects {
  private isLoading: boolean = false;
  private state$: Observable<Auth>;

  constructor(
    private actions$: Actions<TokenAction>,
    private store: Store<{ auth: Auth }>,
    private authService: UtilisateursService,
    private router: Router
  ) {
    this.state$ = this.store.select('auth');
  }

  // waitForTokens$ = createEffect(() =>
  // 	this.actions$.pipe(
  // 		ofType(TokenActionTypes.GET_TOKEN_CONDITION_SUCCESS, TokenActionTypes.GET_TOKEN_CONDITION_FAILURE),
  // 		// Spécification du type de l'observable
  // 		map((action) => {
  // 			console.log("action : ", action)
  // 			return action;
  // 		}),
  // 		// Nous n'avons pas besoin de l'erreur ici
  // 		catchError((e) => {
  // 			console.log("abonnement error : ", e)
  // 			return of({ type: 'EMPTY_ACTION' })
  // 		})
  // 	))

  validToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TokenActionTypes.CHECK_TOKEN_CONDITION),
      switchMap(() => {
        return this.state$.pipe(
          take(1),
          concatMap((auth) => {
            if (!auth || !auth.isLoggedIn) {
              this.router.navigateByUrl('/');
              return of(logout());
            }
            // Si le token n'est pas expiré
            if (!expireToken(auth.token.accessToken)) {
              return of(login({ token: auth.token }));
            }
            // Si le refresh token est aussi invalide
            if (expireToken(auth.token.refreshToken)) {
              this.router.navigateByUrl('/');
              return of(logout());
            }

            if (this.isLoading) {
              console.log("je m'abonne");
              // Si la requête est déjà en cours, nous attendons la réponse
              // return this.waitForTokens$;
              return of();
            } else {
              console.log('je démarre la requête');
              this.isLoading = true;
              // Si la requête n'a pas encore commencé, nous la démarrons
              return this.authService
                .refreshToken({
                  accessToken: auth.token.accessToken,
                  refreshToken: auth.token.refreshToken,
                })
                .pipe(
                  map((response: TokenRaffraichissementResponseDTO) => {
                    console.log('refresh token :', response);
                    this.isLoading = false;
                    return login({ token: response });
                  }),
                  catchError((error) => {
                    console.log('refresh error :', error);
                    this.isLoading = false;
                    this.router.navigateByUrl('/');
                    return of(logout());
                  })
                );
            }
          }),
          catchError((er) => {
            console.log('error from switch 2', er);
            return of();
          })
        );
      }),
      catchError((er) => {
        console.log('error from switch 1', er);
        return of();
      })
    )
  );
}
