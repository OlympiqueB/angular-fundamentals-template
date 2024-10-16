import { ButtonLabelService } from "./services/button-label.service";
import { Component } from "@angular/core";
import { UserStoreService } from "./user/services/user-store.service";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";
import { SessionStorageService } from "./auth/services/session-storage.service";
import { NAV_ROUTES } from "./app-routing.module";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  isAuth: boolean = false;

  constructor(
    protected buttonLabelService: ButtonLabelService,
    protected router: Router,
    protected userStoreService: UserStoreService,
    protected authService: AuthService,
    private sessionStorageService: SessionStorageService
  ) {
    this.authService.isAuthorised$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });

    if (this.sessionStorageService.getToken()) {
      this.userStoreService.getUser();
    }
  }

  onLogoutClick() {
    if (this.authService.isAuthorised) {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate([NAV_ROUTES.LOGIN]);
        },
        error: (err) => {
          this.sessionStorageService.deleteToken();
          this.router.navigate([NAV_ROUTES.LOGIN]);
        },
      });
    } else {
      this.router.navigate([NAV_ROUTES.LOGIN]);
    }
  }
}
