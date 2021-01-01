import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { AuthenticateComponent } from './views/authenticate/authenticate.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

import { AuthenticationGuard } from './guards/authentication.guard';
import { UnAuthenticationGuard } from './guards/unauthentication.guard';

import { AuthenticateCallbackComponent } from './views/authenticate-callback/authenticate-callback.component';
import { AuthenticatePasswordComponent } from './views/authenticate-password/authenticate-password.component';

import { UserPasswordChangeComponent } from './views/user-password-change/user-password-change.component';


const routes: Routes = [
  { path: 'authenticate/google/authorize', component: AuthenticateCallbackComponent },
  { path: 'authenticate/password', component: AuthenticatePasswordComponent },
  { path: 'authenticate/:path', component: AuthenticateComponent },
  { path: 'authenticate', component: AuthenticateComponent, canActivate: [UnAuthenticationGuard] },
  { path: 'product', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'profile/password', component: UserPasswordChangeComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
