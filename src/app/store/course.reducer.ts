import {Action, createReducer, on} from '@ngrx/store';
import {loadCourseSuccess} from './course.action';
import {CoursesListModel} from './course.model';
import {courseState} from './course.state';

const _courseReducer = createReducer(
  courseState,
  on(
    loadCourseSuccess,
    (
      state: CoursesListModel,
      action: CoursesListModel,
    ) => {
      return {
        ...state,
        courses: [...action.courses]
      };
    },
  ),
);

export function courseReducer(state: CoursesListModel | undefined, action: Action) {
  return _courseReducer(state, action);
}
