import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from 'src/app/classes/country';
import { UUID } from 'angular2-uuid';

const enum DataEditMode { new, edit }


@Component({
  selector: 'app-backoffice-country-edit',
  templateUrl: './backoffice-country-edit.component.html',
  styleUrls: ['./backoffice-country-edit.component.css']
})
export class BackofficeCountryEditComponent implements OnInit {

  form_group_country_edit: FormGroup;
  private data_edit_mode: DataEditMode;
  edit_mode_heading = 'Edit';
  buttons_disabled = false;

  constructor(
    private countryService: CountryService,
    private router: Router,
    private activated_route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {

    this.form_group_country_edit = new FormGroup({
      country_id: new FormControl(),
      country_code: new FormControl(),
      country_name: new FormControl(),
    });



    let _country_id = this.activated_route.snapshot.paramMap.get('id');
    if (_country_id) {
      this.data_edit_mode = DataEditMode.edit;
      this.edit_mode_heading = 'Edit';
      this.form_group_country_edit.controls['country_id'].setValue(_country_id);
      this.countryService.getCountry(_country_id).subscribe(e => {
        this.form_group_country_edit.controls['country_id'].setValue(e.id);
        this.form_group_country_edit.controls['country_code'].setValue(e.code);
        this.form_group_country_edit.controls['country_name'].setValue(e.name);
      });
    } else {
      this.data_edit_mode = DataEditMode.new;
      this.edit_mode_heading = 'Add new';
      _country_id = UUID.UUID();
      this.form_group_country_edit.controls['country_id'].setValue(_country_id);
    }
  }

  cancel_button_clicked() {
    // this.router.navigate(['../'], {relativeTo: this.activated_route});
    this.location.back();
  }

  submit_button_clicked() {

    const country: Country = new Country(
      this.form_group_country_edit.value.country_id,
      this.form_group_country_edit.value.country_code.toUpperCase(),
      this.form_group_country_edit.value.country_name
    );

    this.buttons_disabled = true;

    if (this.data_edit_mode === DataEditMode.new) {
      this.countryService.addCountry(country).subscribe(
        success => {
          this.buttons_disabled = false;
          // console.log('success: ' + success);
          // this.router.navigate(['../'], {relativeTo: this.activated_route});
          this.location.back();
        },
        error => {
          this.buttons_disabled = false;
          console.log('error: ' + JSON.stringify(error));
        });
    } else if (this.data_edit_mode === DataEditMode.edit) {
      this.countryService.editCountry(country).subscribe(
        success => {
          this.buttons_disabled = false;
          this.location.back();
        },
        error => {
          this.buttons_disabled = false;
          console.log('error: ' + JSON.stringify(error));
        }
      );

    } else {
      this.buttons_disabled = false;
    }

  }

}
