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


  isAllowBackOffice: Boolean = false;
  isLoggedIn: Boolean = false;
  user_name: string = 'user';
  display_name: string = 'User';

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

      this.authService.user.subscribe(x => {

        if (x) {
        this.user_name = x.name;
        this.display_name = x.display_name;
          for (const r of x.roles) {
            if (r.role_name === 'Administrator' ) {
              this.isAllowBackOffice = true;
            }
          }
        }
      });
    });
  }

  show_profile(): void {
    this.router.navigate(['profile']);
  }

  show_backoffice_dashboard(): void {
    this.router.navigate(['backoffice']);
  }

  do_checkout(): void {
    console.log('do_checkout');
  }

  do_login(): void {
    this.router.navigate(['authenticate']);
  }

  do_logout(): void {
    this.authService.deauthenticate();
    this.router.navigate(['/']);
  }

}
