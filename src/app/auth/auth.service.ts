import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const API_KEY = "AIzaSyD6V_vQX26sxWMFGd6Dt1YdGjPvwHzOc3A";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null); //can get access to previous subject
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true //returnSecureToken	boolean	Whether or not to return an ID and refresh token. Should always be true.
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          const { email, localId, idToken, expiresIn } = resData;
          this.handleAuthentication(email, localId, idToken, expiresIn);
        })
      );
  }

  signin(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true //returnSecureToken	boolean	Whether or not to return an ID and refresh token. Should always be true.
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          const { email, localId, idToken, expiresIn } = resData;
          this.handleAuthentication(email, localId, idToken, expiresIn);
        })
      );
  }

  signout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already.";
        break;
      case "EMAIL_NOT_FOUND":
      case "INVALID_PASSWORD":
        errorMessage = "Either password or email is not invalid.";
        break;
      default:
        break;
    }
    debugger;
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    localId: string,
    token: string,
    expiresIn: string
  ) {
    const expirationDate: Date = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    const user = new User(email, localId, token, expirationDate);

    this.user.next(user);
    this.autoSignout(+expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  autoSignin() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      return;
    }
    const userJson = JSON.parse(userData);
    const { email, id, _token, _tokenExpirationDate } = userJson;
    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignout(expirationDuration);
    }
  }

  autoSignout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signout();
    }, expirationDuration);
  }
}
