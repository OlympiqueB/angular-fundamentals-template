import { Component, Input } from "@angular/core";
import { CourseModel } from "@app/shared/models/course.model";
import { AuthorsStateFacade } from "@app/store/authors/authors.facade";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() courseObject!: CourseModel;
  @Input() isEditable?: boolean = true;

  authors$ = this.authorsFacade.allAuthors$;

  constructor(private authorsFacade: AuthorsStateFacade) {}
}
