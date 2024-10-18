import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { UserStateFacade } from "@app/store/user/user.facade";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private userFacade: UserStateFacade,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const userRole = await firstValueFrom(this.userFacade.role$);

    if (userRole === 'admin') {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
