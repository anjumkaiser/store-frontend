import { Component, OnInit } from '@angular/core';

import { Product } from '../classes/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];


  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1, 'Product 1', 'Product description for Product 1', 1.24, 3.0),
      new Product(2, 'Product 2', 'Product description for Product 2', 3.2 , 1.3),
    ];
  }


  add_product(product: Product): void {
    //console.log('X');
    console.log(product);

  }

}
