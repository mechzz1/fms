import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { TokenStorageService } from "./token-storage.service";

/**
 * This is a constant variable of token header
 */
const TOKEN_HEADER_KEY = "x-access-token";
/**
 * it is the decorator that marks a class as available to be provided and injected as a dependency.
 */
@Injectable()
/**
 *
 */
export class AuthInterceptor implements HttpInterceptor {
  /**
   * This is the constructor containing a token of private type.
   * @param token iT is a parameter of the token storage service
   */
  constructor(private token: TokenStorageService) {}
  /**
   * this function identifies and handles a given HTTP request.
   * @param req it is the parameter of Http Request of type any
   * @param next it is a parameter of Http Handler
   * @returns
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, token),
      });
    }
    return next.handle(authReq);
  }
}
/**
 * This is a constant variable
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
