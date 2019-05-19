import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { KEYUTIL, KJUR } from 'jsrsasign';

export class AuthUser {
  username: string;
  password: string;
}

class AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  public publicKey: null | string = null;

  public user: any = new BehaviorSubject<any>(null)
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    if (!!localStorage.getItem('token')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    if (this.publicKey == null) {
      this.getKey();
    }
   }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  private getKey() {
    this.publicKey = null;
    fetch('api/authenticate/jwtkey/pem').then(resp => {
      resp.text().then(x => {
        this.publicKey = x;
      });
    });
  }


  authenticate(auth_user: AuthUser) {
    const http_url = 'api/authenticate/password';
    const http_options = { headers: new HttpHeaders({'Accept': 'application/json'})};
    this.http.post<AuthResponse>(http_url, auth_user, http_options).subscribe((resp: AuthResponse) => {

      if (!this.publicKey) {
        return;
      }

      const pubkey = KEYUTIL.getKey(this.publicKey);
      const isValid = KJUR.jws.JWS.verifyJWT(resp.token, pubkey, {
        alg: ['RS256', 'RS512'],
      });

      if (isValid) {
        const  parsedJWT = KJUR.jws.JWS.parse(resp.token);
        this.user.next(parsedJWT.payloadObj.pvt.user);
        localStorage.setItem('token', resp.token);
        this.loggedIn.next(true);
      }

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
