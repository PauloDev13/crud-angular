import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoursesListModel } from './course.model';

const selectCourseState = createFeatureSelector<CoursesListModel>('courses');

export const selectCourse = createSelector(
  selectCourseState,
  (state: CoursesListModel) => {
    return state;
  },
);
