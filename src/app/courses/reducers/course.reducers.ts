import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { compareCourses, Course } from '../../../../shared/models/course';
import { Lesson } from '../../../../shared/models/lesson';
import { coursesApiActions, coursesPageActions } from '../action-types';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
  selectedCourse: Course | null;
  selectedCourseLessons: Lesson[] | null;
  isListLoaded: boolean;
  isListLoading: boolean;
  isSelectedCourseLoaded: boolean;
  isSelectedCourseLoading: boolean;
  errorMsg: string;
  errorMsgSelectedCourse: string;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState: CoursesState = adapter.getInitialState({
  selectedCourse: null,
  selectedCourseLessons: null,
  isListLoaded: false,
  isListLoading: false,
  isSelectedCourseLoaded: false,
  isSelectedCourseLoading: false,
  errorMsg: '',
  errorMsgSelectedCourse: '',
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(
    coursesPageActions.openedCoursesList,
    (state): CoursesState => ({
      ...state,
      selectedCourse: null,
      selectedCourseLessons: null,
      isListLoaded: false,
      isListLoading: true,
      isSelectedCourseLoaded: false,
      isSelectedCourseLoading: false,
      errorMsg: '',
      errorMsgSelectedCourse: '',
    })
  ),
  on(
    coursesApiActions.coursesListLoadedSuccess,
    (state, { courses }): CoursesState =>
      adapter.addMany(courses, {
        ...state,
        selectedCourse: null,
        selectedCourseLessons: null,
        isListLoaded: true,
        isListLoading: false,
        isSelectedCourseLoaded: false,
        isSelectedCourseLoading: false,
        errorMsg: '',
        errorMsgSelectedCourse: '',
      })
  ),
  on(
    coursesApiActions.courseAddedSuccess,
    (state, { course }): CoursesState => adapter.addOne(course, { ...state })
  ),
  on(
    coursesApiActions.courseUpdatedSuccess,
    (state, { course }): CoursesState =>
      adapter.updateOne({ id: course.id, changes: course }, { ...state })
  ),
  on(
    coursesApiActions.courseDeletedSuccess,
    (state, { id }): CoursesState => adapter.removeOne(id, { ...state })
  ),
  on(
    coursesApiActions.coursesListLoadedFailure,
    coursesApiActions.courseAddedFailure,
    coursesApiActions.courseUpdatedFailure,
    coursesApiActions.courseDeletedFailure,
    (state, { errorMsg }): CoursesState => ({
      ...state,
      isListLoaded: false,
      isListLoading: false,
      errorMsg: errorMsg,
    })
  ),
  on(
    coursesPageActions.openedCourse,
    (state): CoursesState => ({
      ...state,
      selectedCourse: null,
      selectedCourseLessons: null,
      isSelectedCourseLoaded: false,
      isSelectedCourseLoading: true,
      errorMsgSelectedCourse: '',
    })
  ),
  on(
    coursesApiActions.courseLoadedSuccess,
    (state, { selectedCourse, selectedCourseLessons }): CoursesState => ({
      ...state,
      selectedCourse,
      selectedCourseLessons,
      isSelectedCourseLoaded: true,
      isSelectedCourseLoading: false,
      errorMsgSelectedCourse: '',
    })
  ),
  on(
    coursesApiActions.courseLoadedFailure,
    (state, { errorMsgSelectedCourse }): CoursesState => ({
      ...state,
      selectedCourse: null,
      selectedCourseLessons: null,
      isSelectedCourseLoaded: false,
      isSelectedCourseLoading: false,
      errorMsgSelectedCourse: errorMsgSelectedCourse,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
