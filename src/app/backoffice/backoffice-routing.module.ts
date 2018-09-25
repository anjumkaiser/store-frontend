import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';
import { BackofficeProductListComponent } from '../views/backoffice-product-list/backoffice-product-list.component';

import { AuthenticationGuard } from '../guards/authentication.guard';
import { EditProductComponent } from '../views/edit-product/edit-product.component';


const routes: Routes = [
  {
    path: 'backoffice', canActivate: [AuthenticationGuard] , children: [
      { path: '', component: BackofficeDashboardComponent },
      { path: 'product', component: BackofficeProductListComponent },
      { path: 'product/new', component: EditProductComponent },
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
