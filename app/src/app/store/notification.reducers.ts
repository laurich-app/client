import { createReducer, on } from '@ngrx/store';
import { NOTIFICATION_CONDITION } from './notification.action';

export interface Notification {
  message: string | null;
}
export const initialState: Notification = { message: null };

export const notificationReducer = createReducer(
  initialState,
  on(
    NOTIFICATION_CONDITION,
    (state: Notification, action: { message: string }) => {
      return { message: action.message } || state;
    }
  )
);
