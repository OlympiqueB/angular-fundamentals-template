import { CourseModel } from "@app/shared/models/course.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";

// Add your code here
export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: CourseModel[];
  course: CourseModel | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: any;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isSearchState: true,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: false,
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  // CHECK THE ONES AFTER THIS COMMENT

  on(CoursesActions.requestDeleteCourse, (state, { id }) => ({
    ...state,
    isAllCoursesLoading: true, // Loading state for delete operation
    errorMessage: null, // Clear previous errors
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    isAllCoursesLoading: false, // Turn off loading after successful deletion
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false, // Turn off loading on failure
    errorMessage: error, // Capture the error
  })),


  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true, // Loading state for edit operation
    errorMessage: null, // Clear previous errors
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses.map((c) => (c.id === course.id ? course : c)), // Update the edited course
    isSingleCourseLoading: false, // Turn off loading
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false, // Turn off loading on failure
    errorMessage: error, // Capture the error
  })),

  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true, // Loading state for create operation
    errorMessage: null, // Clear previous errors
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course], // Add the new course to the list
    isSingleCourseLoading: false, // Turn off loading
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false, // Turn off loading on failure
    errorMessage: error, // Capture the error
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
