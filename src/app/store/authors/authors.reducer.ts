import { AuthorModel } from "@app/shared/models/author.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as AuthorsActions from "./authors.actions";

export const authorsFeatureKey = "authors";

export interface AuthorsState {
  allAuthors: AuthorModel[];
  author: AuthorModel | null;
  courseAuthors: AuthorModel[];
  isAllAuthorsLoading: boolean;
  errorMessage: any;
}

export const initialState: AuthorsState = {
  allAuthors: [],
  author: null,
  courseAuthors: [],
  isAllAuthorsLoading: false,
  errorMessage: null,
};

export const authorsReducer = createReducer(
  initialState,
  on(AuthorsActions.requestAllAuthors, (state) => ({
    ...state,
    isAllAuthorsLoading: true,
    errorMessage: null,
  })),
  on(AuthorsActions.requestAllAuthorsSuccess, (state, { authors }) => ({
    ...state,
    allAuthors: authors,
    courseAuthors: [],
    isAllAuthorsLoading: false,
  })),
  on(AuthorsActions.requestAllAuthorsFail, (state, { error }) => ({
    ...state,
    isAllAuthorsLoading: false,
    errorMessage: error,
  })),

  on(AuthorsActions.requestCreateAuthor, (state, { name }) => ({
    ...state,
    errorMessage: null,
  })),
  on(AuthorsActions.requestCreateAuthorSuccess, (state, { author }) => ({
    ...state,
    allAuthors: [...state.allAuthors, author],
    isAllAuthorsLoading: false,
  })),
  on(AuthorsActions.requestCreateAuthorFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  on(AuthorsActions.requestAddAuthorToCourse, (state, { id }) => {
    const author = state.allAuthors.find((a) => a.id === id);
    return {
      ...state,
      allAuthors: state.allAuthors.filter((a) => a.id !== id),
      courseAuthors: author
        ? [...state.courseAuthors, author]
        : state.courseAuthors,
    };
  }),
  on(AuthorsActions.requestRemoveAuthorFromCourse, (state, { author }) => ({
    ...state,
    allAuthors: [...state.allAuthors, author],
    courseAuthors: state.courseAuthors.filter((a) => a.id !== author.id),
    isAllAuthorsLoading: false,
  }))
);

export const reducer = (state: AuthorsState, action: Action): AuthorsState =>
  authorsReducer(state, action);
