import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Product } from '../../classes/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;

  form_group_edit_product: FormGroup;

  product_name_min_length = 3;
  product_name_max_length = 25;
  product_description_min_length = 3;
  product_description_max_length = 100;

  action: String = 'New';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formbuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.product = new Product(-1, '', '', +0.0, +0.0);
    this.clearFormContent();
  }

  clearFormContent() {
    this.form_group_edit_product = this.formbuilder.group({
      product_name: [this.product.name, [
        Validators.required,
        Validators.minLength(this.product_name_min_length),
        Validators.maxLength(this.product_name_max_length),
      ]],
      product_description: [this.product.description, [
        Validators.required,
        Validators.minLength(this.product_description_min_length),
        Validators.maxLength(this.product_description_max_length),
      ]],
     product_price: [this.product.price, [
      Validators.required,
    ]],
    product_rating: [this.product.rating, [
      Validators.required,
    ]],
   });
  }

  onSubmit() {
    const product: Product = new Product(-1, '', '', +0.0, +0.0);
    product.name = this.form_group_edit_product.value.product_name;
    product.description = this.form_group_edit_product.value.product_description;
    product.price = this.form_group_edit_product.value.product_price;
    product.rating = this.form_group_edit_product.value.product_rating;
  }

  onCancel() {
    this.clearFormContent();
  }

}
