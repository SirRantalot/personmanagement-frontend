import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private pageSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly pageObservable: Observable<string> = this.pageSubject.asObservable();

  public async setPage(page: string) {
    this.pageSubject.next(page);
    await this.router.navigate([page]);
  }

  constructor(private router: Router, private Location:Location) {
    this.pageSubject.next(location.pathname);
  }
}
