import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from "./services/user.service";
import { AdminGuard } from "./guards/admin.guard";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        UserService,
        AdminGuard
    ]
})
export class UserModule { }
