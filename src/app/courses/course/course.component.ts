import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Course } from '../../../../shared/models/course';
import { Lesson } from '../../../../shared/models/lesson';
import { CoursesHttpService } from '../services/courses-http.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courseUrl: string | null = null;
  course$!: Observable<Course>;
  lessons$!: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;
  loading$!: Observable<boolean>;

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    if (this.courseUrl) {
      this.course$ = this.coursesService.findCourseByUrl(this.courseUrl);
      this.lessons$ = this.course$.pipe(
        concatMap(course => this.coursesService.findLessons(course.id))
      );
    }
  }
}
