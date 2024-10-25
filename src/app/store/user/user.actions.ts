import { createAction, props } from "@ngrx/store";
import { UserConstants } from "./user.constants";

export const requestGetUser = createAction(
  UserConstants.REQUEST_GET_USER
);
export const requestGetUserSuccess = createAction(
  UserConstants.REQUEST_GET_USER_SUCCESS,
  props<{ user: any }>()
);
export const requestGetUserFail = createAction(
  UserConstants.REQUEST_GET_USER_FAIL,
  props<{ error: any }>()
);
