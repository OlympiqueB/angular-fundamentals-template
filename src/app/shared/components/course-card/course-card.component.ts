import { Component, Input, Output } from "@angular/core";
import { CourseModel } from "@app/shared/models/course.model";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() courseObject!: CourseModel;
  @Input() isEditable?: boolean = true;

  // @Output() clickOnShow;
}
