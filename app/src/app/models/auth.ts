import * as jose from 'jose';
import { Role } from '../enums/roles';

export interface Auth {
  isLoggedIn: boolean;
  token: Tokens;
  roles: Role[];
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UtilisateursJWT extends jose.JWTPayload {
  sub: string;
  roles: Role[];
}

export const isUtilisateursJWTPayload = (
  jwt: jose.JWTPayload
): jwt is UtilisateursJWT => {
  return 'sub' in jwt && 'roles' in jwt;
};
