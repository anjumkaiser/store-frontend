import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
            this.appConfig = cfg;
            resolve(true);
          })
        ).subscribe();
      });
    };
  }


  getConfig() {
    console.log('appconfig [' + this.appConfig + ']');
    return this.appConfig;
  }

}
