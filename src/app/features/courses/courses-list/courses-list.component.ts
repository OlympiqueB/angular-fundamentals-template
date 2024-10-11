import { Component, Input } from "@angular/core";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CourseModel } from "@app/shared/models/course.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses$!: Observable<CourseModel[]>;
  @Input() editable?: boolean = false;

  constructor(protected buttonLabelService: ButtonLabelService) {}
}
