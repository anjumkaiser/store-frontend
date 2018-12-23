import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';
import { BackofficeProductListComponent } from '../views/backoffice-product-list/backoffice-product-list.component';
import { BackofficeProductEditComponent } from '../views/backoffice-product-edit/backoffice-product-edit.component';

import { AuthenticationGuard } from '../guards/authentication.guard';
import { BackofficeCountryListComponent } from '../views/backoffice-country-list/backoffice-country-list.component';
import { BackofficeCountryEditComponent } from '../views/backoffice-country-edit/backoffice-country-edit.component';


const routes: Routes = [
  {
    path: 'backoffice', canActivate: [AuthenticationGuard], children: [
      { path: '', component: BackofficeDashboardComponent },
      {
        path: 'product', children: [
          { path: '', component: BackofficeProductListComponent },
          { path: 'new', component: BackofficeProductEditComponent },
        ]
      },
      {
        path: 'country', children: [
          { path: '', component: BackofficeCountryListComponent },
          { path: 'new', component: BackofficeCountryEditComponent },
          { path: ':id', component: BackofficeCountryEditComponent },
        ]
      }
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
