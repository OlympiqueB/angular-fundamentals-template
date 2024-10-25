import { createAction, props } from "@ngrx/store";
import { AuthConstants } from "./auth.constants";
import {
  LoginSuccessResponse,
  LoginUserModel,
} from "@app/auth/models/login.model";

export const requestLogin = createAction(
  AuthConstants.REQUEST_LOGIN,
  props<{ cred: LoginUserModel }>()
);
export const requestLoginSuccess = createAction(
  AuthConstants.REQUEST_LOGIN_SUCCESS,
  props<{ res: LoginSuccessResponse }>()
);
export const requestLoginFail = createAction(
  AuthConstants.REQUEST_LOGIN_FAIL,
  props<{ error: any }>()
);

export const requestLogout = createAction(AuthConstants.REQUEST_LOGOUT);
export const requestLogoutSuccess = createAction(
  AuthConstants.REQUEST_LOGOUT_SUCCESS
);
export const requestLogoutFail = createAction(
  AuthConstants.REQUEST_LOGOUT_FAIL,
  props<{ error: any }>()
);

export const requestRegistration = createAction(
  AuthConstants.REQUEST_REGISTRATION,
  props<{ user: any }>()
);
export const requestRegistrationSuccess = createAction(
  AuthConstants.REQUEST_REGISTRATION_SUCCESS
);
export const requestRegistrationFail = createAction(
  AuthConstants.REQUEST_REGISTRATION_FAIL,
  props<{ error: any }>()
);

export const tokenValid = createAction(AuthConstants.TOKEN_VALID);
export const tokenInvalid = createAction(AuthConstants.TOKEN_INVALID);
