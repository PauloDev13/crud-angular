import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, Observable, of, switchMap } from 'rxjs';

import { Course } from '../courses/model/course';
import { CoursesService } from '../courses/services/courses.service';
import {
  createCourse,
  createCourseSuccess,
  loadCourses,
  loadCourseSuccess,
  removeCourse,
  removeCourseSuccess,
} from './course.action';
import { CourseCreateModel, CoursesListModel } from './course.model';

@Injectable()
export class CourseEffect {
  readonly actions$ = inject(Actions);
  readonly courseService = inject(CoursesService);

  createCourse: Observable<CourseCreateModel> = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCourse),
      switchMap((action: CourseCreateModel) =>
        this.courseService
          .save(action.inputCourse)
          .pipe(
            switchMap((data: Course) =>
              of(createCourseSuccess({ inputCourse: data })),
            ),
          ),
      ),
    );
  });

  removeCourse: Observable<{ id: string }> = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeCourse),
      switchMap((action: { id: string }) =>
        this.courseService
          .remove(action.id)
          .pipe(switchMap(() => of(removeCourseSuccess({ id: action.id })))),
      ),
    );
  });

  getCourses: Observable<CoursesListModel> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCourses),
      exhaustMap(() => {
        return this.courseService.list().pipe(
          map((data: CoursesListModel) => {
            return loadCourseSuccess(data);
          }),
        );
      }),
    );
  });
}
