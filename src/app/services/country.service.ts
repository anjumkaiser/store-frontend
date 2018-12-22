import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ICountry } from '../interfaces/icountry';
import { Country } from '../classes/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient,
  ) { }

  getCountries(): Observable<Country[]> {
    const http_url = 'api/country';
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<ICountry[]>(http_url, http_options);
  }

}
