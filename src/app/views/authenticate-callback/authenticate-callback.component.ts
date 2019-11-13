import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
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

    this.http.post('/api/authenticate/google/authorize', JSON.stringify({
      code: oidc_code,
      verifier: pkce_code_verifier,
    })).subscribe( (x: any) => {
      console.log(`x [{x}]`);
    });
  }

}
