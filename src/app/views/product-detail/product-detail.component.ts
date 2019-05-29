import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    console.log(this.location.path());
    // console.log(this.route.url.;
    console.log(+this.route.snapshot.paramMap.get('id'));
  }

  goBack(): void {
    this.location.back();
  }

}
