import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { removeCourse } from '../../../store/course.action';
import { AppStateModel } from '../../../store/global/app-state.model';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    CoursesListComponent,
    MatProgressSpinnerModule,
  ],
})
export class CoursesComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppStateModel>,
  ) {}

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(course: Course) {
    const props = {
      id: course._id,
    };

    const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
      this.dialog.open(ConfirmationDialogComponent, {
        data: `Confirma a exclusão do curso ${course.name.toUpperCase()}?`,
      });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean): void => {
        if (result) {
          this.store.dispatch(removeCourse(props));
        }
      },
    });
  }
}
