import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse, HttpClient} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { BarRatingModule } from 'ngx-bar-rating';

import { BackofficeModule } from './backoffice/backoffice.module';

import { AppComponent } from './app.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { AuthenticateComponent } from './views/authenticate/authenticate.component';
import { AuthenticatePasswordComponent } from './views/authenticate-password/authenticate-password.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

import { AuthService as AXSocialAuthService } from 'angularx-social-login';
import { AuthServiceConfig } from 'angularx-social-login';

import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AppConfigService } from './services/app-config.service';


function initializerConfigFn(http: HttpClient, config: AppConfigService): (() => Promise<boolean>) {
  return config.loadAppConfig();
}


function provideConfig(appConfig: AppConfigService) {
  return appConfig.getConfig();
}


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    AuthenticateComponent,
    AuthenticatePasswordComponent,
    NavbarComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BackofficeModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    BarRatingModule,
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [HttpClient, AppConfigService],
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
      deps: [AppConfigService]
    } ,
    AXSocialAuthService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
