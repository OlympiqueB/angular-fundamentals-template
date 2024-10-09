import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconName } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() buttonText?: string;
  @Input() iconName?: string;

  get icon() {
    return this.iconName
      ? this.library.getIconDefinition("fas", this.iconName as IconName)
      : "";
  }

  onClick(): void {
    this.clicked.emit();
  }
}
