import { Component, ViewChild } from "@angular/core";
import { NgControl, NgForm } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginUser = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.loginForm.resetForm();
    }
  }

  isInvalid(control: any): NgControl {
    return control.invalid && (control.touched || this.submitted);
  }
}
