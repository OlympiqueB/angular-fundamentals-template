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
    return this.http.post<LoginResponse>(environment.BASE_URL + "/login", user).pipe(
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
      .delete(environment.BASE_URL + "/logout", {
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
    return this.http.post<RegistrationResponse>(environment.BASE_URL + "/register", user);
  }

  get isAuthorised() {
    const token = this.sessionStorageService.getToken();
    const isAuthorised = !!token;
    if (this.isAuthorised$$.value !== isAuthorised) {
      this.isAuthorised$$.next(isAuthorised);
    }
    return isAuthorised;
  }

  getLoginUrl() {
    // Add your code here
  }
}
