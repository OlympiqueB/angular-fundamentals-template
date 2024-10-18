import { ButtonLabelService } from "./services/button-label.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionStorageService } from "./auth/services/session-storage.service";
import { NAV_ROUTES } from "./app-routing.module";
import { UserStateFacade } from "./store/user/user.facade";
import { AuthStateFacade } from "./store/auth/auth.facade";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "courses-app";
  isAuth$ = this.authFacade.isAuthorised$;
  userName$ = this.userFacade.name$;

  constructor(
    protected buttonLabelService: ButtonLabelService,
    protected router: Router,
    protected authFacade: AuthStateFacade,
    private userFacade: UserStateFacade,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    if (this.sessionStorageService.getToken()) {
      this.userFacade.getUser();
    }
  }

  onLogoutClick() {
    this.isAuth$.subscribe((isAuthorised: boolean) => {
      if (isAuthorised) {
        this.authFacade.logout();
      } else {
        this.router.navigate([NAV_ROUTES.LOGIN]);
      }
    });
  }
}
