import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(coursesRoutes)],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class CoursesModule {}
