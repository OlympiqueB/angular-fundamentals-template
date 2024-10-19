import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userFeatureKey, UserState } from "./user.reducer";

export const selectUserState =
  createFeatureSelector<UserState>(userFeatureKey);

export const isUserLoadingSelector = createSelector(
  selectUserState,
  (state: UserState) => state.isUserLoading
);

export const getUserEmail = createSelector(
  selectUserState,
  (state: UserState) => state.email
);

export const getUserId = createSelector(
  selectUserState,
  (state: UserState) => state.id
);
export const getUserName = createSelector(
  selectUserState,
  (state: UserState) => state.name
);
export const getUserRole = createSelector(
  selectUserState,
  (state: UserState) => state.role
);

export const getErrorMessage = createSelector(
  selectUserState,
  (state: UserState) => state.errorMessage
);
