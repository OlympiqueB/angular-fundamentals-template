import { Component, Input } from "@angular/core";
import { CourseModel } from "@app/shared/models/course.model";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses?: CourseModel[];
  @Input() editable?: boolean = false;
}
