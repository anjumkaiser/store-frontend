import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from 'src/app/classes/country';
import { UUID } from 'angular2-uuid';

enum DataEditMode { new, edit }


@Component({
  selector: 'app-backoffice-country-edit',
  templateUrl: './backoffice-country-edit.component.html',
  styleUrls: ['./backoffice-country-edit.component.css']
})
export class BackofficeCountryEditComponent implements OnInit {

  form_group_country_edit: FormGroup;
  private data_edit_mode: DataEditMode;

  constructor(
    private countryService: CountryService,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    this.data_edit_mode = DataEditMode.new;
  }

  ngOnInit() {

    let _country_id = this.route.snapshot.paramMap.get('id');
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
    this.location.back();
  }

  submit_button_clicked() {

    const country: Country = new Country(
      this.form_group_country_edit.value.country_id,
      this.form_group_country_edit.value.country_code.toUpperCase(),
      this.form_group_country_edit.value.country_name
    );

    if (this.data_edit_mode === DataEditMode.new) {
      this.countryService.addCountry(country).subscribe(success => {
        console.log('success: ' + success);
      },
        error => {
          console.log('error: ' + JSON.stringify(error));
        });
    }

  }

}
