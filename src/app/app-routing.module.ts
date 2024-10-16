import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

export const NAV_ROUTES = {
  LOGIN: "login",
  REGISTRATION: "registration",
  COURSES: "courses",
  COURSES_ADD: "courses/add",
  COURSES_EDIT: "courses/edit",
};

export const routes: Routes = [
  {
    path: NAV_ROUTES.LOGIN,
    loadChildren: () =>
      import("./features/login/login.module").then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: NAV_ROUTES.REGISTRATION,
    loadChildren: () =>
      import("./features/registration/registration.module").then(
        (m) => m.RegistrationModule
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: NAV_ROUTES.COURSES,
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: NAV_ROUTES.COURSES_ADD,
    loadChildren: () =>
      import("./features/course-form/course-form.module").then(
        (m) => m.CourseFormModule
      ),
    canActivate: [AdminGuard],
    canLoad: [AuthorizedGuard],
  },
  {
    path: `${NAV_ROUTES.COURSES}/:id`,
    loadChildren: () =>
      import("./features/course-info/course-info.module").then(
        (m) => m.CourseInfoModule
      ),
    canLoad: [AuthorizedGuard],
  },
  {
    path: `${NAV_ROUTES.COURSES_EDIT}/:id`,
    loadChildren: () =>
      import("./features/course-form/course-form.module").then(
        (m) => m.CourseFormModule
      ),
    canActivate: [AdminGuard],
    canLoad: [AuthorizedGuard],
  },
  {
    path: "**",
    redirectTo: NAV_ROUTES.COURSES,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
