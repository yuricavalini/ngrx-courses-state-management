import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Course } from '../../../../shared/models/course';
import { Lesson } from '../../../../shared/models/lesson';

@Injectable({ providedIn: 'root' })
export class CoursesHttpService {
  readonly API_URL_COURSES = 'api/courses';
  readonly API_URL_LESSONS = 'api/lessons';

  constructor(private http: HttpClient) {}

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get<{ payload: Course[] }>(this.API_URL_COURSES)
      .pipe(map(res => res.payload));
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL_COURSES}/${courseUrl}`);
  }

  findLessons(
    courseId: number,
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.API_URL_LESSONS, {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('sortOrder', 'asc')
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  findCourseAndLessonsByUrl(
    courseUrl: string
  ): Observable<{ course: Course; lessons: Lesson[] }> {
    return this.findCourseByUrl(courseUrl).pipe(
      switchMap(course =>
        this.findLessons(course.id).pipe(map(lessons => ({ course, lessons })))
      )
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.API_URL_COURSES, course);
  }

  updateCourse(
    courseId: string | number,
    changes: Partial<Course>
  ): Observable<Course> {
    return this.http.put<Course>(
      `${this.API_URL_COURSES}/${courseId}`,
      changes
    );
  }

  deleteCourse(courseId: string | number): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(
      `${this.API_URL_COURSES}/${String(courseId)}`
    );
  }
}
