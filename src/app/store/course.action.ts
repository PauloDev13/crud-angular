// Declaration constants for actions load
import { createAction, props } from '@ngrx/store';

import { Course } from '../courses/model/course';

export const LOAD_COURSES = '[course page] load courses';
export const LOAD_COURSE_SUCCESS = '[course page] load courses success';
export const LOAD_COURSE_ERROR = '[course page] load courses fail';

export const CREATE_COURSE = '[course page] create course';
export const CREATE_COURSE_SUCCESS = '[course page] create course success';

export const REMOVE_COURSE = '[course page] remove course';
export const REMOVE_COURSE_SUCCESS = '[course page] remove course success';

export const loadCourses = createAction(LOAD_COURSES);
export const loadCourseSuccess = createAction(
  LOAD_COURSE_SUCCESS,
  props<{ courses: Course[] }>(),
);
export const loadCourseError = createAction(
  LOAD_COURSE_ERROR,
  props<{ courses: Course[] }>(),
);

export const createCourse = createAction(
  CREATE_COURSE,
  props<{ inputCourse: Course }>(),
);
export const createCourseSuccess = createAction(
  CREATE_COURSE_SUCCESS,
  props<{ inputCourse: Course }>(),
);

export const removeCourse = createAction(
  REMOVE_COURSE,
  props<{ id: string }>(),
);
export const removeCourseSuccess = createAction(
  REMOVE_COURSE_SUCCESS,
  props<{ id: string }>(),
);
