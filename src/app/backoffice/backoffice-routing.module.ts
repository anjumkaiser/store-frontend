import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackofficeDashboardComponent } from '../views/backoffice-dashboard/backoffice-dashboard.component';
import { AuthenticationGuard } from '../guards/authentication.guard';


const routes: Routes = [
  {
    path: 'backoffice', canActivate: [AuthenticationGuard] , children: [
      { path: '', component: BackofficeDashboardComponent },
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
