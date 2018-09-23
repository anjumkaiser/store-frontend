import { Component, OnInit } from '@angular/core';

import { Product } from '../../classes/product';

@Component({
  selector: 'app-backoffice-product-list',
  templateUrl: './backoffice-product-list.component.html',
  styleUrls: ['./backoffice-product-list.component.css']
})
export class BackofficeProductListComponent implements OnInit {

  products: Product[];

  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1, 'Product 1', 'Product description for Product 1', 1.24, 3.0),
      new Product(2, 'Product 2', 'Product description for Product 2', 3.2 , 1.3),
    ];
  }

}
