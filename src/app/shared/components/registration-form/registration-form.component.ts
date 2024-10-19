import { AuthStateFacade } from "./../../../store/auth/auth.facade";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegistrationUserModel } from "@app/auth/models/registation.model";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(
    private authFacade: AuthStateFacade,
  ) {}

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
      const newUser: RegistrationUserModel = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
      };
      this.authFacade.register(newUser);
    }
  }

  isInvalid(control: FormControl | null): boolean {
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  get name() {
    return this.registrationForm.get("name") as FormControl;
  }
  get email() {
    return this.registrationForm.get("email") as FormControl;
  }
  get password() {
    return this.registrationForm.get("password") as FormControl;
  }
}
