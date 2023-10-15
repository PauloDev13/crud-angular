import { Course } from '../courses/model/course';

export interface CoursesListModel {
  courses: Course[];
}

export interface CourseCreateModel {
  inputCourse: Course;
}
