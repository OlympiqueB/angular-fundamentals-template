import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { CoursesEffects } from 'src/app/store/courses/courses.effects';
import * as CoursesActions from 'src/app/store/courses/courses.actions';

describe('Courses Effects', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CoursesEffects);
  });

  it('should handle requestFilteredCoursesSuccess action', () => {
    const courses = [
      { id: '1', title: 'Test Course', description: 'A test', creationDate: '2021-01-01', duration: 120, authors: ['Author'] },
    ];
    const action = CoursesActions.requestFilteredCoursesSuccess({ courses });

    actions$ = of(action);

    effects.filteredCourses$.subscribe((result) => {
      expect(result).toEqual(action);  // Proper expectation based on your effect
    });
  });
});