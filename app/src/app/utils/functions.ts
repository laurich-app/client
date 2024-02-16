import * as jose from 'jose';
import dayjs from 'dayjs';

/**
 * Verify si le token n'est pas expiré
 * @param token
 * @returns vrai si expirer, faux sinon
 */
export const expireToken = (token: string): boolean => {
  const payloadAccess: jose.JWTPayload = jose.decodeJwt(token);
  if (!payloadAccess.exp) return true;

  const dateAccess = dayjs.unix(payloadAccess.exp);
  if (dateAccess.isBefore(dayjs()) || dateAccess.isSame(dayjs())) return true;

  return false;
};
