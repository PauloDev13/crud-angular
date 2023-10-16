import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, Observable, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from '../courses/model/course';
import { CoursesService } from '../courses/services/courses.service';
import {
  createCourseType,
  getCourseType,
  removeCourseType,
} from '../courses/types/effect.type';
import {
  createCourse,
  createCourseSuccess,
  loadCourses,
  loadCourseSuccess,
  removeCourse,
  removeCourseSuccess,
  updateCourse,
  updateCourseSuccess,
} from './course.action';
import { CourseCreateModel, CoursesListModel } from './course.model';
import { showAlert, showErrorDialog } from './global/app.action';

@Injectable()
export class CourseEffect {
  readonly actions$ = inject(Actions);
  readonly courseService = inject(CoursesService);

  createCourse: Observable<createCourseType> = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCourse),
      switchMap((action: CourseCreateModel) =>
        this.courseService.createCourse(action.inputCourse).pipe(
          switchMap((data: Course) =>
            of(
              createCourseSuccess({ inputCourse: data }),
              showAlert({
                message: 'Curso adicionado com sucesso',
                resultType: 'pass',
              }),
            ),
          ),
        ),
      ),
      catchError(() =>
        of(
          showAlert({
            message: 'Falha ao adicionar Curso',
            resultType: 'fail',
          }),
        ),
      ),
    );
  });

  updateCourse: Observable<createCourseType> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCourse),
      switchMap((action: CourseCreateModel) =>
        this.courseService.updateCourse(action.inputCourse).pipe(
          switchMap((data: Course) =>
            of(
              updateCourseSuccess({ inputCourse: data }),
              showAlert({
                message: 'Curso atualizado com sucesso',
                resultType: 'pass',
              }),
            ),
          ),
        ),
      ),
      catchError(() =>
        of(
          showAlert({
            message: 'Falha ao atualizar Curso',
            resultType: 'fail',
          }),
        ),
      ),
    );
  });

  removeCourse: Observable<removeCourseType> = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeCourse),
      switchMap((action: { id: string }) =>
        this.courseService.remove(action.id).pipe(
          switchMap(() =>
            of(
              removeCourseSuccess({ id: action.id }),
              showAlert({
                message: 'Curso removido com sucesso',
                resultType: 'pass',
              }),
            ),
          ),
        ),
      ),
      catchError(() =>
        of(
          showAlert({
            message: 'Falha ao adicionar Curso',
            resultType: 'fail',
          }),
        ),
      ),
    );
  });

  getCourses: Observable<getCourseType> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCourses),
      exhaustMap(() =>
        this.courseService
          .list()
          .pipe(map((data: CoursesListModel) => loadCourseSuccess(data))),
      ),
      catchError(() => {
        return of(
          showErrorDialog({
            message: 'Erro ao carregar Cursos. Tente novamente.',
          }),
        );
      }),
    );
  });
}
