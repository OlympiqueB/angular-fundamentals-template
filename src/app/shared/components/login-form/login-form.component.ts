import { Component, ViewChild } from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginUserModel } from "@app/auth/models/login.model";
import { ButtonLabelService } from "@app/services/button-label.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconName } from "@fortawesome/free-solid-svg-icons";
import { NAV_ROUTES } from "@app/app-routing.module";
import { UserStateFacade } from "@app/store/user/user.facade";
import { AuthStateFacade } from "@app/store/auth/auth.facade";

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
    private library: FaIconLibrary,
    private router: Router,
    private authFacade: AuthStateFacade,
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
      this.authFacade.login(loginUser);
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
