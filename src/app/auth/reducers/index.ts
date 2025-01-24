import { createReducer, on } from '@ngrx/store';
import { User } from 'shared/models/user';

import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(
    AuthActions.login,
    (state, action): AuthState => ({
      ...state,
      user: action.user,
    })
  ),
  on(
    AuthActions.logout,
    (state): AuthState => ({
      ...state,
      user: undefined,
    })
  )
);
