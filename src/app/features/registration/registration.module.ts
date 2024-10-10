import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistrationComponent } from "./registration.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, SharedModule],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
