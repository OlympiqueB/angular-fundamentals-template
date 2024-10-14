import { Observable } from 'rxjs';
import { Component, Input } from "@angular/core";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CourseModel } from "@app/shared/models/course.model";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses?: Observable<any[]>;
  @Input() editable?: boolean = false;

  constructor(protected buttonLabelService: ButtonLabelService) {}
}
