import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CourseModel } from "@app/shared/models/course.model";
import { forkJoin, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  BASE_URL = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<CourseModel[]>(this.BASE_URL + "/courses/all");
  }

  createCourse(course: CourseModel) {
    return this.http.post(this.BASE_URL + "/courses/add", course);
  }

  editCourse(id: string, course: CourseModel) {
    return this.http.put(this.BASE_URL + "/courses/" + id, course);
  }

  getCourse(id: string) {
    return this.http.get(this.BASE_URL + "/courses/" + id);
  }

  deleteCourse(id: string) {
    return this.http.delete(this.BASE_URL + "/courses/" + id);
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
        .get(`${this.BASE_URL}/courses/filter?${param.key}=${param.value}`)
        .pipe(map((res: any) => res.result));
    });

    return forkJoin(requests).pipe(map((res: any) => res.flat()));
  }

  getAllAuthors() {
    return this.http.get(this.BASE_URL + "/authors/all");
  }

  createAuthor(name: string) {
    return this.http.post(this.BASE_URL + "/authors/add", { name: name });
  }

  getAuthorById(id: string) {
    return this.http.get(this.BASE_URL + "/authors/" + id);
  }
}