import { Pipe } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { map } from "rxjs";

@Pipe({
  name: "authorList",
  pure: false,
})
export class AuthorListPipe {
  constructor(private coursesStoreService: CoursesStoreService) {}

  transform(authorList: string[]) {
    return this.coursesStoreService.authors$.pipe(
      map((authors) => {
        const authorsNames: string[] = [];
        authorList.forEach((authorId) => {
          const author = authors.find((author) => author.id === authorId);
          if (author) authorsNames.push(author.name);
        });

        return authorsNames.join(", ");
      })
    );
  }
}
