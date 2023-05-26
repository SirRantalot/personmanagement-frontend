import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppLoginComponent} from './app-login.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {authConfig} from '../../app.module';
import {HttpClient} from '@angular/common/http';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OAuthModule.forRoot({resourceServer: {sendAccessToken: true}})
      ],
      providers: [
        {provide: HttpClient},
        {provide: AuthConfig, useValue: authConfig}],
      declarations: [AppLoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
