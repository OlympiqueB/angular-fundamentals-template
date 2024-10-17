import { TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { CoursesStateFacade } from "src/app/store/courses/courses.facade";
import { getCourse } from "src/app/store/courses/courses.selectors";
import * as CoursesActions from "src/app/store/courses/courses.actions";

describe("CoursesFacade", () => {
  let facade: CoursesStateFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesStateFacade, provideMockStore()],
    });

    facade = TestBed.inject(CoursesStateFacade);
    store = TestBed.inject(MockStore);
  });

  it("should select course from store", () => {
    const course = {
      id: '1',
      title: "Test Course",
      description: "A test",
      creationDate: "2021-01-01",
      duration: 120,
      authors: ["Author"],
    };

    store.overrideSelector(getCourse, course);

    facade.course$.subscribe((selectedCourse) => {
      expect(selectedCourse).toEqual(course);
    });
  });
});
