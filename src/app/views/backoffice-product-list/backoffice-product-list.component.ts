import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';

import { Product } from '../../classes/product';

@Component({
  selector: 'app-backoffice-product-list',
  templateUrl: './backoffice-product-list.component.pug',
  styleUrls: ['./backoffice-product-list.component.css']
})
export class BackofficeProductListComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {

    this.productService.getProducts().subscribe( products => {
      this.products = products;
    }, error => {
      this.products = [];
      // console.log(`error status [${error.status}] messsage [${error.message}]`);
    } );
  }

}
