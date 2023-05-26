import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment.development';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppAuthGuard } from './guard/app.auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HttpXSRFInterceptor } from './interceptor/http.csrf.interceptor';
import { AppAuthService } from './service/app.auth.service';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { PersonCreateComponent } from './pages/person-create/person-create.component';
import { ContactDetailsCreateComponent } from './pages/contact-details-create/contact-details-create.component';
import { ContactDetailsListComponent } from './pages/contact-details-list/contact-details-list.component';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CityCreateComponent } from './pages/city-create/city-create.component';
import { CountryCreateComponent } from './pages/country-create/country-create.component';
import { CountryListComponent } from './pages/country-list/country-list.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'demoapp',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PersonListComponent,
    PersonCreateComponent,
    ContactDetailsCreateComponent,
    ContactDetailsListComponent,
    CityListComponent,
    CityCreateComponent,
    CountryCreateComponent,
    CountryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
    HttpClientModule,
    MatButtonModule
  ],
  providers: [
    {provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    AppAuthGuard,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
  authService.initAuth().finally();
} }
