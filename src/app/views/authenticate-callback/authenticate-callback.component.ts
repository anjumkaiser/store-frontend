import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

import { GOOGLE_PKCE_VERIFIER, GOOGLE_PKCE_STATE } from '../../services/authentication.service';

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
    const oidc_state = paramMap.get('state');
    const oidc_code =  paramMap.get('code');

    if (this.authService.authenticate_google_oidc(oidc_code, oidc_state) === false) {
      this.router.navigate(['/authenticate']);
    } else {
      this.authService.user.subscribe(x => {
        if (x) {
          this.router.navigate(['/']);
        }
      });
    }

  }

}
