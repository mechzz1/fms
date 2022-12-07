import { Injectable, Injector, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
/**
 * It is a decorator that marks a class as available to be provided and injected as a dependency.
 */
@Injectable({
  providedIn: "root",
})
export class AuthErrorHandlerService implements ErrorHandler {
  /**
   * this is the parameter constructor
   * @param injector it is a parameter of Injector that associate dependencies of various types with injection tokens.
   */
  constructor(private injector: Injector) {}
  /**
   * This function handles eroor if they occur
   * @param error this is our error parameter of type any
   */
  handleError(error: any) {
    const router = this.injector.get(Router);
    // if (error.rejection.status === 401 || error.rejection.status === 403) {
    //   // router.navigate(['']);
    // }

    throw error;
  }
}
