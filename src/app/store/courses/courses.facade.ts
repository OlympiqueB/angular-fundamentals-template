import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import {
  getAllCourses,
  getCourse,
  getErrorMessage,
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  isSingleCourseLoadingSelector,
} from "./courses.selectors";
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestEditCourse,
  requestFilteredCourses,
  requestSingleCourse,
} from "./courses.actions";
import { CourseModel } from "@app/shared/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  isAllCoursesLoading$ = this.store.pipe(select(isAllCoursesLoadingSelector));
  isSingleCourseLoading$ = this.store.pipe(
    select(isSingleCourseLoadingSelector)
  );
  isSearchingState$ = this.store.pipe(select(isSearchingStateSelector));
  // courses$ ???
  allCourses$ = this.store.pipe(select(getAllCourses));
  course$ = this.store.pipe(select(getCourse));
  errorMessage$ = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(requestSingleCourse({ id: id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: CourseModel, id: string) {
    this.store.dispatch(requestEditCourse({ id: id, course: body }));
  }

  createCourse(body: CourseModel) {
    this.store.dispatch(requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(requestDeleteCourse({ id: id }));
  }
}
