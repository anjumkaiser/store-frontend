import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';
import { BackofficeProductListComponent } from '../views/backoffice-product-list/backoffice-product-list.component';


@NgModule({
  imports: [
    CommonModule,
    BackofficeRoutingModule,
  ],
  declarations: [
    BackofficeDashboardComponent,
    BackofficeProductListComponent,
  ]
})
export class BackofficeModule { }
