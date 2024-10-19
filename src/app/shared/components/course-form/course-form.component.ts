import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NAV_ROUTES } from "@app/app-routing.module";
import { ButtonLabelService } from "@app/services/button-label.service";
import { AuthorModel } from "@app/shared/models/author.model";
import { CourseModel } from "@app/shared/models/course.model";
import { AuthorsStateFacade } from "@app/store/authors/authors.facade";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { distinctUntilChanged, of, switchMap } from "rxjs";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    public buttonLabelService: ButtonLabelService,
    private coursesFacade: CoursesStateFacade,
    private authorsFacade: AuthorsStateFacade
  ) {
    this.library.addIconPacks(fas);
  }

  courseForm!: FormGroup;
  submitted: boolean = false;
  newAuthorSubmitted: boolean = false;

  authors$ = this.authorsFacade.allAuthors$;
  courseAuthors$ = this.authorsFacade.courseAuthors$;

  courseId: string = "";
  course$ = this.coursesFacade.course$;
  isSingleCourseLoading$ = this.coursesFacade.isSingleCourseLoading$;

  ngOnInit(): void {
    this.buildForm();

    this.route.params
      .pipe(
        switchMap((params) => {
          const courseId = params["id"];
          if (courseId) {
            this.coursesFacade.getSingleCourse(courseId);
            return this.course$;
          }
          return of(null);
        })
      )
      .subscribe((course: CourseModel | null) => {
        if (course) {
          this.courseId = course.id;
          this.populateForm(course);
        }
      });
  }

  buildForm() {
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
  }

  populateForm(course: CourseModel): void {
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
    });

    this.authors.clear();

    course.authors.forEach((authorId: string) => {
      this.authorsFacade.addAuthorToCourse(authorId);
    });

    this.courseAuthors$
      .pipe(distinctUntilChanged())
      .subscribe((authors: AuthorModel[]) => {
        this.authors.clear();
        authors.forEach((author) => this.authors.push(this.fb.control(author)));
      });
  }

  onCourseSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      const newCourse: CourseModel = {
        id: "",
        title: this.title?.value,
        description: this.description?.value,
        creationDate: new Date().toDateString(),
        duration: Number(this.duration?.value),
        authors: this.authors.value.map((a: AuthorModel) => a.id),
      };

      if (this.courseId) {
        this.coursesFacade.editCourse(
          {
            ...newCourse,
            id: this.courseId,
          },
          this.courseId
        );
      } else {
        this.coursesFacade.createCourse(newCourse);
      }
    } else {
      this.courseForm.markAllAsTouched();
      this.author.reset();
    }
  }

  onNewAuthorSubmit() {
    this.newAuthorSubmitted = true;

    if (this.newAuthor?.valid && this.newAuthor.value) {
      this.authorsFacade.createAuthor(this.newAuthor.value);
      this.authorsFacade.getAllAuthors();

      this.author.reset();
      this.newAuthorSubmitted = false;
    }
  }

  onAddAuthorClick(id: string, author?: AuthorModel) {
    this.authorsFacade.addAuthorToCourse(id);
  }

  onRemoveAuthorClick(author: AuthorModel) {
    this.authorsFacade.removeAuthorFromCourse(author);
  }

  onCancelClick(): void {
    this.router.navigate([NAV_ROUTES.COURSES]);
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
