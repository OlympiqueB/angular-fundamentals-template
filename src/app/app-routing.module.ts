import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";

export const routes: Routes = [
  { path: "", redirectTo: "courses", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./features/registration/registration.module").then(
        (m) => m.RegistrationModule
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  // {
  //   path: "courses/add",
  //   loadChildren: () =>
  //     import("./shared/shared.module").then((m) => m.SharedModule),
  // },
  // {
  //   path: "courses/:id",
  //   loadChildren: () =>
  //     import("./shared/shared.module").then((m) => m.SharedModule),
  // },
  // {
  //   path: "courses/edit/:id",
  //   loadChildren: () =>
  //     import("./shared/shared.module").then((m) => m.SharedModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
