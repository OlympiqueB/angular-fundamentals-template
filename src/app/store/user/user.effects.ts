import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import * as UserActions from "./user.actions";
import * as AuthActions from "../auth/auth.actions";
import { UserService } from "@app/user/services/user.service";
import { Store } from "@ngrx/store";
import { AuthState } from "../auth/auth.reducer";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AuthState>
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.requestGetUser),
      exhaustMap(() =>
        this.userService.getUser().pipe(
          map((res: any) =>
            UserActions.requestGetUserSuccess({ user: res.result })
          ),
          catchError((error) => of(UserActions.requestGetUserFail({ error })))
        )
      )
    )
  );

  validToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.requestGetUserSuccess),
        tap(() => {
          this.store.dispatch(AuthActions.tokenValid());
        })
      ),
    { dispatch: false }
  );
}
