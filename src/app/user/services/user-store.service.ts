import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  name$: Observable<string> = this.name$$.asObservable();
  isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    this.userService.getUser().pipe(
      tap((res: any) => {
        this.name$$.next(res.result.name);
        this.isAdmin$$.next(res.result.role === "admin");
      })
    );
  }

  get isAdmin() {
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
