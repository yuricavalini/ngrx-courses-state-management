import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { coursesPageActions } from '../action-types';
import { selectCoursePageViewModel } from '../courses.selectors';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  vm$ = this.store.select(selectCoursePageViewModel);
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(coursesPageActions.openedCourse());
  }
}
