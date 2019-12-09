import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getCountry(id: String): Observable<Country> {
    const http_url = 'api/country/' + id;
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<ICountry>(http_url, http_options);
  }

  addCountry(country: Country): Observable<Country> {
    const http_url = 'api/country';
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<ICountry>(http_url, country, http_options);
  }

  editCountry(country: Country) {
    const http_url = 'api/country/edit/' + country.id;
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<ICountry>(http_url, country, http_options);
  }

  deleteCountry(country: Country) {
    const http_url = 'api/country/delete/' + country.id;
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.delete(http_url, http_options);
  }

}
