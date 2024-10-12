import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
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
  {
    path: "courses/add",
    loadChildren: () =>
      import("./features/course-form/course-form.module").then(
        (m) => m.CourseFormModule
      ),
    canActivate: [AdminGuard],
    canLoad: [AuthorizedGuard],
  },
  {
    path: "courses/:id",
    loadChildren: () =>
      import("./features/course-info/course-info.module").then(
        (m) => m.CourseInfoModule
      ),
    canLoad: [AuthorizedGuard],
  },
  {
    path: "courses/edit/:id",
    loadChildren: () =>
      import("./features/course-form/course-form.module").then(
        (m) => m.CourseFormModule
      ),
    canActivate: [AdminGuard],
    canLoad: [AuthorizedGuard],
  },
  {
    path: "**",
    redirectTo: "courses",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
