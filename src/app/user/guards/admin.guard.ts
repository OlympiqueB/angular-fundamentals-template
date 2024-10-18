import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { catchError, map, Observable, of, take } from "rxjs";
import { UserStateFacade } from "@app/store/user/user.facade";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private userFacade: UserStateFacade, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userFacade.role$.pipe(
      take(1),
      map((userRole) => {
        if (userRole && userRole === "admin") {
          return true;
        } else {
          return this.router.createUrlTree(["/courses"]);
        }
      }),
      catchError(() => of(this.router.createUrlTree(["/courses"])))
    );
  }
}
