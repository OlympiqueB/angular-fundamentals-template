import { Component, ViewChild } from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";
import { ButtonLabelService } from "@app/services/button-label.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconName } from "@fortawesome/free-solid-svg-icons";

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
    private library: FaIconLibrary
  ) {
    {
      library.addIconPacks(fas);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginUser = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.loginForm.resetForm();
      this.submitted = false;
    }
  }

  isInvalid(control: any): NgControl {
    return control.invalid && (control.touched || this.submitted);
  }

  icon(iconName: string) {
    return this.library.getIconDefinition("fas", iconName as IconName);
  }
}
