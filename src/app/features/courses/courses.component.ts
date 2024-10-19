import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { ButtonLabelService } from "@app/services/button-label.service";
import { Component, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Router } from "@angular/router";
import { NAV_ROUTES } from "@app/app-routing.module";
import { UserStateFacade } from '@app/store/user/user.facade';

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private coursesStoreService: CoursesStoreService,
    private coursesFacade :CoursesStateFacade,
    protected buttonLabelService: ButtonLabelService,
    private router: Router,
    private userFacade: UserStateFacade
  ) {}
  courses$ = this.coursesFacade.allCourses$;
  isAllCoursesLoading$ = this.coursesFacade.isAllCoursesLoading$;
  userRole$ = this.userFacade.role$;

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
    this.coursesStoreService.getAllAuthors();
  }

  onNewCourseClick(): void {
    this.router.navigate([NAV_ROUTES.COURSES_ADD]);
  }
}
