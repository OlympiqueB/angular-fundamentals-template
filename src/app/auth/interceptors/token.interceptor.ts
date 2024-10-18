import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { SessionStorageService } from "../services/session-storage.service";
import { catchError, Observable, throwError } from "rxjs";
import { AuthStateFacade } from "@app/store/auth/auth.facade";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authFacade: AuthStateFacade,
    private sessionStorageService: SessionStorageService,
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
          this.authFacade.logout();
        }
        return throwError(error);
      })
    );
  }
}
