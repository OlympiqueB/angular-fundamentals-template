import { Component, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CoursesStoreService } from "@app/services/courses-store.service";

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
    private coursesStoreService: CoursesStoreService,
  ) {}

  filterCourses() {
    if (this.searchForm.value.searchInput.trim() === "") {
      this.coursesStoreService.getAll();
    } else {
      this.coursesStoreService.filterCourses(this.searchForm.value.searchInput);
    }
  }
  
  // @Output() search?: string;
}
