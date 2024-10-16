import { Observable } from "rxjs";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonLabelService } from "@app/services/button-label.service";
import { AuthorModel } from "@app/shared/models/author.model";
import { NAV_ROUTES } from "@app/app-routing.module";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course$ = this.coursesFacade.course$;
  authors$?: Observable<AuthorModel[]>;
  isSingleCourseLoading$ = this.coursesFacade.isSingleCourseLoading$;

  constructor(
    public buttonLabelService: ButtonLabelService,
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private coursesFacade: CoursesStateFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params["id"];
      this.coursesFacade.getSingleCourse(courseId)
      this.authors$ = this.coursesStoreService.authors$;
    });
  }

  onBackClick(): void {
    this.router.navigate([NAV_ROUTES.COURSES])
  }
}
