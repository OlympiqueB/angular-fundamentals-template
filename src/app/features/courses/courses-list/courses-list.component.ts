import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NAV_ROUTES } from "@app/app-routing.module";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CourseModel } from "@app/shared/models/course.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses$!: Observable<CourseModel[]>;
  @Input() editable?: boolean = false;

  constructor(
    protected buttonLabelService: ButtonLabelService,
    private router: Router,
    protected userStoreService: UserStoreService,
    private coursesFacade: CoursesStateFacade,
  ) {}

  deleteCourse(id: string) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (isConfirmed) {
      this.coursesFacade.deleteCourse(id);
    }
  }

  onEditClick(id: string) {
    this.router.navigate([NAV_ROUTES.COURSES_EDIT, id]);
  }

  onShowClick(id: string) {
    this.router.navigate([NAV_ROUTES.COURSES, id])
  }
}
