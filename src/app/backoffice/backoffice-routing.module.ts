import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';
import { BackofficeProductListComponent } from '../views/backoffice-product-list/backoffice-product-list.component';
import { BackofficeProductEditComponent } from '../views/backoffice-product-edit/backoffice-product-edit.component';

import { AuthenticationGuard } from '../guards/authentication.guard';
import { BackofficeCountryListComponent } from '../views/backoffice-country-list/backoffice-country-list.component';


const routes: Routes = [
  {
    path: 'backoffice', canActivate: [AuthenticationGuard] , children: [
      { path: '', component: BackofficeDashboardComponent },
      { path: 'product', component: BackofficeProductListComponent },
      { path: 'product/new', component: BackofficeProductEditComponent },
      { path: 'country', component: BackofficeCountryListComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
})
export class BackofficeRoutingModule { }
