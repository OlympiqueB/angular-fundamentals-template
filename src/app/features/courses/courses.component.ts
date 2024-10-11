import { Component, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseModel } from "@app/shared/models/course.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(private coursesStoreService: CoursesStoreService) {}
  courses$!: Observable<CourseModel[]>;

  ngOnInit(): void {
    this.coursesStoreService.getAll();
    this.courses$ = this.coursesStoreService.courses$;
  }
}
