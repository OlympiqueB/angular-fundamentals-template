import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "@app/baseurl";
import { CourseModel } from "@app/shared/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<CourseModel[]>(BASE_URL + "/courses/all");
  }

  createCourse(course: CourseModel) {
    // replace 'any' with the required interface
    return this.http.post(BASE_URL + "/courses/add", course);
  }

  editCourse(id: string, course: CourseModel) {
    // replace 'any' with the required interface
    return this.http.put(BASE_URL + "/courses/" + id, course);
  }

  getCourse(id: string) {
    return this.http.get(BASE_URL + "/courses/" + id);
  }

  deleteCourse(id: string) {
    return this.http.delete(BASE_URL + "/courses/" + id);
  }

  filterCourses(value: string) {
    return this.http.get(BASE_URL + "/courses/filter" + value);
  }

  getAllAuthors() {
    return this.http.get(BASE_URL + "/authors/");

  }

  createAuthor(name: string) {
    // Add your code here
  }

  getAuthorById(id: string) {
    // Add your code here
  }
}
