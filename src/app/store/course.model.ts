import { Course } from '../courses/model/course';

export interface CoursesListModel {
  courses: Course[];
  totalElements?: number;
  totalPages?: number;
  errorMessage?: string;
}

export interface CourseCreateModel {
  inputCourse: Course;
}
