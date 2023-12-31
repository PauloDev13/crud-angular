import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { loadCourses } from '../../../store/course.action';
import { CoursesListModel } from '../../../store/course.model';
import { selectCourse } from '../../../store/course.selector';
import { AppStateModel } from '../../../store/global/app-state.model';
import { Course } from '../../model/course';
import { CategoryPipe } from '../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    CategoryPipe,
    MatProgressSpinnerModule,
  ],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  totalElements = 0;
  pageIndex = 0;
  pageSize = 10;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>(true);
  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>(true);

  readonly displayedColumns = ['name', 'category', 'actions'];
  private store: Store<AppStateModel> = inject(Store);

  ngOnInit(): void {
    this.refresh();
  }

  refresh(
    pageEvent: PageEvent = {
      length: this.totalElements,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.store.dispatch(
      loadCourses({ page: pageEvent.pageIndex, size: pageEvent.pageSize }),
    );

    const courseList$ = this.store.select(selectCourse);

    courseList$.subscribe({
      next: (data: CoursesListModel) => {
        this.courses = data.courses;
        this.totalElements = data.totalElements as number;
      },
    });
  }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(course: Course): void {
    this.edit.emit(course);
  }

  onDelete(course: Course): void {
    this.delete.emit(course);
  }
}
