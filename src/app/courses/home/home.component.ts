import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { compareCourses, Course } from '../../../../shared/models/course';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { EditCourseDialogData } from '../edit-course-dialog/models/edit-course-dialog-data';
import { CoursesHttpService } from '../services/courses-http.service';
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
  loading$!: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private coursesHttpService: CoursesHttpService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    const courses$ = this.coursesHttpService.findAllCourses().pipe(
      map(courses => courses.sort(compareCourses)),
      shareReplay()
    );

    this.loading$ = courses$.pipe(map(courses => Boolean(courses)));

    this.beginnerCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER'))
    );

    this.advancedCourses$ = courses$.pipe(
      map(
        courses => courses.filter(course => course.category == 'ADVANCED') ?? []
      )
    );

    this.promoTotal$ = courses$.pipe(
      map(courses => courses.filter(course => course.promo).length)
    );
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
}
