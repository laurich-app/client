import { createReducer, on } from '@ngrx/store';
import { Auth, Tokens, isUtilisateursJWTPayload } from '../models/auth';
import { login, logout } from './auth.actions';
import * as jose from 'jose';
import { Role } from '../enums/roles';

const storage = localStorage.getItem('app');
let previousState: Auth = {
  isLoggedIn: false,
  token: { accessToken: '', refreshToken: '' },
  roles: [],
};
if (storage) {
  previousState = JSON.parse(storage);
}

export const initialState: Auth = previousState;

export const authReducer = createReducer(
  initialState,
  on(login, (state: Auth, action: { token: Tokens }) => {
    console.log(action);
    const decodedToken = jose.decodeJwt(action.token.accessToken);
    if (!isUtilisateursJWTPayload(decodedToken)) {
      throw new Error('Problème dans le JWT');
    }
    // Convertir le tableau de string en tableau d'enum
    const rolesEnum: Role[] = decodedToken.roles.map(
      (role) => Role[role as unknown as keyof typeof Role]
    );
    const newState: Auth = {
      isLoggedIn: true,
      token: action.token,
      roles: rolesEnum,
    };
    console.log(newState);
    localStorage.setItem('app', JSON.stringify(newState));

    // Si jamais une erreur survient
    return newState || state;
  }),
  on(logout, () => {
    localStorage.removeItem('app');
    console.log('logout');
    return {
      isLoggedIn: false,
      token: { accessToken: '', refreshToken: '' },
      roles: [],
    };
  })
);
