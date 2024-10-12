import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { CourseModel } from "@app/shared/models/course.model";
import { AuthorModel } from "@app/shared/models/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<CourseModel[]>([]);

  private authors$$ = new BehaviorSubject<AuthorModel[]>([]);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<CourseModel[]> = this.courses$$.asObservable();
  public authors$: Observable<AuthorModel[]> = this.authors$$.asObservable();

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

  filterCourses(value: string) {
    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses(value)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((filteredCourses: any) => {
        this.courses$$.next(filteredCourses);
      });
  }

  getAllAuthors() {
    this.coursesService.getAllAuthors().subscribe((res: any) => {
      this.authors$$.next(res.result);
    });
  }

  createAuthor(name: string) {
    this.coursesService
      .createAuthor(name)
      .subscribe(() => this.getAllAuthors());
  }

  getAuthorById(id: string) {
    return this.coursesService.getAuthorById(id);
  }
}
