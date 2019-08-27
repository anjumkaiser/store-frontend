import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { KEYUTIL, KJUR } from 'jsrsasign';

const AUTH_TOKEN = 'auth_token';

export class AuthUser {
  username: string;
  password: string;
}

class AuthResponse {
  auth_token: string;
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
    if (!!this.getAuthToken()) {
      this.loggedIn.next(true);
    } else {
      this.removeTokens();
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

      if (!resp.auth_token) {
        return;
      }

      const isAuthValid = this.validateJWT(resp.auth_token);
      if (isAuthValid) {
        const  parsedJWT = KJUR.jws.JWS.parse(resp.auth_token);
        this.user.next(parsedJWT.payloadObj.pvt.user);
        localStorage.setItem(AUTH_TOKEN, resp.auth_token);
        this.loggedIn.next(true);
      } else {
        this.removeTokens();
      }

    }, (e: HttpErrorResponse) => {
      this.removeTokens();
    });
  }



  deauthenticate() {
    this.removeTokens();
  }


  validateJWT(token): boolean {
    const pubkey = KEYUTIL.getKey(this.publicKey);
    const isValid: boolean = KJUR.jws.JWS.verifyJWT(token, pubkey, {
      alg: ['RS256', 'RS512'],
    });
    return isValid;
  }


  removeTokens() {
    localStorage.removeItem(AUTH_TOKEN);
    this.loggedIn.next(false);
  }


  getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

}
