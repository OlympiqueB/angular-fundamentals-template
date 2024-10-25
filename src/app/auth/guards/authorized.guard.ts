import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { catchError, map, Observable, of, take } from "rxjs";
import { AuthStateFacade } from "@app/store/auth/auth.facade";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authFacade: AuthStateFacade, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.authFacade.isAuthorised$.pipe(
      take(1),
      map((isAuthorised: boolean) => {
        if (isAuthorised) {
          return true;
        } else {
          return this.router.createUrlTree(["/login"]);
        }
      }),
      catchError(() => of(this.router.createUrlTree(["/courses"])))
    );
  }
}
