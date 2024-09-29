import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Email:", this.loginForm.value.email);
      console.log("Password:", this.loginForm.value.password);
    } else {
      console.log("Form is invalid");
    }
  }

  onLoginClick() {
    const form = document.querySelector("form");
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    form?.dispatchEvent(submitEvent);
  }
}
