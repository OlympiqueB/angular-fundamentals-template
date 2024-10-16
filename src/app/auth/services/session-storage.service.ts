import { Inject, Injectable, InjectionToken } from "@angular/core";

const TOKEN = "SESSION_TOKEN";

const WINDOW = new InjectionToken<Window>("WindowToken", {
  providedIn: "root",
  factory: () => window,
});

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string) {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
