import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CoursesService } from "@app/services/courses.service";
import * as AuthorsActions from "./authors.actions";
import { AuthorModel } from "@app/shared/models/author.model";

@Injectable()
export class AuthorsEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  getAllAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestAllAuthors),
      exhaustMap(() =>
        this.coursesService.getAllAuthors().pipe(
          map((res: any) =>
            AuthorsActions.requestAllAuthorsSuccess({ authors: res.result })
          ),
          catchError((error) =>
            of(AuthorsActions.requestAllAuthorsFail({ error }))
          )
        )
      )
    )
  );

  createAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestCreateAuthor),
      exhaustMap((action: { name: string }) =>
        this.coursesService.createAuthor(action.name).pipe(
          map((res: any) =>
            AuthorsActions.requestCreateAuthorSuccess({ author: res.result })
          ),
          catchError((error) =>
            of(AuthorsActions.requestCreateAuthorFail({ error }))
          )
        )
      )
    )
  );
}
