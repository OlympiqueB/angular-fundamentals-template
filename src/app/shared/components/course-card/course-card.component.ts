import { Component, Input, Output } from "@angular/core";
import { mockedAuthorsList } from "@app/shared/mocks/mocks";

interface CourseModel {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

interface AuthorModel {
  id: string;
  name: string;
}

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() courseObject!: CourseModel;
  @Input() isEditable?: boolean = true;

  getAuthors(authors: string[]): string {
    const authorsNames: string[] = [];

    authors.forEach((authorId) => {
      const author = mockedAuthorsList.find((author) => author.id === authorId);
      if (author) authorsNames.push(author.name);
    });

    return authorsNames.join(", ");
  }
  // @Output() clickOnShow;
}
