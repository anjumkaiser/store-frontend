import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig = null;

  constructor(private http: HttpClient) { }


  loadAppConfig() {
    return (): Promise<boolean> => {
      return  new Promise<boolean>((resolve: (a: boolean) => void): void => {
        this.http.get('/api/config').pipe(
          map((cfg: any) => {
            this.appConfig = new AuthServiceConfig([
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(cfg.google_oauth2_id),
              }
            ]);
            resolve(true);
          })
        ).subscribe();
      });
    };
  }


  getConfig() {
    return this.appConfig;
  }

}
