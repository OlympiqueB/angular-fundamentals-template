import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import { SharedModule } from '@app/shared/shared.module';

const components = [CourseInfoComponent]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [components]
})
export class CourseInfoModule { }
