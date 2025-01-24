import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';

import { login } from '../auth.actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit, OnDestroy {
  protected form!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  private unsubs$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  createForm() {
    this.form = this.fb.nonNullable.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }

  login() {
    const formValues = this.form.value;

    if (this.form.invalid || !formValues.email || !formValues.password) {
      alert('Invalid form');
      return;
    }

    this.auth
      .login(formValues.email, formValues.password)
      .pipe(
        tap(user => {
          this.store.dispatch(login({ user }));
          this.router.navigateByUrl('/courses');
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe({
        error: () => alert('Login failed'),
      });
  }
}
