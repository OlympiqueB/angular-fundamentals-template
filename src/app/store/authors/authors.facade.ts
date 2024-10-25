import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AuthorsState } from "./authors.reducer";
import {
  getAllAuthors,
  getCourseAuthors,
  getErrorMessage,
  isAllAuthorsLoadingSelector,
} from "./authors.selectors";
import {
  requestAddAuthorToCourse,
  requestAllAuthors,
  requestCreateAuthor,
  requestRemoveAuthorFromCourse,
} from "./authors.actions";
import { AuthorModel } from "@app/shared/models/author.model";

@Injectable({
  providedIn: "root",
})
export class AuthorsStateFacade {
  isAllAuthorsLoading$ = this.store.pipe(select(isAllAuthorsLoadingSelector));
  allAuthors$ = this.store.pipe(select(getAllAuthors));
  courseAuthors$ = this.store.pipe(select(getCourseAuthors));
  errorMessage$ = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<AuthorsState>) {}

  getAllAuthors() {
    this.store.dispatch(requestAllAuthors());
  }

  createAuthor(name: string) {
    this.store.dispatch(requestCreateAuthor({ name: name }));
  }

  addAuthorToCourse(id: string) {
    this.store.dispatch(requestAddAuthorToCourse({ id: id }));
  }

  removeAuthorFromCourse(author: AuthorModel) {
    this.store.dispatch(requestRemoveAuthorFromCourse({ author: author }));
  }
}
