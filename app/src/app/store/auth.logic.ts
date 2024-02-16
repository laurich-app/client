import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';
import { Auth, Tokens } from '../models/auth';
import { UtilisateursService } from '../services/utilisateurs.service';
import { login } from './auth.actions';
import { expireToken } from '../utils/functions';

export class AuthLogic {
  private static instance: AuthLogic;
  private _isLoading: boolean = false;
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(value: boolean) {
    this._isLoading = value;
  }
  private tokens: Tokens = { accessToken: '', refreshToken: '' };

  private constructor() {}

  public static getInstance(): AuthLogic {
    if (!AuthLogic.instance) AuthLogic.instance = new AuthLogic();
    return AuthLogic.instance;
  }

  public async checkToken$(
    authService: UtilisateursService,
    auth: Auth,
    store: Store
  ): Promise<Tokens> {
    if (!auth || !auth.isLoggedIn) {
      throw new Error('Pas de token');
    }
    // Si le token n'est pas expiré
    if (!expireToken(auth.token.accessToken)) {
      return auth.token;
    }
    // Si le refresh token est aussi invalide
    if (expireToken(auth.token.refreshToken)) {
      throw new Error('Token expiré');
    }

    if (this.isLoading) {
      while (this.isLoading) {
        console.log('this.isloading', this.isLoading);
        setTimeout(() => {}, 250);
      }
      return this.tokens;
    } else {
      console.log('start request');
      this.isLoading = true;
      try {
        const tokens = await lastValueFrom(
          authService.refreshToken({
            accessToken: auth.token.accessToken,
            refreshToken: auth.token.refreshToken,
          })
        );
        this.isLoading = false;
        this.tokens = tokens;
        store.dispatch(login({ token: tokens }));
        return tokens;
      } catch (e) {
        this.isLoading = false;
        throw e;
      }
    }
  }
}
