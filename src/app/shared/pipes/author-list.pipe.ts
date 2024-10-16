import { Pipe } from "@angular/core";
import { AuthorModel } from "../models/author.model";

@Pipe({
  name: "authorList",
})
export class AuthorListPipe {
  transform(authorList: string[], authors: AuthorModel[]) {
    const authorsNames: string[] = [];
    authorList.forEach((authorId) => {
      const author = authors.find((author) => author.id === authorId);
      if (author) authorsNames.push(author.name);
    });
    return authorsNames.join(", ");
  }
}
