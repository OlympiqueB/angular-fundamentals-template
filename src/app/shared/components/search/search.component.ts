import { Component, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder?: string;
  @ViewChild("searchForm") public searchForm!: NgForm;

  searchResults: any[] = [];

  constructor(
    public buttonLabelService: ButtonLabelService,
    private coursesFacade: CoursesStateFacade
  ) {}

  filterCourses() {
    if (this.searchForm.value.searchInput.trim() === "") {
      this.coursesFacade.getAllCourses();
    } else {
      this.coursesFacade.getFilteredCourses(this.searchForm.value.searchInput);
    }
  }
}
