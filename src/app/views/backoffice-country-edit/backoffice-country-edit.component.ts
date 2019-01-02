import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from 'src/app/classes/country';
import { UUID } from 'angular2-uuid';

enum DataEditMode { new, edit }


@Component({
  selector: 'app-backoffice-country-edit',
  templateUrl: './backoffice-country-edit.component.pug',
  styleUrls: ['./backoffice-country-edit.component.css']
})
export class BackofficeCountryEditComponent implements OnInit {

  form_group_country_edit: FormGroup;
  private data_edit_mode: DataEditMode;
  edit_mode_heading = 'Edit';

  constructor(
    private countryService: CountryService,
    private router: Router,
    private activated_route: ActivatedRoute,
  ) {
    this.data_edit_mode = DataEditMode.new;
    this.edit_mode_heading = 'Add new';
  }

  ngOnInit() {

    let _country_id = this.activated_route.snapshot.paramMap.get('id');
    if (_country_id) {
      console.log('setting edit mode for id : ' + _country_id);
      this.data_edit_mode = DataEditMode.edit;
    } else {
      _country_id = UUID.UUID();
    }

    this.form_group_country_edit = new FormGroup({
      country_id: new FormControl({ value: _country_id, disabled: true }),
      country_code: new FormControl(),
      country_name: new FormControl(),
    });

    // this.form_group_country_edit.controls['country_id'].patchValue();

  }

  cancel_button_clicked() {
    this.router.navigate(['../'], {relativeTo: this.activated_route});
  }

  submit_button_clicked() {

    const country: Country = new Country(
      this.form_group_country_edit.value.country_id,
      this.form_group_country_edit.value.country_code.toUpperCase(),
      this.form_group_country_edit.value.country_name
    );

    if (this.data_edit_mode === DataEditMode.new) {
      this.countryService.addCountry(country).subscribe(success => {
        // console.log('success: ' + success);
        this.router.navigate(['../'], {relativeTo: this.activated_route});
      },
        error => {
          console.log('error: ' + JSON.stringify(error));
        });
    }

  }

}
