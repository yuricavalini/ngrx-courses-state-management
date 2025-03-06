import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../../../../shared/models/course';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { EditCourseDialogData } from '../edit-course-dialog/models/edit-course-dialog-data';
import { defaultDialogConfig } from '../shared/default-dialog-config';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
})
export class CoursesCardListComponent {
  @Input()
  courses!: Course[];

  @Output()
  courseUpdated = new EventEmitter<void>();

  @Output()
  courseDeleted = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    const dialogData: EditCourseDialogData = {
      title: 'Edit Course',
      course,
      mode: 'update',
    };

    dialogConfig.data = dialogData;

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseUpdated.emit());
  }

  deleteCourse(id: number) {
    this.courseDeleted.emit(String(id));
  }
}
