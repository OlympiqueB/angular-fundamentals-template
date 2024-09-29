import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log(this.registrationForm);
      console.log("Name:", this.name);
      console.log("Email:", this.email);
      console.log("Password:", this.password);
    } else {
      console.log(this.registrationForm);

      console.log("Form is invalid");
    }
  }

  onRegistrateClick() {
    const form = document.querySelector("form");
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    form?.dispatchEvent(submitEvent);
  }

  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
}
