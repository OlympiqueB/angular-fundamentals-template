import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from "@app/app.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";
import { CoursesModule } from "./features/courses/courses.module";
import { CourseInfoModule } from "./features/course-info/course-info.module";
import { ButtonLabelService } from "./services/button-label.service";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    CoursesModule,
    CourseInfoModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    ButtonLabelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
