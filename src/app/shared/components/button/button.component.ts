import { Component, Input } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconName } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  private library: FaIconLibrary;

  constructor(library: FaIconLibrary) {
    this.library = library;
    library.addIconPacks(fas);
  }

  @Input() buttonText?: string;
  @Input() iconName?: string;

  get icon() {
    return this.iconName
      ? this.library.getIconDefinition("fas", this.iconName as IconName)
      : "";
  }

  // Use the names for the inputs `buttonText` and `iconName`.
}
