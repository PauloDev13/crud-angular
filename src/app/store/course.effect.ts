import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, map} from 'rxjs';
import {CoursesService} from '../courses/services/courses.service';
import {loadCourses, loadCourseSuccess} from './course.action';

@Injectable()
export class CourseEffect {
  readonly actions$ = inject(Actions);
  private readonly courseService = inject(CoursesService);

  getCourse = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCourses),
      exhaustMap(() => {
        return this.courseService.list().pipe(
          map((data) => {
            return loadCourseSuccess(data);
          }),
        );
      }),
    );
  });
}
