import { Component, Input } from "@angular/core";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CourseModel } from "@app/shared/models/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() course!: CourseModel;
  backLabel!: string;

  constructor(private buttonLabelService: ButtonLabelService) {
    this.backLabel = this.buttonLabelService.getLabel("BACK");
  }
}
