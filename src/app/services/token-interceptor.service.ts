import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, filter, take } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthenticationService) { }

  intercept(req: any, next: any) {
    const authToken = this.authService.getAuthToken();
    if (!!authToken) {
      req =  this.addToken(req, authToken);
    }

    return next.handle(req).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(req, next);
      } else {
        return throwError(error);
      }
    }));
  }


  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.refreshTokenSubject.next(token.jwt);
          this.isRefreshing = false;
          return next.handle(this.addToken(req, token.jwt));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(req, jwt));
        })
      );
    }
  }


  addToken(req: HttpRequest<any>, token: string):  HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
}
