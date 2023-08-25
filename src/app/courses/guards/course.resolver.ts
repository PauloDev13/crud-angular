import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

export const CourseResolver: ResolveFn<Course> = (
  route,
  state,
  service: CoursesService = inject(CoursesService),
): Observable<Course> => {
  if (route.params && route.params['id']) {
    return service.loadById(route.params['id']).pipe(take(1));
  }
  return of({ _id: '', name: '', category: '', lessons: [] });
};

// @Injectable({
//   providedIn: 'root',
// })
// export class CourseResolver implements Resolve<Course> {
//   constructor(private service: CoursesService) {}
//
//   resolve(route: ActivatedRouteSnapshot): Observable<Course> {
//     const id = route.paramMap.get('id');
//
//     if (route.params && route.params['id']) {
//       this.service.loadById(route.params['id']).pipe(take(1));
//     }
//     return of({ _id: '', name: '', category: '' });
//   }
// }
