import { ButtonLabelService } from "./services/button-label.service";
import { Component } from "@angular/core";
import { UserStoreService } from "./user/services/user-store.service";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";
import { SessionStorageService } from "./auth/services/session-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  constructor(
    protected buttonLabelService: ButtonLabelService,
    public router: Router,
    public userStoreService: UserStoreService,
    public authService: AuthService,
    private sessionStorageService: SessionStorageService
  ) {
    if (this.sessionStorageService.getToken()) {
      this.userStoreService.getUser();
    }
  }

  onLogoutClick() {
    if (this.authService.isAuthorised) {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.error("Logout error: ", error);
        },
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
