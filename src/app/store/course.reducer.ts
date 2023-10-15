import { Action, createReducer, on } from '@ngrx/store';

import { Course } from '../courses/model/course';
import {
  createCourseSuccess,
  loadCourses,
  loadCourseSuccess,
  removeCourseSuccess,
} from './course.action';
import { CourseCreateModel, CoursesListModel } from './course.model';
import { courseState } from './course.state';

const _courseReducer = createReducer(
  courseState,
  on(loadCourses, (state: CoursesListModel): CoursesListModel => {
    return { ...state };
  }),

  on(
    loadCourseSuccess,
    (state: CoursesListModel, action: CoursesListModel): CoursesListModel => {
      return {
        ...state,
        courses: [...action.courses],
      };
    },
  ),

  on(
    createCourseSuccess,
    (state: CoursesListModel, action: CourseCreateModel): CoursesListModel => {
      const courseIsExist = !!state.courses.find(
        (data: Course) => data._id === action.inputCourse._id,
      );

      if (courseIsExist) {
        const newListCourse: Course[] = state.courses.map((data: Course) => {
          return data._id === action.inputCourse._id
            ? action.inputCourse
            : data;
        });
        return {
          ...state,
          courses: newListCourse,
        };
      } else {
        return {
          ...state,
          courses: [...state.courses, action.inputCourse],
        };
      }
    },
  ),

  on(
    removeCourseSuccess,
    (state: CoursesListModel, action: { id: string }): CoursesListModel => {
      const newListCourse: Course[] = state.courses.filter(
        (obj: Course) => obj._id !== action.id,
      );

      return {
        ...state,
        courses: newListCourse,
      };
    },
  ),
);

export function courseReducer(
  state: CoursesListModel | undefined,
  action: Action,
): CoursesListModel {
  return _courseReducer(state, action);
}
