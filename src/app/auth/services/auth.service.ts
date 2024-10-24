import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { LoginResponse, LoginUserModel } from "../models/login.model";
import {
  RegistrationResponse,
  RegistrationUserModel,
} from "../models/registation.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  login(user: LoginUserModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.LOGIN}`,
      user
    );
  }

  logout() {
    return this.http.delete(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.LOGOUT}`,
      {
        headers: {
          Authorization: this.sessionStorageService.getToken()!,
          skipAuthInterceptor: "true",
        },
      }
    );
  }

  register(user: RegistrationUserModel) {
    return this.http.post<RegistrationResponse>(
      `${environment.API_BASE_URL}/${environment.API_ROUTES.REGISTER}`,
      user
    );
  }
}
