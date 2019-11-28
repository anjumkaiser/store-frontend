import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

import { GOOGLE_PKCE_VERIFIER, GOOGLE_PKCE_STATE } from '../authenticate/authenticate.component';

@Component({
  selector: 'app-authenticate-callback',
  templateUrl: './authenticate-callback.component.html',
  styleUrls: ['./authenticate-callback.component.css']
})
export class AuthenticateCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {

    const paramMap = this.route.snapshot.queryParamMap;
    const urlParamState = paramMap.get("state");
    const pkce_state = localStorage.getItem(GOOGLE_PKCE_STATE);

    if ( pkce_state !== urlParamState) {
      this.router.navigate(['/authenticate']);
      return;
    }

    const pkce_code_verifier = localStorage.getItem(GOOGLE_PKCE_VERIFIER);
    const oidc_code =  paramMap.get("code");

    this.authService.authenticate_google_oidc(oidc_code, pkce_code_verifier);

    localStorage.removeItem(GOOGLE_PKCE_STATE);
    localStorage.removeItem(GOOGLE_PKCE_VERIFIER);
  }

}
