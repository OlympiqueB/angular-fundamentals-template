import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonLabelService } from "@app/services/button-label.service";
import { NAV_ROUTES } from "@app/app-routing.module";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { AuthorsStateFacade } from "@app/store/authors/authors.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course$ = this.coursesFacade.course$;
  authors$ = this.authorsFacade.allAuthors$;
  isSingleCourseLoading$ = this.coursesFacade.isSingleCourseLoading$;

  constructor(
    public buttonLabelService: ButtonLabelService,
    private router: Router,
    private authorsFacade: AuthorsStateFacade,
    private coursesFacade: CoursesStateFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params["id"];
      this.coursesFacade.getSingleCourse(courseId);
      this.authorsFacade.getAllAuthors();
    });
  }

  onBackClick(): void {
    this.router.navigate([NAV_ROUTES.COURSES])
  }
}
