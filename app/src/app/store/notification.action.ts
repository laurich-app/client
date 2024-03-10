import { createAction, props } from '@ngrx/store';

export enum NotificationActionTypes {
  NOTIFICATION_CONDITION = 'NOTIFICATION CONDITION',
}

export const NOTIFICATION_CONDITION = createAction(
  NotificationActionTypes.NOTIFICATION_CONDITION,
  props<{ message: string }>()
);

export type NotificationAction = typeof NOTIFICATION_CONDITION;
