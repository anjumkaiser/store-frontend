import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export class AuthUser {
  username: string;
  password: string;
}

class AuthResponse {
  success: boolean;
  data: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    if (!!localStorage.getItem('token')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
   }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }


  authenticate(auth_user: AuthUser) {
    const http_url = 'api/backoffice/authenticate';
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    this.http.post<AuthResponse>(http_url, auth_user, http_options).subscribe((resp: AuthResponse) => {
      localStorage.setItem('token', resp.data);
      this.loggedIn.next(true);
    }, (e: HttpErrorResponse) => {
      localStorage.removeItem('token')
      this.loggedIn.next(false);
    });
  }

  deauthenticate() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }


  getToken() {
    return localStorage.getItem('token');
  }

}
