import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  tap,
} from 'rxjs/operators';

import { coursesApiActions, coursesPageActions } from './action-types';
import {
  selectCourseUrlFromRoute,
  selectIsLoadedCourse,
  selectIsLoadedCoursesList,
} from './courses.selectors';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private coursesHttpService: CoursesHttpService
  ) {}

  readonly loadCourseIfNotLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(coursesPageActions.openedCourse),
      concatLatestFrom(() => this.store.select(selectIsLoadedCourse)),
      filter(([, isLoadedCourse]) => !isLoadedCourse),
      concatLatestFrom(() => this.store.select(selectCourseUrlFromRoute)),
      filter(([, courseUrl]) => typeof courseUrl === 'string'),
      map(([, courseUrl]) => courseUrl),
      exhaustMap(courseUrl =>
        this.coursesHttpService.findCourseAndLessonsByUrl(String(courseUrl))
      ),
      map(({ course, lessons }) =>
        coursesApiActions.courseLoadedSuccess({
          selectedCourse: course,
          selectedCourseLessons: lessons,
        })
      ),
      catchError((error: { message: string }) =>
        of(
          coursesApiActions.courseLoadedFailure({
            errorMsgSelectedCourse: error.message,
          })
        )
      )
    );
  });

  readonly loadCoursesListIfNotLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(coursesPageActions.openedCoursesList),
      concatLatestFrom(() => this.store.select(selectIsLoadedCoursesList)),
      filter(([, isLoadedCoursesList]) => !isLoadedCoursesList),
      exhaustMap(() => this.coursesHttpService.findAllCourses()),
      map(courses => coursesApiActions.coursesListLoadedSuccess({ courses })),
      catchError((error: { message: string }) =>
        of(
          coursesApiActions.coursesListLoadedFailure({
            errorMsg: error.message,
          })
        )
      )
    );
  });

  readonly showCoursesListLoadedFailureAlert$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(coursesApiActions.coursesListLoadedFailure),
        tap(({ errorMsg }) => console.log('Failed to load courses!', errorMsg))
      );
    },
    { dispatch: false }
  );

  readonly createCourseRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(coursesPageActions.courseAdded),
      concatMap(action => this.coursesHttpService.createCourse(action.course)),
      map(course => coursesApiActions.courseAddedSuccess({ course })),
      catchError((error: { message: string }) =>
        of(
          coursesApiActions.courseAddedFailure({
            errorMsg: error.message,
          })
        )
      )
    );
  });

  readonly updateCourseRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(coursesPageActions.courseUpdated),
      concatMap(action =>
        this.coursesHttpService.updateCourse(
          action.update.id,
          action.update.changes
        )
      ),
      map(course => coursesApiActions.courseUpdatedSuccess({ course })),
      catchError((error: { message: string }) =>
        of(
          coursesApiActions.courseUpdatedFailure({
            errorMsg: error.message,
          })
        )
      )
    );
  });

  readonly deleteCourseRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(coursesPageActions.courseDeleted),
      concatMap(({ id }) => this.coursesHttpService.deleteCourse(id)),
      map(({ id }) => coursesApiActions.courseDeletedSuccess({ id })),
      catchError((error: { message: string }) =>
        of(
          coursesApiActions.courseDeletedFailure({
            errorMsg: error.message,
          })
        )
      )
    );
  });

  readonly showSaveCourseSuccessAlert$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          coursesApiActions.courseAddedSuccess,
          coursesApiActions.courseUpdatedSuccess
        ),
        tap(() => console.log('Course saved successfully!'))
      );
    },
    { dispatch: false }
  );

  readonly showSaveCourseFailureAlert$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          coursesApiActions.courseAddedFailure,
          coursesApiActions.courseUpdatedFailure
        ),
        tap(({ errorMsg }) => console.log('Failed to update course!', errorMsg))
      );
    },
    { dispatch: false }
  );
}
