import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isLoggedIn().getValue()) {
      return false;
    }

    const params = next.url.toString();
    this.router.navigate(['profile',  params]);
    return true;

  }
}
