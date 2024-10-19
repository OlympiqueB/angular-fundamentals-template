import { createAction, props } from "@ngrx/store";
import { AuthorsConstants } from "./authors.constants";
import { AuthorModel } from "@app/shared/models/author.model";

export const requestAllAuthors = createAction(
  AuthorsConstants.REQUEST_ALL_AUTHORS
);
export const requestAllAuthorsSuccess = createAction(
  AuthorsConstants.REQUEST_ALL_AUTHORS_SUCCESS,
  props<{ authors: AuthorModel[] }>()
);
export const requestAllAuthorsFail = createAction(
  AuthorsConstants.REQUEST_ALL_AUTHORS_FAIL,
  props<{ error: any }>()
);

export const requestCreateAuthor = createAction(
  AuthorsConstants.REQUEST_CREATE_AUTHOR,
  props<{ name: string }>()
);
export const requestCreateAuthorSuccess = createAction(
  AuthorsConstants.REQUEST_CREATE_AUTHOR_SUCCESS,
  props<{ author: AuthorModel }>()
);
export const requestCreateAuthorFail = createAction(
  AuthorsConstants.REQUEST_CREATE_AUTHOR_FAIL,
  props<{ error: any }>()
);

export const requestAddAuthorToCourse = createAction(
  AuthorsConstants.REQUEST_ADD_AUTHOR_TO_COURSE,
  props<{ id: string }>()
);

export const requestRemoveAuthorFromCourse = createAction(
  AuthorsConstants.REQUEST_REMOVE_AUTHOR_FROM_COURSE,
  props<{ author: AuthorModel }>()
);
