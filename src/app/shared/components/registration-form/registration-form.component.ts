import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

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
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      console.log(newUser);

      this.registrationForm.reset();
      this.submitted = false;
    } else {
      console.log("Form is invalid");
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
