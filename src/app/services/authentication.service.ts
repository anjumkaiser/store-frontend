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
  ) { }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }


  authenticate(auth_user: AuthUser) {
    const http_url = 'api/backoffice/authenticate';
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    this.http.post<AuthResponse>(http_url, auth_user, http_options).subscribe((resp: AuthResponse) => {
      this.loggedIn.next(true);
    }, (e: HttpErrorResponse) => {
      this.loggedIn.next(false);
    });
  }

  deauthenticate() {
    this.loggedIn.next(false);
  }

}
