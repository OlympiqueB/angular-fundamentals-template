import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CoursesService } from "@app/services/courses.service";
import * as CoursesActions from "./courses.actions";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map((res: any) =>
            CoursesActions.requestAllCoursesSuccess({ courses: res.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  // filteredCourse$

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Courses] Request Single Course"),
      exhaustMap((action: { id: string }) =>
        this.coursesService.getCourse(action.id).pipe(
          map((res: any) => ({
            type: "[Courses] Request Single Course Success",
            payload: res.result,
          })),
          catchError(() => of({ type: "[Courses] Request Single Course Fail" }))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Courses] Request Delete Course"),
      exhaustMap((action: { id: string }) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map((res: any) => ({
            type: "[Courses] Request Delete Course Success]",
          })),
          catchError(() => of({ type: "[Courses] Request Delete Course Fail" }))
        )
      )
    )
  );
}
