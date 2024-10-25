import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { catchError, map, Observable, of, take } from "rxjs";
import { AuthStateFacade } from "@app/store/auth/auth.facade";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private authFacade: AuthStateFacade, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.isAuthorised$.pipe(
      take(1),
      map((isAuthorised) => {
        if (!isAuthorised) {
          return true;
        } else {
          return this.router.createUrlTree(["/courses"]);
        }
      }),
      catchError(() => of(this.router.createUrlTree(["/courses"])))
    );
  }
}
