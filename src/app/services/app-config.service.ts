import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient) { }


  loadAppConfig() {
    return this.http.get('/api/config').toPromise().then(data => {
      this.appConfig = data;
    });
  }


  getGoogleOAuth2ClientId() {
    return this.appConfig.google_oauth2_id;
  }
}
