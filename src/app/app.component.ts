import { ButtonLabelService } from "./services/button-label.service";
import { mockedCoursesList } from "./shared/mocks/mocks";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  mockedCoursesList = mockedCoursesList;

  loginButtonLabel!: string;
  newCourseButtonLabel!: string;

  constructor(private buttonLabelService: ButtonLabelService) {
    this.loginButtonLabel = this.buttonLabelService.getLabel("LOGIN");
    this.newCourseButtonLabel = this.buttonLabelService.getLabel("NEW_COURSE");
  }
}
