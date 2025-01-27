import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { login, logout } from './auth/auth.actions';
import { selectIsLoggedIn, selectIsLoggedOut } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngrx-courses-state-management';
  loading = true;
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  private unsubs$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.pipe(takeUntil(this.unsubs$)).subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isLoggedOut$ = this.store.select(selectIsLoggedOut);
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  logout() {
    this.store.dispatch(logout());
  }
}
