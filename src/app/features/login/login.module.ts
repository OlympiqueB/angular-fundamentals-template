import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, LoginRoutingModule],
  exports: []
})
export class LoginModule {}
