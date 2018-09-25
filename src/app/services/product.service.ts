import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }


  getProducts(): Observable<Product[]> {

    const http_url = 'api/product';
    const http_options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.get<Product[]>(http_url, http_options);
  }
}
