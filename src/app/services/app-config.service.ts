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
            console.log('Google oauth2 key: [' + cfg.google_oauth2_id + ']');
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

    /*
    return this.http.get('/api/config').pipe(map((cfg: any) => {
      console.log('Google oauth2 key: [' + cfg.google_oauth2_id + ']');
      this.appConfig = cfg;
      resolve(true);
    }),
    catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
      if (x.status !== 404) {
        resolve(false);
      }
      this.appConfig = null;
      resolve(false);
      return of({});
    })
    ).subscribe();
    */
  }


  getConfig() {
    return this.appConfig;
  }

}
