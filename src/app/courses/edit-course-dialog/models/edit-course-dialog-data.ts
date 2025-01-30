import { Course } from '../../../../../shared/models/course';

export type EditCourseDialogData =
  | { title: string; course: undefined; mode: 'create' }
  | { title: string; course: Course; mode: 'update' };
