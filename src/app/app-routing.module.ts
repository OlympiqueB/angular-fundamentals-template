import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./features/registration/registration.module").then((m) => m.RegistrationModule),
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
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
