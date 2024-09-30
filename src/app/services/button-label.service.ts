import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ButtonLabelService {
  private ButtonLabels: { [key: string]: string } = {
    BACK: "Back",
    LOGIN: "Login",
    NEW_COURSE: "Add New Course",
    SHOW_COURSE: "Show Course",
  };

  getLabel(key: string): string {
    return this.ButtonLabels[key] || "Default";
  }
}
