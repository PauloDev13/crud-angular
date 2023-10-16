import { CourseCreateModel } from '../../store/course.model';
import { Course } from '../model/course';

export type createCourseType = CourseCreateModel | { message: string };
export type removeCourseType = { id: string } | { message: string };
export type getCourseType = { courses: Course[] } | { message: string };
