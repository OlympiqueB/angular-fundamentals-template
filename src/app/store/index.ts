import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";
import { userReducer, UserState } from "./user/user.reducer";
import { UserEffects } from "./user/user.effects";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { AuthEffects } from "./auth/auth.effects";
import { authorsReducer, AuthorsState } from "./authors/authors.reducer";
import { AuthorsEffects } from "./authors/authors.effects";

export interface State {
  courses: CoursesState;
  user: UserState;
  auth: AuthState;
  authors: AuthorsState;
}
export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
  user: userReducer,
  auth: authReducer,
  authors: authorsReducer,
};
export const effects = [CoursesEffects, UserEffects, AuthEffects, AuthorsEffects];
