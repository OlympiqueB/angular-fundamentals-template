import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { RegistrationRoutingModule } from "./registration-routing.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RegistrationRoutingModule],
  exports: [],
})
export class RegistrationModule {}
