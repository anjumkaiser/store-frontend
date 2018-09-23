import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthUser, AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  formGroupLogin: FormGroup;
  minusernamelength = 5;
  minpasswordlength = 5;

  password_hidden = true;

  returnUrl: String = '/';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(p => {
      if (p.path) {
        this.returnUrl = p.path;
      }
    });

    this.authService.isLoggedIn().subscribe((value) => {
      if (true === value) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.clearFormContent();
      }
    });
  }

  onSubmit() {

    if (this.formGroupLogin.invalid) {
      return;
    }

    const auth_user: AuthUser = new AuthUser();
    auth_user.username = this.formGroupLogin.value.username;
    auth_user.password = this.formGroupLogin.value.password;

    this.authService.authenticate(auth_user);
  }

  onCancel() {
    this.clearFormContent();
  }

  clearFormContent() {
    this.formGroupLogin = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(this.minusernamelength)]],
      password: ['', [Validators.required, Validators.minLength(this.minpasswordlength)]],
     });
     this.formGroupLogin.reset();
  }


  toggle_password_visibility(): void {
    this.password_hidden = this.password_hidden ? false : true;
  }
}
