import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUser() {
    return this.http.get(`${environment.API_BASE_URL}/${environment.API_ROUTES.USERS_ME}`);
  }
}
