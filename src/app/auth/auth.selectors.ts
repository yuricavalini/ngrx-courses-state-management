import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey, AuthState } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsLoggedIn = createSelector(selectAuthState, auth =>
  Boolean(auth.user)
);

export const selectIsLoggedOut = createSelector(
  selectIsLoggedIn,
  loggedIn => !loggedIn
);
