import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import {
  getErrorMessage,
  isAuthorised,
  isLoginLoadingSelector,
  isLogoutLoadingSelector,
  isRegistrationLoadingSelector,
} from "./auth.selectors";
import {
  requestLogin,
  requestLogout,
  requestRegistration,
} from "./auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthStateFacade {
  isLoginLoading = this.store.pipe(select(isLoginLoadingSelector));
  isLogoutLoading = this.store.pipe(select(isLogoutLoadingSelector));
  isRegistrationLoading = this.store.pipe(
    select(isRegistrationLoadingSelector)
  );
  isAuthorised$ = this.store.pipe(select(isAuthorised));
  errorMessage$ = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<AuthState>) {}

  login(cred: any) {
    this.store.dispatch(requestLogin({ cred: cred }));
  }

  logout() {
    this.store.dispatch(requestLogout());
  }

  register(user: any) {
    this.store.dispatch(requestRegistration({ user: user }));
  }
}
