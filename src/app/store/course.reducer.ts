import { Action, createReducer, on } from '@ngrx/store';

import { Course } from '../courses/model/course';
import {
  createCourseSuccess,
  loadCourseError,
  loadCourseSuccess,
  removeCourseSuccess,
  updateCourseSuccess,
} from './course.action';
import { CourseCreateModel, CoursesListModel } from './course.model';
import { courseState } from './course.state';

const _courseReducer = createReducer(
  courseState,
  // GET COURSES
  on(
    loadCourseSuccess,
    (state: CoursesListModel, action: CoursesListModel): CoursesListModel => {
      return {
        ...state,
        courses: [...action.courses],
        totalElements: action.totalElements,
        totalPages: action.totalPages,
        errorMessage: '',
      };
    },
  ),
  // CREATE COURSE
  on(
    createCourseSuccess,
    (state: CoursesListModel, action: CourseCreateModel): CoursesListModel => {
      return {
        ...state,
        courses: [...state.courses, action.inputCourse],
        errorMessage: '',
      };
    },
  ),
  // UPDATE COURSE
  on(
    updateCourseSuccess,
    (state: CoursesListModel, action: CourseCreateModel): CoursesListModel => {
      const newListCourse: Course[] = state.courses.map((data: Course) => {
        return data._id === action.inputCourse._id ? action.inputCourse : data;
      });
      return {
        ...state,
        courses: newListCourse,
        errorMessage: '',
      };
    },
  ),
  // REMOVE COURSE
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
  // FAIL GET COURSES
  on(
    loadCourseError,
    (
      state: CoursesListModel,
      action: { errorMessage: string },
    ): CoursesListModel => {
      return {
        ...state,
        courses: [],
        errorMessage: action.errorMessage,
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
