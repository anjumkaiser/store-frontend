import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    BackofficeRoutingModule,
  ],
  declarations: [
    BackofficeDashboardComponent,
  ]
})
export class BackofficeModule { }
