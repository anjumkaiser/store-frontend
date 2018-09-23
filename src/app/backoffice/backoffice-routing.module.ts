import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';
import { BackofficeProductListComponent } from '../views/backoffice-product-list/backoffice-product-list.component';

import { AuthenticationGuard } from '../guards/authentication.guard';


const routes: Routes = [
  {
    path: 'backoffice', canActivate: [AuthenticationGuard] , children: [
      { path: '', component: BackofficeDashboardComponent },
      { path: 'product', component: BackofficeProductListComponent },
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
})
export class BackofficeRoutingModule { }
