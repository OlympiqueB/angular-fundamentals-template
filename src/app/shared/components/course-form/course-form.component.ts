import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ButtonLabelService } from "@app/services/button-label.service";
import { mockedAuthorsList } from "@app/shared/mocks/mocks";
import { AuthorModel } from "@app/shared/models/author.model";
import { CourseModel } from "@app/shared/models/course.model";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
    public buttonLabelService: ButtonLabelService
  ) {
    library.addIconPacks(fas);
  }

  courseForm!: FormGroup;
  fullAuthorArray!: AuthorModel[];
  courseAuthorArray!: AuthorModel[];
  submitted = false;
  newAuthorSubmitted = false;

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: new FormControl("", [
        Validators.minLength(2),
        Validators.required,
      ]),
      description: new FormControl("", [
        Validators.minLength(2),
        Validators.required,
      ]),
      duration: new FormControl("", [Validators.required]),
      author: new FormGroup({
        newAuthor: new FormControl("", [
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z0-9]+$/),
        ]),
      }),
      authors: new FormArray([]),
    });

    this.courseAuthorArray = [];
    this.fullAuthorArray = mockedAuthorsList;
  }

  onCourseSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      const newCourse: CourseModel = {
        id: uuidv4(),
        title: this.title?.value,
        description: this.description?.value,
        creationDate: new Date().toDateString(),
        duration: this.duration?.value,
        authors: this.authors.value,
      };

      this.courseForm.reset();
      this.submitted = false;
      this.courseAuthorArray = [];
      this.fullAuthorArray = mockedAuthorsList;
    } else {
      this.courseForm.markAllAsTouched();
      this.author.reset();
    }
  }

  onNewAuthorSubmit() {
    this.newAuthorSubmitted = true;

    if (this.newAuthor?.valid && this.newAuthor.value) {
      const newAuthor: AuthorModel = {
        id: uuidv4(),
        name: this.newAuthor.value,
      };
      this.fullAuthorArray.push(newAuthor);

      this.author.reset();
      this.newAuthorSubmitted = false;
    }
  }

  onAddAuthorClick(author: AuthorModel) {
    this.courseAuthorArray.push(author);
    this.authors.push(this.fb.control(author));

    this.fullAuthorArray = this.fullAuthorArray.filter(
      (a) => a.id !== author.id
    );
  }

  onRemoveAuthorClick(author: AuthorModel) {
    const index = this.courseAuthorArray.findIndex((a) => a.id === author.id);
    this.courseAuthorArray = this.courseAuthorArray.filter(
      (a) => a.id !== author.id
    );
    this.authors.removeAt(index);

    this.fullAuthorArray.push(author);
  }

  get title() {
    return this.courseForm.get("title");
  }

  get description() {
    return this.courseForm.get("description");
  }

  get newAuthor() {
    return this.courseForm.get("author.newAuthor");
  }

  get authors() {
    return this.courseForm.get("authors") as FormArray;
  }

  get author() {
    return this.courseForm.get("author") as FormGroup;
  }

  get duration() {
    return this.courseForm.get("duration");
  }
}
