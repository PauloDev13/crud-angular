import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { CoursesListModel } from '../../store/course.model';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API: string = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<CoursesListModel> {
    const page = '0';
    const size = '10';
    return this.httpClient
      .get<CoursesListModel>(`${this.API}?page=${page}&size=${size}`)
      .pipe(first());
  }

  loadById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>): Observable<Course> {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: string): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.API}/${id}`).pipe(first());
  }

  createCourse(record: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  updateCourse(record: Partial<Course>): Observable<Course> {
    return this.httpClient
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  private create(record: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>): Observable<Course> {
    return this.httpClient
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }
}
