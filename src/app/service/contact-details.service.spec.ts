import { TestBed } from '@angular/core/testing';
import { ContactDetailsService } from './contact-details.service';


describe('ContactService', () => {
  let service: ContactDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
