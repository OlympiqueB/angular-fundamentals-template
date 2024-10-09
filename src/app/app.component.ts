import { ButtonLabelService } from "./services/button-label.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  constructor(protected buttonLabelService: ButtonLabelService) {}
}
