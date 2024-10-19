import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from "@app/app.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesService } from "@app/services/courses.service";
import { ButtonLabelService } from "./services/button-label.service";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects, reducers } from "./store";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    HttpClientModule,
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
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
