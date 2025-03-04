import { getRouterSelectors } from '@ngrx/router-store';

// `router` is used as the default feature name. You can use the feature name
// of your choice by creating a feature selector and pass it to the `getRouterSelectors` function
// export const selectRouter = createFeatureSelector<RouterReducerState>('yourFeatureName');

export const { selectRouteParams } = getRouterSelectors();
