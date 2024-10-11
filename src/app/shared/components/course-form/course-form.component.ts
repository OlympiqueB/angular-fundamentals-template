import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ButtonLabelService } from "@app/services/button-label.service";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { AuthorModel } from "@app/shared/models/author.model";
import { CourseModel } from "@app/shared/models/course.model";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
    private coursesStoreService: CoursesStoreService,
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
          Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),
        ]),
      }),
      authors: new FormArray([]),
    });

    this.courseAuthorArray = [];
    this.coursesStoreService.getAllAuthors();
    this.coursesStoreService.authors$.subscribe({
      next: (a: any) => this.fullAuthorArray = a,
    })
  }

  onCourseSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      const newCourse: CourseModel = {
        id: '',
        title: this.title?.value,
        description: this.description?.value,
        creationDate: new Date().toDateString(),
        duration: Number(this.duration?.value),
        authors: this.authors.value.map((a: AuthorModel) => a.id),
      };
      console.log(newCourse);
      this.coursesStoreService.createCourse(newCourse);

      this.courseForm.reset();
      this.submitted = false;
      this.courseAuthorArray = [];
      this.coursesStoreService.getAllAuthors();
    } else {
      this.courseForm.markAllAsTouched();
      this.author.reset();
    }
  }

  onNewAuthorSubmit() {
    this.newAuthorSubmitted = true;

    if (this.newAuthor?.valid && this.newAuthor.value) {
      this.coursesStoreService.createAuthor(this.newAuthor.value);
      this.coursesStoreService.getAllAuthors();

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
