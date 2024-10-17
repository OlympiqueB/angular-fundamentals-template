import * as CoursesActions from 'src/app/store/courses/courses.actions';

describe('Courses Actions', () => {
  it('should create a requestDeleteCourseSuccess action with no arguments', () => {
    const action = CoursesActions.requestDeleteCourseSuccess(); // No arguments expected
    expect(action.type).toEqual('[Courses] Request Delete Course Success');
  });

  it('should create a requestCreateCourseSuccess action with a valid course', () => {
    const course = {
      id: '123',
      title: 'Test Course',
      description: 'A test description',
      creationDate: '2021-01-01',
      duration: 120,
      authors: ['Author 1'],
    };
    const action = CoursesActions.requestCreateCourseSuccess({ course });
    expect(action.type).toEqual('[Courses] Request Create Course Success');
    expect(action.course).toEqual(course);
  });
});