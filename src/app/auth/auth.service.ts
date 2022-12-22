import { TokenStorageService } from "./token-storage.service";
import { LoginInfo } from "./../models/login-info";
// import { User } from './../models/user';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtResponse } from "./jwt-response";
import { environment } from "src/environments/environment";
/**
 * it is a variable of constant type that defines the api of request header and also get the meta data
 */
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "https://sms.innovacontents.com/api/",
    "Access-Control-Allow-Origin": environment.url,
  }),
};
/**
 * It is a Decorator that marks a class as available to be provided and injected as a dependency.
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * It is a url of an api
   */
  private baseUrl = environment.url;

  /**
   * This is our constructor
   * @param http object of http client
   * @param tokenStorage parameter of token storage service
   */
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  /**
   * This function is used to login, it stores user login credentials
   * @param credentials this parameter stores and passes user credentials
   * @returns
   */
  public authenticate(credentials: LoginInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
      }),
    };

    
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/user/login`,
      credentials,
      httpOptionsSaved
    );
  }
  public signUp(credentials: LoginInfo): Observable<JwtResponse> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        // "Authorization": "token " + this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/user/signup`,
      credentials,
      httpOptionsSaved
    );
  }

  public addUser(data) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/user/customer-user`,
      data,
      httpOptionsSaved
    );
  }
  public getAllEmployee() {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/user/customer-user`,
      httpOptionsSaved
    );
  }
  public userDelete(data) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.delete<JwtResponse>(
      `${this.baseUrl}/user/customer-user?id=` + data,
      httpOptionsSaved
    );
  }
  public getOneEmployee(id) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/user/customer-user?id=` + id,
      httpOptionsSaved
    );
  }

  
  public addVehicle(data) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/vehicle/`,
      data,
      httpOptionsSaved
    );
  }

  public getAllVehicles() {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/vehicle/`,
      httpOptionsSaved
    );
  }
  public getVehicleLocation(id) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/vehicle/?id=` + id,
      httpOptionsSaved
    );
  }
  
  public deleteVehicle(data) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.delete<JwtResponse>(
      `${this.baseUrl}/vehicle/?id=` + data,
      httpOptionsSaved
    );
  }
  public vehicleAssign(data) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/vehicle/allocation`,
      data,
      httpOptionsSaved
    );
  }
  
  public getAllAssignedVehicle() {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/vehicle/allocation`,
      httpOptionsSaved
    );
  }
  public assignJob(data) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.post<JwtResponse>(
      `${this.baseUrl}/job/`,
      data,
      httpOptionsSaved
    );
  }
  public getAllJobs() {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.get<JwtResponse>(
      `${this.baseUrl}/job/`,
      httpOptionsSaved
    );
  }
  
  public jobDelete(data) {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Access-Control-Allow-Origin": `${this.baseUrl}`,
        "Authorization": "token " + this.tokenStorage.getToken(),

      }),
    };
    return this.http.delete<JwtResponse>(
      `${this.baseUrl}/job/?id=` + data,
      httpOptionsSaved
    );
  }
  
  
  
  // /**
  //  * This function is used to sign up user, it stores user sign up credentials
  //  * @param credentials this parameter stores and passes user credentials
  //  * @returns
  //  */
  // public signUp(credentials: LoginInfo): Observable<JwtResponse> {
  //   debugger;
  //   const httpOptionsSaved = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": `${this.baseUrl}`,
  //       "x-access-token": this.tokenStorage.getToken(),
  //     }),
  //   };
  //   return this.http.post<JwtResponse>(
  //     `${this.baseUrl}/users/register`,
  //     credentials,
  //     httpOptionsSaved
  //   );
  // }
}
