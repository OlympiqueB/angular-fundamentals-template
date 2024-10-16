import { Component, Input, OnInit, Output } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { AuthorModel } from "@app/shared/models/author.model";
import { CourseModel } from "@app/shared/models/course.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent implements OnInit {
  @Input() courseObject!: CourseModel;
  @Input() isEditable?: boolean = true;

  authors$!: Observable<AuthorModel[]>;

  constructor(private coursesStoreService: CoursesStoreService) {}

  ngOnInit(): void {
    this.authors$ = this.coursesStoreService.authors$;
  }
  // @Output() clickOnShow;
}
