import { createAction, props } from '@ngrx/store';

import { Course } from '../../../shared/models/course';
import { Lesson } from '../../../shared/models/lesson';

export const coursesListLoadedSuccess = createAction(
  '[Courses API] Courses Loaded Successfully',
  props<{ courses: Course[] }>()
);
export const coursesListLoadedFailure = createAction(
  '[Courses API] Failed to Load Courses',
  props<{ errorMsg: string }>()
);

export const courseAddedSuccess = createAction(
  '[Courses API] Course Added Successfully',
  props<{ course: Course }>()
);
export const courseAddedFailure = createAction(
  '[Courses API] Failed to Add Course',
  props<{ errorMsg: string }>()
);

export const courseUpdatedSuccess = createAction(
  '[Courses API] Course Updated Successfully',
  props<{ course: Course }>()
);
export const courseUpdatedFailure = createAction(
  '[Courses API] Failed to Update Course',
  props<{ errorMsg: string }>()
);

export const courseDeletedSuccess = createAction(
  '[Courses API] Course Deleted Successfully',
  props<{ id: string }>()
);
export const courseDeletedFailure = createAction(
  '[Courses API] Failed to Delete Course',
  props<{ errorMsg: string }>()
);

export const courseLoadedSuccess = createAction(
  '[Courses API] Course Loaded Successfully',
  props<{ selectedCourse: Course; selectedCourseLessons: Lesson[] }>()
);
export const courseLoadedFailure = createAction(
  '[Courses API] Failed to Load Course',
  props<{ errorMsgSelectedCourse: string }>()
);
