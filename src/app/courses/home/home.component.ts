import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Course } from '../../../../shared/models/course';
import { coursesPageActions } from '../action-types';
import {
  selectAdvancedCourses,
  selectBeginnerCourses,
  selectPromoTotal,
} from '../courses.selectors';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { EditCourseDialogData } from '../edit-course-dialog/models/edit-course-dialog-data';
import { defaultDialogConfig } from '../shared/default-dialog-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$!: Observable<Course[]>;
  advancedCourses$!: Observable<Course[]>;
  promoTotal$!: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.beginnerCourses$ = this.store.select(selectBeginnerCourses);
    this.advancedCourses$ = this.store.select(selectAdvancedCourses);
    this.promoTotal$ = this.store.select(selectPromoTotal);
  }

  onReload() {
    this.loadData();
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    const dialogData: EditCourseDialogData = {
      title: 'Create Course',
      course: undefined,
      mode: 'create',
    };

    dialogConfig.data = dialogData;

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  onDeleteCourse(id: string) {
    this.store.dispatch(coursesPageActions.courseDeleted({ id }));
    this.loadData();
  }
}
