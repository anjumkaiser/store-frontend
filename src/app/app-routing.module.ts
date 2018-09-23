import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { AuthenticateComponent } from './views/authenticate/authenticate.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { EditProductComponent } from './views/edit-product/edit-product.component';

import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: 'authenticate/:path', component: AuthenticateComponent },
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'product/new', component: EditProductComponent, canActivate: [AuthenticationGuard] },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product/:id/edit', component: EditProductComponent, canActivate: [AuthenticationGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
