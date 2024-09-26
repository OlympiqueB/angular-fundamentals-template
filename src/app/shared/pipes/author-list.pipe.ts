import { Pipe } from "@angular/core";
import { mockedAuthorsList } from "../mocks/mocks";

@Pipe({
  name: "authorList",
})
export class AuthorListPipe {
  transform(authorList: string[]) {
    const authorsNames: string[] = [];

    authorList.forEach((authorId) => {
      const author = mockedAuthorsList.find((author) => author.id === authorId);
      if (author) authorsNames.push(author.name);
    });

    return authorsNames.join(", ");
  }
}
