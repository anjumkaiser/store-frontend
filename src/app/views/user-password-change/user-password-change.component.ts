import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css']
})
export class UserPasswordChangeComponent implements OnInit {

  private user: any;
  private form_group_change_password: FormGroup;

  constructor(
    private location: Location,
    private authService: AuthenticationService,
    private http: HttpClient,
    private snackbar: MatSnackBar,
  ) { }


  ngOnInit() {


    this.form_group_change_password = new FormGroup({
      user_id: new FormControl(),
      user_name: new FormControl(),
      current_password: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl(),
    });

    this.form_group_change_password.setValidators(this.checkPasswords);


    this.authService.user.subscribe(user => {
      this.user = user;
      this.form_group_change_password.controls['user_id'].setValue(user.id);
      this.form_group_change_password.controls['user_name'].setValue(user.name);
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }
  }


  change_password_clicked() {

    const passchobj = {
      user_id: this.user.id,
      current_password: this.form_group_change_password.value.current_password,
      new_password: this.form_group_change_password.value.password,
      confirm_password: this.form_group_change_password.value.confirm_password,
    };

    const http_url = 'api/authenticate/password/change';
    const http_options = { headers: new HttpHeaders({'Accept': 'application/json'})};
    this.http.post(http_url, passchobj, http_options).subscribe((resp: any) => {

      const message = 'Password changed successfully';
      const action = 'Ok';
      this.snackbar.open(message, action, { duration: 3000 }).afterDismissed().subscribe(x => {
        this.location.back();
      });

    }, error => {

      const message = 'Unable to change password';
      const action = 'Ok';
      this.snackbar.open(message, action, { duration: 3000 }).afterDismissed().subscribe(x => {
        this.location.back();
      });

    });

  }


  back_button_clicked(): void {
    this.location.back();
  }

}
