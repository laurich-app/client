import { createAction, props } from '@ngrx/store';
import { Tokens } from '../models/auth';

export enum TokenActionTypes {
  CHECK_TOKEN_CONDITION = '[Some] Check Some Condition',
  GET_TOKEN_CONDITION_SUCCESS = '[Login] PutToken',
  GET_TOKEN_CONDITION_FAILURE = '[Logout] RemoveToken',
}

export const login = createAction(
  TokenActionTypes.GET_TOKEN_CONDITION_SUCCESS,
  props<{ token: Tokens }>()
);
export const logout = createAction(
  TokenActionTypes.GET_TOKEN_CONDITION_FAILURE
);

export const checkTokenCondition = createAction(
  TokenActionTypes.CHECK_TOKEN_CONDITION
);

export type TokenAction =
  | typeof login
  | typeof logout
  | typeof checkTokenCondition;
