import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_name: String = 'Username';
  user: any;


  constructor(
    private authService: AuthenticationService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(value => {
      this.authService.user.subscribe(x => {
        this.user = x;
      });
    })
  }


  back_button_clicked(): void {
    this.location.back();
  }


  change_password_button_clicked(): void {
    this.router.navigate(['profile/password']);
  }

}
