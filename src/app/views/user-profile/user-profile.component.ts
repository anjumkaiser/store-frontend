import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_name: String = 'Username';

  constructor() { }

  ngOnInit() {
  }


  back_button_clicked(): void {
    console.log('back_button_clicked()');
  }

}
