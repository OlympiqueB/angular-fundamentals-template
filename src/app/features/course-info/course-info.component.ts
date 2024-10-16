import { map, Observable } from "rxjs";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CourseModel } from "@app/shared/models/course.model";
import { AuthorModel } from "@app/shared/models/author.model";
import { NAV_ROUTES } from "@app/app-routing.module";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course$!: Observable<CourseModel>;
  courseId!: string;
  authors$?: Observable<AuthorModel[]>;

  constructor(
    public buttonLabelService: ButtonLabelService,
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params["id"];
      this.course$ = this.coursesStoreService
        .getCourse(this.courseId)
        .pipe(map((res: any) => res.result));
      this.authors$ = this.coursesStoreService.authors$;
    });
  }

  onBackClick(): void {
    this.router.navigate([NAV_ROUTES.COURSES])
  }
}
