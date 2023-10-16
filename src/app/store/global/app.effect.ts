import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { ErrorDialogComponent } from '../../courses/shared/components/error-dialog/error-dialog.component';
import { emptyAction, showAlert, showErrorDialog } from './app.action';

export class AppEffect {
  readonly snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  readonly actions$ = inject(Actions);
  readonly store = inject(Store);

  showAlert = createEffect(() => {
    return this.actions$.pipe(
      ofType(showAlert),
      switchMap((action: { message: string }) =>
        this.showSnackBarAlert(action.message)
          .afterDismissed()
          .pipe(map(() => emptyAction())),
      ),
    );
  });

  showErrorDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(showErrorDialog),
      switchMap((action: { message: string }) =>
        this.showErrorDialogAlert(action.message)
          .afterClosed()
          .pipe(map(() => emptyAction())),
      ),
    );
  });

  private showSnackBarAlert(message: string) {
    return this.snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }

  private showErrorDialogAlert(message: string) {
    return this.dialog.open(ErrorDialogComponent, {
      data: message,
    });
  }
}
