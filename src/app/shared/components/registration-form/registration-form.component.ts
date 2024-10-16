import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NAV_ROUTES } from "@app/app-routing.module";
import { RegistrationUserModel } from "@app/auth/models/registation.model";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

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

      this.authService.register(newUser).subscribe({
        next: () => this.router.navigate([NAV_ROUTES.LOGIN]),
        error: (error) => console.error("Registration error ", error),
      });
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
