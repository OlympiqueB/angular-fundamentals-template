import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseFormRoutingModule } from "./course-form-routing.module";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, CourseFormRoutingModule],
})
export class CourseFormModule {}
