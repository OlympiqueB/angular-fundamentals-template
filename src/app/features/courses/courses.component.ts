import { Component, OnInit } from "@angular/core";
import { requestAllCourses } from "@app/store/courses/courses.actions";
import { getAllCourses } from "@app/store/courses/courses.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(private store: Store) {}
  mockedCoursesList$!: Observable<any>;
  ngOnInit(): void {
    this.store.dispatch(requestAllCourses());
    this.mockedCoursesList$ = this.store.select(getAllCourses)
  }
}
