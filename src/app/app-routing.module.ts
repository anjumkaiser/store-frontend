import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
