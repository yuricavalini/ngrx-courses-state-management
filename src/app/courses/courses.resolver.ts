import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, tap } from 'rxjs/operators';

import { loadAllCourses } from './course.actions';

@Injectable()
export class CoursesResolver implements Resolve<any> {
  private loading = false;

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
