import { Course } from '../courses/model/course';

export interface CoursesListModel {
  courses: Course[];
  errorMessage?: string;
}

export interface CourseCreateModel {
  inputCourse: Course;
}
