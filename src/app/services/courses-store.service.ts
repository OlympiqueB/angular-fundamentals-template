import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { CourseModel } from "@app/shared/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<CourseModel[]>([]);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<CourseModel[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((res: any) => {
        this.courses$$.next(res.result);
      });
  }

  createCourse(course: any) {
    this.isLoading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(() => {
        this.getAll();
      });
  }

  getCourse(id: string) {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: CourseModel) {
    this.isLoading$$.next(true);
    this.coursesService
      .editCourse(id, course)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(() => {
        this.getAll();
      });
  }

  deleteCourse(id: string) {
    this.isLoading$$.next(true);
    this.coursesService
      .deleteCourse(id)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(() => {
        const currentCourses = this.courses$$.getValue();
        this.courses$$.next(
          currentCourses.filter((course) => course.id !== id)
        );
      });
  }

  // filterCourses(value: string) {
  //   this.isLoading$$.next(true);
  //   this.coursesService
  //     .filterCourses(value)
  //     .pipe(finalize(() => this.isLoading$$.next(false)))
  //     .subscribe((filteredCourses: CourseModel[]) => {
  //       this.courses$$.next(filteredCourses); // Update with filtered data
  //     });
  // }

  getAllAuthors() {
    // Add your code here
  }

  createAuthor(name: string) {
    // Add your code here
  }

  getAuthorById(id: string) {
    // Add your code here
  }
}
