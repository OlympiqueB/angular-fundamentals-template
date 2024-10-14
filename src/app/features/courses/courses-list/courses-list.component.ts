import { CoursesStoreService } from "./../../../services/courses-store.service";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CourseModel } from "@app/shared/models/course.model";
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
    protected router: Router,
    protected userStoreService: UserStoreService,
    private coursesStoreService: CoursesStoreService
  ) {}

  deleteCourse(id: string) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (isConfirmed) {
      this.coursesStoreService.deleteCourse(id);
    }
  }

  onEditClick(id: string) {
    this.router.navigate(["/courses/edit", id]);
  }

  onShowClick(id: string) {
    this.router.navigate(['/courses', id])
  }
}
