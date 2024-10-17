import * as fromReducer from "src/app/store/courses/courses.reducer";
import * as CoursesActions from "src/app/store/courses/courses.actions";

describe("Courses Reducer", () => {
  it("should handle requestDeleteCourseSuccess", () => {
    const initialState = {
      allCourses: [],
      course: null,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false,
      errorMessage: null,
    };
    const action = CoursesActions.requestDeleteCourseSuccess(); // Ensure this action expects no arguments
    const state = fromReducer.coursesReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      allCourses: [], // Modify this based on what the action does
    });
  });
});
