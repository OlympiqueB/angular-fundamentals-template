import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROUTES } from '@app/app-routing.module';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUser() {
    return this.http.get(`${environment.BASE_URL}/${API_ROUTES.USERS_ME}`);
  }
}
