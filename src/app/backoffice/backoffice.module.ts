import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarRatingModule } from 'ngx-bar-rating';

import { AppMaterialModule } from '../app-material.module';



import { BackofficeRoutingModule } from './backoffice-routing.module';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';
import { BackofficeProductListComponent } from '../views/backoffice-product-list/backoffice-product-list.component';
import { BackofficeProductEditComponent } from '../views/backoffice-product-edit/backoffice-product-edit.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BackofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BarRatingModule,
  ],
  declarations: [
    BackofficeDashboardComponent,
    BackofficeProductListComponent,
    BackofficeProductEditComponent,
  ]
})
export class BackofficeModule { }
