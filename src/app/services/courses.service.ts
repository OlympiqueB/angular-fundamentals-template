import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CourseModel } from "@app/shared/models/course.model";
import { forkJoin, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<CourseModel[]>(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.COURSES_ALL}`
    );
  }

  createCourse(course: CourseModel) {
    return this.http.post(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.COURSES_ADD}`,
      course
    );
  }

  editCourse(id: string, course: CourseModel) {
    return this.http.put(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.COURSES}/${id}`,
      course
    );
  }

  getCourse(id: string) {
    return this.http.get(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.COURSES}/${id}`
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.COURSES}/${id}`
    );
  }

  filterCourses(value: string) {
    return this.http.get(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.COURSES_FILTER}?title=${value}`
    );
  }

  getAllAuthors() {
    return this.http.get(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.AUTHORS_ALL}`
    );
  }

  createAuthor(name: string) {
    return this.http.post(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.AUTHORS_ADD}`,
      {
        name: name,
      }
    );
  }

  getAuthorById(id: string) {
    return this.http.get(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.AUTHORS}/${id}`
    );
  }
}
