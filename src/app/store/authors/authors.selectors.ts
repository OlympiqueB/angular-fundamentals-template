import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorsState, authorsFeatureKey } from "./authors.reducer";

export const selectAuthorsState =
  createFeatureSelector<AuthorsState>(authorsFeatureKey);

export const isAllAuthorsLoadingSelector = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.isAllAuthorsLoading
);

export const getAllAuthors = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.allAuthors
);

export const getCourseAuthors = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.courseAuthors
);

export const getErrorMessage = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.errorMessage
);
