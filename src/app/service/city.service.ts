import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { City } from '../dataaccess/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  readonly backendUrl = 'city';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<City[]> {
    return this.http.get<City[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<City> {
    return this.http.get<City>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(city: City): Observable<City> {
    return this.http.put<City>(environment.backendBaseUrl + this.backendUrl + `/${city.id}`, city);
  }

  public save(city: City): Observable<City> {
    return this.http.post<City>(environment.backendBaseUrl + this.backendUrl, city);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
