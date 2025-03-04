import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Course } from 'shared/models/course';

export const openedCoursesList = createAction('[Courses Page] Opened');

export const courseAdded = createAction(
  '[Courses Page] Add Course Form Submitted',
  props<{ course: Course }>()
);

export const courseUpdated = createAction(
  '[Courses Page] Update Course Form Submitted',
  props<{ update: Update<Course> }>()
);

export const courseDeleted = createAction(
  '[Courses Page] Delete Course Action Submitted',
  props<{ id: string }>()
);

export const openedCourse = createAction('[Course Page] Opened');
