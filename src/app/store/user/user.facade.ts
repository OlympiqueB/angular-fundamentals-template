import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { UserState } from "./user.reducer";
import {
  getErrorMessage,
  getUserEmail,
  getUserId,
  getUserName,
  getUserRole,
  isUserLoadingSelector,
} from "./user.selectors";
import { requestGetUser } from "./user.actions";

@Injectable({
  providedIn: "root",
})
export class UserStateFacade {
  isUserLoading$ = this.store.pipe(select(isUserLoadingSelector));
  email$ = this.store.pipe(select(getUserEmail));
  id$ = this.store.pipe(select(getUserId));
  name$ = this.store.pipe(select(getUserName));
  role$ = this.store.pipe(select(getUserRole));
  errorMessage$ = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<UserState>) {}

  getUser() {
    this.store.dispatch(requestGetUser());
  }
}
