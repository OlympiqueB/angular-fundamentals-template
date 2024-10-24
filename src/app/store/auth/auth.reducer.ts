import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export const authFeatureKey = "auth";

export interface AuthState {
  isLoginLoading: boolean;
  isLogoutLoading: boolean;
  isRegistrationLoading: boolean;
  errorMessage: any;
  isAuthorised: boolean;
}

export const initialState: AuthState = {
  isLoginLoading: false,
  isLogoutLoading: false,
  isRegistrationLoading: false,
  errorMessage: null,
  isAuthorised: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.requestLogin, (state, { cred }) => ({
    ...state,
    isLoginLoading: true,
    errorMessage: null,
    isAuthorised: false,
  })),
  on(AuthActions.requestLoginSuccess, (state, { res }) => ({
    ...state,
    isLoginLoading: false,
    isAuthorised: true,
  })),
  on(AuthActions.requestLoginFail, (state, { error }) => ({
    ...state,
    isLoginLoading: false,
    errorMessage: error,
    isAuthorised: false,
  })),

  on(AuthActions.requestLogout, (state) => ({
    ...state,
    isLogoutLoading: true,
    errorMessage: null,
  })),
  on(AuthActions.requestLogoutSuccess, (state) => ({
    ...state,
    isLogoutLoading: false,
    isAuthorised: false,
  })),
  on(AuthActions.requestLogoutFail, (state, { error }) => ({
    ...state,
    isLogoutLoading: false,
    errorMessage: error,
    isAuthorised: false,
  })),

  on(AuthActions.requestRegistration, (state, { user }) => ({
    ...state,
    isRegistrationLoading: true,
    errorMessage: null,
  })),
  on(AuthActions.requestRegistrationSuccess, (state) => ({
    ...state,
    isRegistrationLoading: false,
  })),
  on(AuthActions.requestRegistrationFail, (state, { error }) => ({
    ...state,
    isRegistrationLoading: false,
    errorMessage: error,
  })),

  on(AuthActions.tokenValid, (state) => ({
    ...state,
    isAuthorised: true,
  })),
  on(AuthActions.tokenInvalid, (state) => ({
    ...state,
    isAuthorised: false,
  }))
);

export const reducer = (state: AuthState, action: Action): AuthState =>
  authReducer(state, action);
