import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

export const CourseResolver: ResolveFn<Course> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  service: CoursesService = inject(CoursesService),
): Observable<Course> => {
  if (route.params) {
    if (route.params['id']) {
      return service.loadById(route.params['id']).pipe(take(1));
    }
  }
  return of({ _id: '', name: '', category: '', lessons: [] });
};
