import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { ContactDetails } from '../dataaccess/contact-details';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailsService {

  readonly backendUrl = 'contact';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<ContactDetails[]> {
    return this.http.get<ContactDetails[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<ContactDetails> {
    return this.http.get<ContactDetails>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(contact: ContactDetails): Observable<ContactDetails> {
    return this.http.put<ContactDetails>(environment.backendBaseUrl + this.backendUrl + `/${contact.id}`, contact);
  }

  public save(contact: ContactDetails): Observable<ContactDetails> {
    return this.http.post<ContactDetails>(environment.backendBaseUrl + this.backendUrl, contact);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
