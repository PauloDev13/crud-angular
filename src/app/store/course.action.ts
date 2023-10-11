// Declaration constants for actions load
import { createAction, props } from '@ngrx/store';

import { Course } from '../courses/model/course';

export const LOAD_COURSES = '[course page] load courses';
export const LOAD_COURSE_SUCCESS = '[course page] load courses success';
export const LOAD_COURSE_ERROR = '[course page] load courses error';

export const loadCourses = createAction(LOAD_COURSES);
export const loadCourseSuccess = createAction(
  LOAD_COURSE_SUCCESS,
  props<{ coursesList: Course[] }>(),
);
export const loadCourseError = createAction(
  LOAD_COURSE_ERROR,
  props<{ coursesList: Course[] }>(),
);
