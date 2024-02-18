import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { Auth } from '../models/auth';
import { Store } from '@ngrx/store';
import { AuthLogic } from '../store/auth.logic';
import { logout } from '../store/auth.actions';
import { UtilisateursService } from '../services/utilisateurs.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  auth$!: Observable<Auth>;

  constructor(
    private store: Store<{ auth: Auth }>,
    private utilisateursService: UtilisateursService,
    private router: Router
  ) {
    this.auth$ = this.store.select('auth');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth$.pipe(
      switchMap((auth) => {
        if (auth.isLoggedIn && auth.token) {
          try {
            const authLogic: AuthLogic = AuthLogic.getInstance();
            return from(
              authLogic.checkToken$(this.utilisateursService, auth, this.store)
            ).pipe(
              map(() => {
                return true;
              })
            );
          } catch (e) {
            this.store.dispatch(logout());
            return of(this.router.parseUrl('/'));
          }
        }
        return of(this.router.parseUrl('/'));
      })
    );
  }
}
