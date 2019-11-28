import { Component, OnInit, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { Location } from '@angular/common';
import { AppConfigService } from '../../services/app-config.service';
import { GOOGLE_PKCE_VERIFIER, GOOGLE_PKCE_STATE } from '../../services/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(
    private location: Location,
    private appCfg: AppConfigService,
    ) { }


  ngOnInit() {
  }


  async googleAuthenticate() {

    const pkce_state = this.generateCodeVerifier();
    localStorage.setItem(GOOGLE_PKCE_STATE, pkce_state);

    const code_verifier = this.generateCodeVerifier();
    localStorage.setItem(GOOGLE_PKCE_VERIFIER, code_verifier);

    const code_challenge = await this.pkceChallengeFromVerifier(code_verifier);

    let url = 'https://accounts.google.com/o/oauth2/v2/auth?';
    url += 'client_id=' + this.appCfg.getConfig().google_oauth2_id;
    url += '&response_type=code';
    url += '&access_type=offline';
    url += '&include_granted_scopes=true';
    url += '&scope=' + encodeURIComponent('openid profile email');
    url += '&code_challenge_method=S256';
    url += '&code_challenge=' + encodeURIComponent(code_challenge);
    url += '&state=' + encodeURIComponent(pkce_state);
    url += '&redirect_uri=' + encodeURIComponent(window.location.toString() + '/google/authorize');

    window.location.href = url;
  }


  generateRandomString(length): string {
    const cryptoObj = window.crypto; // || window.msCrypto; // for IE 11
    let randomArray = new Uint8Array(length);
    cryptoObj.getRandomValues(randomArray);

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const plen = possible.length;
    let text = '';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(randomArray[i] % plen);
    }
    return text;
  }


  generateCodeVerifier(): string {
    return this.generateRandomString(128);
  }


  sha256(plain) {
    const cryptoObj = window.crypto; // || window.msCrypto; // for IE 11
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return cryptoObj.subtle.digest('SHA-256', data);
  }


  base64urlencode(str):string {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }


  // Return the base64-urlencoded sha256 hash for the PKCE challenge
  async pkceChallengeFromVerifier(v) {
    let hashed = await this.sha256(v);
    return this.base64urlencode(hashed);
  }

}
