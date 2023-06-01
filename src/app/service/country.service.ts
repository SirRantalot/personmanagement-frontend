import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Country } from '../dataaccess/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  readonly backendUrl = 'country';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Country> {
    return this.http.get<Country>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(country: Country): Observable<Country> {
    return this.http.put<Country>(environment.backendBaseUrl + this.backendUrl + `/${country.id}`, country);
  }

  public save(country: Country): Observable<Country> {
    return this.http.post<Country>(environment.backendBaseUrl + this.backendUrl, country);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
