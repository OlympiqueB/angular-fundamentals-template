import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: new FormControl('', [Validators.minLength(2), Validators.required]),
      description: new FormControl('', [Validators.minLength(2), Validators.required]),
      author: new FormControl('', [Validators.minLength(2), Validators.required]),
      authors: new FormArray([]),
      duration: new FormControl('', [Validators.required]),
    })
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get author() {
    return this.courseForm.get('author');
  }

  get duration() {
    return this.courseForm.get('duration');
  }
}
