import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export const userFeatureKey = "user";

export interface UserState {
  isUserLoading: boolean;
  email: string;
  id: string;
  name: string;
  role: string;
  errorMessage: any;
}

export const initialState: UserState = {
  isUserLoading: false,
  email: "",
  id: "",
  name: "",
  role: "",
  errorMessage: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.requestGetUser, (state) => ({
    ...state,
    isUserLoading: true,
    errorMessage: null,
  })),
  on(UserActions.requestGetUserSuccess, (state, { user }) => ({
    ...state,
    email: user.email,
    id: user.id,
    name: user.name,
    role: user.role,
    isUserLoading: false,
  })),
  on(UserActions.requestGetUserFail, (state, { error }) => ({
    ...state,
    isUserLoading: false,
    errorMessage: error,
  }))
);

export const reducer = (state: UserState, action: Action): UserState =>
  userReducer(state, action);
