import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROUTES } from "@app/app-routing.module";
import { CourseModel } from "@app/shared/models/course.model";
import { forkJoin, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<CourseModel[]>(
      `${environment.BASE_URL}/${API_ROUTES.COURSES_ALL}`
    );
  }

  createCourse(course: CourseModel) {
    return this.http.post(
      `${environment.BASE_URL}/${API_ROUTES.COURSES_ADD}`,
      course
    );
  }

  editCourse(id: string, course: CourseModel) {
    return this.http.put(
      `${environment.BASE_URL}/${API_ROUTES.COURSES}/${id}`,
      course
    );
  }

  getCourse(id: string) {
    return this.http.get(`${environment.BASE_URL}/${API_ROUTES.COURSES}/${id}`);
  }

  deleteCourse(id: string) {
    return this.http.delete(
      `${environment.BASE_URL}/${API_ROUTES.COURSES}/${id}`
    );
  }

  filterCourses(value: string) {
    const res: any[] = [];

    const parameters = [
      { key: "title", value: value },
      { key: "description", value: value },
      { key: "duration", value: value },
      { key: "creationDate", value: value },
    ];

    const requests = parameters.map((param) => {
      return this.http
        .get(
          `${environment.BASE_URL}/${API_ROUTES.COURSES_FILTER}?${param.key}=${param.value}`
        )
        .pipe(map((res: any) => res.result));
    });

    return forkJoin(requests).pipe(map((res: any) => res.flat()));
  }

  getAllAuthors() {
    return this.http.get(`${environment.BASE_URL}/${API_ROUTES.AUTHORS_ALL}`);
  }

  createAuthor(name: string) {
    return this.http.post(`${environment.BASE_URL}/${API_ROUTES.AUTHORS_ADD}`, {
      name: name,
    });
  }

  getAuthorById(id: string) {
    return this.http.get(`${environment.BASE_URL}/${API_ROUTES.AUTHORS}/${id}`);
  }
}
