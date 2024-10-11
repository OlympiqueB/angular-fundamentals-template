import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "@app/baseurl";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUser() {
    return this.http.get(BASE_URL + "/users/me");
  }
}
