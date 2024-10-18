import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";
import { userReducer, UserState } from "./user/user.reducer";
import { UserEffects } from "./user/user.effects";

export interface State {
  courses: CoursesState;
  user: UserState
}
export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
  user: userReducer
};
export const effects = [CoursesEffects, UserEffects];
