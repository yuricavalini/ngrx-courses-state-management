import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  coursesFeatureKey,
  CoursesState,
  selectAll,
} from './reducers/course.reducers';
import { selectRouteParams } from './router.selectors';

export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectCourses = createSelector(selectCoursesState, selectAll);

export const selectFilteredCourses = createSelector(selectCourses, courses => ({
  beginner: courses.filter(course => course.category === 'BEGINNER'),
  advanced: courses.filter(course => course.category === 'ADVANCED'),
  promoCount: courses.filter(course => course.promo).length,
}));

export const selectBeginnerCourses = createSelector(
  selectFilteredCourses,
  filtered => filtered.beginner
);

export const selectAdvancedCourses = createSelector(
  selectFilteredCourses,
  filtered => filtered.advanced
);

export const selectPromoTotal = createSelector(
  selectFilteredCourses,
  filtered => filtered.promoCount
);

export const selectIsLoadedCoursesList = createSelector(
  selectCoursesState,
  state => state.isListLoaded
);

export const selectIsLoadingCoursesList = createSelector(
  selectCoursesState,
  state => state.isListLoading
);

export const selectErrorCoursesList = createSelector(
  selectCoursesState,
  state => state.errorMsg
);

export const selectIsLoadedCourse = createSelector(
  selectCoursesState,
  state => state.isSelectedCourseLoaded
);

export const selectIsLoadingCourse = createSelector(
  selectCoursesState,
  state => state.isSelectedCourseLoading
);

export const selectErrorCourse = createSelector(
  selectCoursesState,
  state => state.errorMsgSelectedCourse
);

export const selectSelectedCourse = createSelector(
  selectCoursesState,
  state => state.selectedCourse
);

export const selectSelectedCourseLessons = createSelector(
  selectCoursesState,
  state => state.selectedCourseLessons
);

export const selectCourseById = (id: string) =>
  createSelector(selectCoursesState, state => state.entities[id]);

export const selectCourseUrlFromRoute = createSelector(
  selectRouteParams,
  routeParams => routeParams['courseUrl'] as string | undefined
);

export const selectCourseByUrl = createSelector(
  selectCourses,
  selectCourseUrlFromRoute,
  (courses, courseUrl) => {
    return courses.find(course => course.url === courseUrl);
  }
);

export const selectCoursePageViewModel = createSelector(
  selectSelectedCourse,
  selectSelectedCourseLessons,
  selectIsLoadingCourse,
  selectIsLoadedCourse,
  (course, lessons, isLoadingCourse, isLoadedCourse) => ({
    course,
    lessons,
    isLoadingCourse,
    isLoadedCourse,
  })
);
