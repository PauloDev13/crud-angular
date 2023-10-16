import { createAction, props } from '@ngrx/store';

export const SHOW_ALERT = '[app] show alert';
export const EMPTY_ACTION = '[app] empty action';
export const SHOW_ERROR_DIALOG = '[app] show error dialog';

export const showAlert = createAction(SHOW_ALERT, props<{ message: string }>());
export const emptyAction = createAction(EMPTY_ACTION);
export const showErrorDialog = createAction(
  SHOW_ERROR_DIALOG,
  props<{ message: string }>(),
);
