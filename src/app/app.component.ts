import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String;
  logo: String;
  logo_alt_text: String;
  copyright_year: String;
  copyright_holder: String;

  constructor() {
  }

  ngOnInit () {
    this.title = 'Title';
    this.copyright_year = '2018';
    this.copyright_holder = 'Copyright Holder';
  }
}
