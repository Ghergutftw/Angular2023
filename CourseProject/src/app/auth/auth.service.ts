import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SIGNUP_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0l2syH_4CtskUkw6LVy7DzsmZTzID8Ds"
  LOGIN_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0l2syH_4CtskUkw6LVy7DzsmZTzID8Ds"

  user = new BehaviorSubject<UserModel>(null)
  private tokenExpirationTimer: any


  constructor(private http: HttpClient,
              private router: Router) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.SIGNUP_URL, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError((err: HttpErrorResponse) => {
      let errorMessage: string
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS' :
          errorMessage = "The email address is already in use by another account."
          break
        case 'OPERATION_NOT_ALLOWED' :
          errorMessage = "Password sign-in is disabled for this project."
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later."
          break
        default:
          errorMessage = "An unknown error has occurred"
          break;
      }
      return throwError(errorMessage)
    }), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.LOGIN_URL, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError((err: HttpErrorResponse) => {
      let errorMessage: string
      switch (err.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted."
          break
        case 'INVALID_PASSWORD':
          errorMessage = "The password is invalid or the user does not have a password."
          break
        case 'USER_DISABLED':
          errorMessage = "The user account has been disabled by an administrator."
          break
        default:
          errorMessage = "An unknown error has occurred"
          break;
      }
      return throwError(errorMessage)
    }), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }

  autoLogin() {
    //Colectare din localStorage
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'))
    if (!user) {
      return;
    }
    const loadedUser = new UserModel(user.email, user.id, user._token, new Date(user._tokenExpirationDate))
    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime)
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new UserModel(
      email, userId, token, expirationDate
    );
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
}
