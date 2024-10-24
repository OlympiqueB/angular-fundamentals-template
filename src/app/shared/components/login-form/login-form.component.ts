import { UserStoreService } from "@app/user/services/user-store.service";
import { Component, ViewChild } from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginUserModel } from "@app/auth/models/login.model";
import { AuthService } from "@app/auth/services/auth.service";
import { ButtonLabelService } from "@app/services/button-label.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconName } from "@fortawesome/free-solid-svg-icons";
import { NAV_ROUTES } from "@app/app-routing.module";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  submitted = false;

  constructor(
    public buttonLabelService: ButtonLabelService,
    private authService: AuthService,
    private library: FaIconLibrary,
    private router: Router,
    private userStoreService: UserStoreService
  ) {
    library.addIconPacks(fas);
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginUser: LoginUserModel = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(loginUser).subscribe(
        () => {
          this.userStoreService.getUser();
          this.router.navigate([NAV_ROUTES.COURSES]);
        },
        (error) => {
          console.error("Login failed", error);
        }
      );
    }
  }

  isInvalid(control: any): NgControl {
    return control.invalid && (control.touched || this.submitted);
  }

  icon(iconName: string) {
    return this.library.getIconDefinition("fas", iconName as IconName);
  }

  onRegistrateClick() {
    this.router.navigate([NAV_ROUTES.REGISTRATION]);
  }
}
