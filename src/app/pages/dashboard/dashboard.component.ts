import { Component } from '@angular/core';
import { AppAuthService } from 'src/app/service/app.auth.service';
import { HeaderService } from 'src/app/service/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  useralias = '';
  username = '';

  constructor(private authService: AppAuthService, private headerService: HeaderService) {
    this.headerService.setPage('nav.dashboard');
  }

  /*ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
  }*/
}
