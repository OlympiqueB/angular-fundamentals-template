import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";
import { userReducer, UserState } from "./user/user.reducer";
import { UserEffects } from "./user/user.effects";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { AuthEffects } from "./auth/auth.effects";

export interface State {
  courses: CoursesState;
  user: UserState,
  auth: AuthState
}
export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
  user: userReducer,
  auth: authReducer
};
export const effects = [CoursesEffects, UserEffects, AuthEffects];
