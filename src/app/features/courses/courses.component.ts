import { ButtonLabelService } from "@app/services/button-label.service";
import { Component, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseModel } from "@app/shared/models/course.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private coursesStoreService: CoursesStoreService,
    protected buttonLabelService: ButtonLabelService,
    private router: Router
  ) {}
  courses$!: Observable<CourseModel[]>;

  ngOnInit(): void {
    this.coursesStoreService.getAll();
    this.coursesStoreService.getAllAuthors();
    this.courses$ = this.coursesStoreService.courses$;
  }

  onNewCourseClick(): void {
    this.router.navigate(["courses/add"]);
  }
}
