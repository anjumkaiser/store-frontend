import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: String;
  logo: String;
  logo_alt_text: String;

  isLoggedIn: Boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.title = 'Title';
    this.logo = 'images/logo.png';
    this.logo_alt_text = 'Logo';
    this.authService.isLoggedIn().subscribe((value) => {
      this.isLoggedIn = value;
      console.log('auth_service isloggedin value: ' + value);
    });
  }

  show_profile(): void {
    this.router.navigate(['profile']);
    console.log('show_profile');
  }

  do_checkout(): void {
    console.log('do_checkout');
  }

  do_login(): void {
    this.router.navigate(['authenticate']);
  }

  do_logout(): void {
    this.authService.deauthenticate();
  }

}
