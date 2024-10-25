import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoginLoadingSelector = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoginLoading
);

export const isLogoutLoadingSelector = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLogoutLoading
);

export const isRegistrationLoadingSelector = createSelector(
  selectAuthState,
  (state: AuthState) => state.isRegistrationLoading
);

export const isAuthorised = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthorised
);

export const getErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.errorMessage
);
