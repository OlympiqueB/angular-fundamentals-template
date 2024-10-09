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
    TRASH_CAN: "trash-can",
    PENCIL: "pencil",
    CREATE_COURSE: "Create Course",
    CANCEL: "Cancel",
    SEARCH: "Search",
    EYE: 'eye',
    EYE_SLASH: 'eye-slash'
  };

  getLabel(key: string): string {
    return this.ButtonLabels[key] || "Default";
  }
}
