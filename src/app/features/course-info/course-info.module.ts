import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesInfoRoutingModule } from './courses-info-routing.module';

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoursesInfoRoutingModule
  ],
  exports: [CourseInfoComponent]
})
export class CourseInfoModule { }
