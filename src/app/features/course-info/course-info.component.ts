import { map, Observable } from "rxjs";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CourseModel } from "@app/shared/models/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course$!: Observable<CourseModel>;
  courseId!: string;

  constructor(
    public buttonLabelService: ButtonLabelService,
    public router: Router,
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params["id"];
      this.course$ = this.coursesStoreService
        .getCourse(this.courseId)
        .pipe(map((res: any) => res.result));
    });
  }

  loadCourse(id: string) {
    return this.coursesStoreService.getCourse(id);
  }
}
