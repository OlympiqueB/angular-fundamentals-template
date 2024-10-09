import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "[togglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  private _isPasswordVisible: boolean = false;

  @HostBinding("attr.type") inputType: string = "password";

  toggle(): void {
    this._isPasswordVisible = !this._isPasswordVisible;
    this.inputType = this._isPasswordVisible ? "text" : "password";
  }

  get isPasswordVisible(): boolean {
    return this._isPasswordVisible;
  }
}
