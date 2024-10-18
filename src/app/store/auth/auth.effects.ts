import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import * as AuthActions from "./auth.actions";
import * as UserActions from "./../user/user.actions";
import { AuthService } from "@app/auth/services/auth.service";
import { Router } from "@angular/router";
import { NAV_ROUTES } from "@app/app-routing.module";
import {
  LoginSuccessResponse,
  LoginUserModel,
} from "@app/auth/models/login.model";
import { RegistrationUserModel } from "@app/auth/models/registation.model";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private store: Store<AuthState>
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestLogin),
      exhaustMap((action: { cred: LoginUserModel }) =>
        this.authService.login(action.cred).pipe(
          map((res: any) => AuthActions.requestLoginSuccess({ res: res })),
          catchError((error) => of(AuthActions.requestLoginFail({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestLogout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.requestLogoutSuccess()),
          catchError((error) => of(AuthActions.requestLogoutFail({ error })))
        )
      )
    )
  );

  registrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestRegistration),
      exhaustMap((action: { user: RegistrationUserModel }) =>
        this.authService.register(action.user).pipe(
          map(() => AuthActions.requestRegistrationSuccess()),
          catchError((error) =>
            of(AuthActions.requestRegistrationFail({ error }))
          )
        )
      )
    )
  );

  redirectToLoginPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.requestLogoutSuccess, AuthActions.requestLogoutFail),
        exhaustMap(() => this.router.navigate([NAV_ROUTES.LOGIN]))
      ),
    { dispatch: false }
  );

  setToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.requestLoginSuccess),
        tap((action: { res: LoginSuccessResponse }) => {
          this.sessionStorageService.setToken(action.res.result);
          this.store.dispatch(UserActions.requestGetUser());
        })
      ),
    { dispatch: false }
  );

  deleteToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.requestLogoutSuccess,
          AuthActions.requestLogoutFail,
          UserActions.requestGetUserFail
        ),
        tap(() => {
          this.sessionStorageService.deleteToken();
          this.store.dispatch(AuthActions.tokenInvalid());
        })
      ),
    { dispatch: false }
  );
}
