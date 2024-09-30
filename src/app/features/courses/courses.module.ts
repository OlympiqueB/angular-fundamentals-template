import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';

const components = [CoursesComponent, CoursesListComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [components],
})
export class CoursesModule { }
