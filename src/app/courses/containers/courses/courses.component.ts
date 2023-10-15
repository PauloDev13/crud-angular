import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { loadCourses, removeCourse } from '../../../store/course.action';
import { CoursesListModel } from '../../../store/course.model';
import { selectCourse } from '../../../store/course.selector';
import { AppStateModel } from '../../../store/global/app-state.model';
import { Course } from '../../model/course';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<CoursesListModel> | null = null;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<AppStateModel>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.courses$ = this.store.select(selectCourse).pipe(
      catchError(() => {
        this.onError('Erro ao carregar curso.');
        return of({ courses: [] });
      }),
    );
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(course: Course): void {
    const props = {
      id: course._id,
    };

    const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
      this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza que deseja remover este curso?',
      });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean): void => {
        if (result) {
          this.store.dispatch(removeCourse(props));
          this.onSuccess();
        }
      },
      error: () => this.onError('Erro ao remover curso!'),
    });
  }

  private onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  private onSuccess(): void {
    this.snackBar.open('Curso excluido com sucesso!', 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
