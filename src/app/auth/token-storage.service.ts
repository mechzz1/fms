/**
 *This is the Token Storage Service
 */
import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
/**
 * This is the constant variable of Token
 */
const TOKEN_KEY = "AuthToken";
/**
 * This is the constant variable of Email
 *
 */
const EMAIL_KEY = "AuthEmail";
/**
 * This is the constant variable CONSISTS OF FILE KEY
 *
 */
const File_KEY = "AuthFile";
/**
 * This is the constant variable of Event
 *
 */
const EVENT_KEY = "AuthEvent";
/**
 * This Injectable ensures that the compiler will generate the necessary metadata to create the class's dependencies when the class is injected
 */
@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  /**
   * This is the constructor of token storage services
   */
  constructor() {}
  /**
   *This function clears user session
   */
  signOut() {
    window.sessionStorage.clear();
  }

  /**
   *This function save token on client side
   * @param token This is the token value obtained from backend
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   *This function obtains token from session storage
   * @returns
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   *This function saves user email
   * @param email This is the value of email
   */
  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  /**
   * This function obtains email from session storage
   * @returns
   */
  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }
  /**
   *This function saves event occured
   * @param event
   */
  public saveEvent(event: string) {
    window.sessionStorage.removeItem(EVENT_KEY);
    window.sessionStorage.setItem(EVENT_KEY, event);
  }

  /**
   *This function gets event occured
   * @returns
   */
  public getEvent(): string {
    const event = sessionStorage.getItem(EVENT_KEY)
      ? sessionStorage.getItem(EVENT_KEY)
      : "";
    window.sessionStorage.removeItem(EVENT_KEY);

    return event;
  }

  /**
   *This function gets the session time a user is taking
   * @param token This contains the value of token time
   * @returns
   */
  public getTokenExpirationDate(token: string): Date {
    let decoded = {
      exp: null,
      iat: null,
      id: null,
    };
    decoded = jwt_decode(token);
    if (decoded === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  public getTokenRole(token: string): String {
    let decoded = {
      role: null,
    };
    decoded = jwt_decode(token);
    if (decoded === undefined) {
      return null;
    }

    return decoded.role;
  }
  /**
   *This functions check out that whether the user session expired
   * @param token This contains the value of token time
   * @returns
   */
  // public isTokenExpired(token?: string): boolean {
  //   if (!token) {
  //     token = this.getToken();
  //   }
  //   if (!token) {
  //     return true;
  //   }

  //   const date = this.getTokenExpirationDate(token);
  //   if (date === undefined) {
  //     return false;
  //   }
  //   // return false;
  //   return !(date.valueOf() > new Date().valueOf());
  // }
  public isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return false;
  }
  public saveFile(file: string) {
    window.sessionStorage.removeItem(File_KEY);
    window.sessionStorage.setItem(File_KEY, file);
  }

  /**
   *This function obtains token from session storage
   * @returns
   */
  public getFile(): string {
    return sessionStorage.getItem(File_KEY);
  }
}
