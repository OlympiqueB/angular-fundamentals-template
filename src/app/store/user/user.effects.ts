import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import * as UserActions from "./user.actions";
import { UserService } from "@app/user/services/user.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

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
}
