import { createReducer, on } from '@ngrx/store';

import { Course } from '../courses/model/course';
import { loadCourseSuccess } from './course.action';
import { CoursesListModel } from './course.model';
import { courseState } from './course.state';

export const courseReducer = createReducer(
  courseState,
  on(
    loadCourseSuccess,
    (
      state: CoursesListModel,
      action: { coursesList: Course[] },
    ): CoursesListModel => {
      return {
        ...state,
        courseList: [...action.coursesList],
      };
    },
  ),
);
