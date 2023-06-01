import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppAuthService } from './service/app.auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {Subscription} from "rxjs";
import {MenuService} from "./service/menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentPage = '';
  private subPage?: Subscription;

  constructor(private authService: AppAuthService, public oauthService: OAuthService, private menuService: MenuService) {}

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.subPage = this.menuService.pageObservable.subscribe(page => {
      this.currentPage = page;
    });
  }

  ngOnDestroy(): void {
    this.subPage?.unsubscribe();
  }

  async navigateTo(page: string) {
    await this.menuService.setPage(page);
  }
}

