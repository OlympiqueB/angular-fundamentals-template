import { Component, Input, Output } from "@angular/core";

interface CourseModel {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

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
