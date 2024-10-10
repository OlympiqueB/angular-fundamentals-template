import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { LoginResponse, LoginUserModel } from "../models/login.model";
import { RegistrationResponse, RegistrationUserModel } from "../models/registation.model";
import { BASE_URL } from "@app/baseurl";

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

  login(user: LoginUserModel) {
    return this.http.post<LoginResponse>(BASE_URL + "/login", user).pipe(
      tap((response: LoginResponse) => {
        if (response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorised$$.next(true);
        }
      })
    );
  }

  logout() {
    return this.http.delete(BASE_URL + "/logout").pipe(
      tap(() => {
        this.sessionStorageService.deleteToken();
        this.isAuthorised$$.next(false);
      })
    );
  }

  register(user: RegistrationUserModel) {
    return this.http.post<RegistrationResponse>(BASE_URL + "/register", user);
  }

  get isAuthorised() {
    return this.isAuthorised$$.getValue();
  }

  set isAuthorised(value: boolean) {
    this.isAuthorised$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
  }
}
