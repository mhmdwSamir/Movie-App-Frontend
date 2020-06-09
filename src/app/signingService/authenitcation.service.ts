import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
class User {
  username: string;
  isAdmin?: boolean;
  id : string;
  displayName?: string;
  email: string;
}
export interface IUserAuthentication {
  user: User;
  token: string;
}
export interface userCredentials {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser = JSON.parse(localStorage.getItem('user')) as IUserAuthentication;
  private _currentUser$ = new BehaviorSubject<boolean>(!!(this.currentUser && this.currentUser.token));
  private _isAdmin$ = new BehaviorSubject<boolean>(this.currentUser ? this.currentUser.user.isAdmin : false);

  rootUrl = `https://movie-app-v1.herokuapp.com/api/auth`;
  constructor(private _http: HttpClient) { }
  signUp(userData: userCredentials) {
    return this._http.post<IUserAuthentication>(`${this.rootUrl}/signUp`, userData)
    .pipe(
      tap((resp) => resp.token ? this._currentUser$.next(true) : this._currentUser$.next(false)),
      tap((resp) => resp.user.isAdmin ? this._isAdmin$.next(true) : this._isAdmin$.next(false))
    );
  }
  
  login(username: string, password: string): Observable<IUserAuthentication> {
   return this._http.post<IUserAuthentication>(`${this.rootUrl}/signin`, { email: username, password })
   .pipe(
     tap((resp) => resp.token && this._currentUser$.next(true)),
     tap((resp) => resp.user.isAdmin && this._isAdmin$.next(true))
   )
  }

  isAuthenticated(): Observable<boolean> {
    return this._currentUser$
  }

  isAuthorized() {
    return this._isAdmin$;
  }

  setAuthenticationState(state: boolean) {
    if (state == false) {
      localStorage.removeItem('user')
    }
    this._currentUser$.next(state);
  }

  getToken(): string {
    const localStorageItem = localStorage.getItem('user');
    if (localStorageItem) {
      const authUser = JSON.parse(localStorageItem) as IUserAuthentication;
      return authUser.token || '';
    } else {
      return '';
    }
  }
}
