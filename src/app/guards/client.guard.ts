import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../auth/token-storage.service";
/**
 * It is a decorator that marks a class as available to be provided and injected as a dependency.
 */
@Injectable({
  providedIn: "root",
})
export class ClientGuard implements CanActivate {
  /**
   * This is our contructor
   * @param router  It is a parameter of a service that provides navigation among views and URL manipulation capabilities.
   * @param tokenStorage It is a parameter of tokenstorage services
   */
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  /**
   * function to determine only client cann access any part of program
   * @returns provides back some value and stops the function call
   */
  canActivate() {
    let token = this.tokenStorage.getToken();

    if (this.tokenStorage.getTokenRole(token) == "Admin") {
      return false;
    }
    if (this.tokenStorage.getTokenRole(token) == "Super Admin") {
      return false;
    }
    if (this.tokenStorage.getTokenRole(token) == "Client") {
      return true;
    }
    if (this.tokenStorage.isTokenExpired()) {
      this.router.navigate(["side-panel"]);
      return false;
    }
    return false;
  }
}
