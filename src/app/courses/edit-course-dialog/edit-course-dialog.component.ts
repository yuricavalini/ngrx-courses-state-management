import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Course } from '../../../../shared/models/course';
import { CoursesHttpService } from '../services/courses-http.service';
import { EditCourseDialogData } from './models/edit-course-dialog-data';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss'],
})
export class EditCourseDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  dialogData!: EditCourseDialogData;
  loading$!: Observable<boolean>;

  private unsubs$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: EditCourseDialogData,
    private coursesService: CoursesHttpService
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data;
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const course: Course = {
      ...this.dialogData.course,
      ...this.form.value,
    };

    this.coursesService
      .saveCourse(course.id, course)
      .pipe(takeUntil(this.unsubs$))
      .subscribe(() => this.dialogRef.close());
  }

  private createForm() {
    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: [false],
    };

    let form: FormGroup;

    if (this.dialogData.mode === 'update') {
      form = this.fb.group(formControls);
      form.patchValue(this.dialogData.course);
    } else {
      form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required],
      });
    }

    return form;
  }
}
