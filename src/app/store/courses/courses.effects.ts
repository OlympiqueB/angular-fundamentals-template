import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CoursesService } from "@app/services/courses.service";
import * as CoursesActions from "./courses.actions";
import { CourseModel } from "@app/shared/models/course.model";
import { Router } from "@angular/router";
import { NAV_ROUTES } from "@app/app-routing.module";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router
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

  filteredCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      exhaustMap((action: { title: string }) =>
        this.coursesService.filterCourses(action.title).pipe(
          map((res: any) =>
            CoursesActions.requestFilteredCoursesSuccess({
              courses: res.result,
            })
          ),
          catchError((error) =>
            of(CoursesActions.requestFilteredCoursesFail({ error }))
          )
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      exhaustMap((action: { id: string }) =>
        this.coursesService.getCourse(action.id).pipe(
          map((res: any) =>
            CoursesActions.requestSingleCourseSuccess({ course: res.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      exhaustMap((action: { id: string }) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => CoursesActions.requestDeleteCourseSuccess()),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      exhaustMap((action: { id: string; course: CourseModel }) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((res: any) =>
            CoursesActions.requestEditCourseSuccess({ course: res.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      exhaustMap((action: { course: CourseModel }) =>
        this.coursesService.createCourse(action.course).pipe(
          map((res: any) =>
            CoursesActions.requestCreateCourseSuccess({ course: res.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        exhaustMap(() => this.router.navigate([NAV_ROUTES.COURSES]))
      ),
    { dispatch: false }
  );
}
