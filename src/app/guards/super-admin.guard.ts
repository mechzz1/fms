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
 *  decorator specifies that Angular can use this class in the DI system and  providedIn: 'root' is the meta data
 */
@Injectable({
  providedIn: "root",
})
export class SuperAdminGuard implements CanActivate {
  /**
   *
   * @param router to navigate through the pages in app
   * @param tokenStorage to access the token storage service
   */
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  /**
   * function to determine only super admin cann access any part of program
   * @returns provides back some value and stops the function call
   */
  canActivate() {
    let token = this.tokenStorage.getToken();

    if (this.tokenStorage.getTokenRole(token) == "Admin") {
      return false;
    }
    if (this.tokenStorage.isTokenExpired()) {
      this.router.navigate([""]);
      return false;
    }
    if (this.tokenStorage.getTokenRole(token) == "Super Admin") {
      return true;
    }
    return false;
  }
}
