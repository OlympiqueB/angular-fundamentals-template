import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { SessionStorageService } from "../services/session-storage.service";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { NAV_ROUTES } from "@app/app-routing.module";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sessionStorageService.getToken();
    let authReq = req;
    
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.headers.has('skipAuthInterceptor')) {
          this.authService.logout().subscribe(() => {
            this.router.navigate([NAV_ROUTES.LOGIN]);
          });
        }
        return throwError(error);
      })
    );
  }
}
