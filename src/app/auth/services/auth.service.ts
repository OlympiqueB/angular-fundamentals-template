import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { LoginResponse, LoginUserModel } from "../models/login.model";
import {
  RegistrationResponse,
  RegistrationUserModel,
} from "../models/registation.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorised$$!: BehaviorSubject<boolean>;
  public isAuthorised$!: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    const isAuthorised = !!this.sessionStorageService.getToken();
    this.isAuthorised$$ = new BehaviorSubject<boolean>(isAuthorised);
    this.isAuthorised$ = this.isAuthorised$$.asObservable();
  }

  login(user: LoginUserModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.API_BASE_URL}/${environment.API_ROUTES.LOGIN}`, user).pipe(
      tap((response: LoginResponse) => {
        if (response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorised$$.next(true);
        }
      })
    );
  }

  logout() {
    return this.http
      .delete(`${environment.API_BASE_URL}/${environment.API_ROUTES.LOGOUT}`, {
        headers: {
          Authorization: this.sessionStorageService.getToken()!,
          skipAuthInterceptor: "true",
        },
      })
      .pipe(
        tap(() => {
          this.sessionStorageService.deleteToken();
          this.isAuthorised$$.next(false);
        })
      );
  }

  register(user: RegistrationUserModel) {
    return this.http.post<RegistrationResponse>(`${environment.API_BASE_URL}/${environment.API_ROUTES.REGISTER}`, user);
  }

  get isAuthorised() {
    const token = this.sessionStorageService.getToken();
    const isAuthorised = !!token;
    if (this.isAuthorised$$.value !== isAuthorised) {
      this.isAuthorised$$.next(isAuthorised);
    }
    return isAuthorised;
  }
}
