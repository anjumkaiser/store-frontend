import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { KEYUTIL, KJUR } from 'jsrsasign';

import { AppConfigService } from './app-config.service';

const AUTH_TOKEN = 'auth_token';
const REFRESH_TOKEN = 'refresh_token';

export class AuthUser {
  username: string;
  password: string;
}

class AuthResponse {
  auth_token: string;
  refresh_token: string;
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
    private appCfg: AppConfigService,
  ) {
    if (!!this.getAuthToken() && !!this.getRefreshToken()) {
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


  authenticate_google_oidc(oidc_code, pkce_code_verifier) {
    const http_url = 'api/authenticate/google/authorize';
    const http_options = { headers: new HttpHeaders({'Accept': 'application/json'})};
    const http_data = {
      code: oidc_code,
      verifier: pkce_code_verifier,
    };

    this.http.post(http_url, http_data, http_options).subscribe( (resp: any) => {

      if (!this.publicKey) {
        return;
      }

      if (!resp.auth_token) {
        return;
      }

      if (!resp.refresh_token) {
        return;
      }

      const isAuthValid = this.validateJWT(resp.auth_token);
      if (isAuthValid) {
        const  parsedJWT = KJUR.jws.JWS.parse(resp.auth_token);
        this.user.next(parsedJWT.payloadObj.pvt.user);
        localStorage.setItem(AUTH_TOKEN, resp.auth_token);
      }

      const isRefreshValid = this.validateJWT(resp.refresh_token);
      if (isRefreshValid) {
        localStorage.setItem(REFRESH_TOKEN, resp.refresh_token);
      }

      if (isRefreshValid && isAuthValid) {
        this.loggedIn.next(true);
      } else {
        this.removeTokens();
      }

    }, (e: HttpErrorResponse) => {
      this.removeTokens();
    });
  }


  authenticate_password(auth_user: AuthUser) {
    const http_url = 'api/authenticate/password';
    const http_options = { headers: new HttpHeaders({'Accept': 'application/json'})};
    this.http.post<AuthResponse>(http_url, auth_user, http_options).subscribe((resp: AuthResponse) => {

      if (!this.publicKey) {
        return;
      }

      if (!resp.auth_token) {
        return;
      }

      if (!resp.refresh_token) {
        return;
      }

      const isAuthValid = this.validateJWT(resp.auth_token);
      if (isAuthValid) {
        const  parsedJWT = KJUR.jws.JWS.parse(resp.auth_token);
        this.user.next(parsedJWT.payloadObj.pvt.user);
        localStorage.setItem(AUTH_TOKEN, resp.auth_token);
      }

      const isRefreshValid = this.validateJWT(resp.refresh_token);
      if (isRefreshValid) {
        localStorage.setItem(REFRESH_TOKEN, resp.refresh_token);
      }

      if (isRefreshValid && isAuthValid) {
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


  refreshToken() {
    const http_url = 'api/authenticate/refresh';
    const http_options = { headers: new HttpHeaders({'Accept': 'application/json'})};
    const http_post_data = JSON.stringify({
      refresh_token: this.getRefreshToken(),
    });

    return this.http.post<any>(http_url, http_post_data, http_options).pipe(tap((tokens: AuthResponse) => {
      if (!this.publicKey) {
        return;
      }

      const isAuthValid = this.validateJWT(tokens.auth_token);
      if (isAuthValid) {
        const  parsedJWT = KJUR.jws.JWS.parse(tokens.auth_token);
        localStorage.setItem(AUTH_TOKEN, tokens.auth_token);
      }
    }));
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
    localStorage.removeItem(REFRESH_TOKEN);
    this.loggedIn.next(false);
  }


  getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }


  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

}
