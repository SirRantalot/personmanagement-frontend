import {TestBed} from '@angular/core/testing';

import {CityService} from './city.service';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {City} from '../dataaccess/city';

describe('CityService', () => {
  let service: CityService;
  let httpSpy: Spy<HttpClient>;

  const fakeCities: City[] = [
    {
      id: 1,
      city: 'City 1'
    },
    {
      id: 2,
      city: 'City 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: createSpyFromClass(HttpClient)}
      ]
    });
    service = TestBed.inject(CityService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of cities', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeCities);

    service.getList().subscribe({
        next:
          cities => {
            expect(cities).toHaveSize(fakeCities.length);
            done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new city', (done: DoneFn) => {

    const newCity: City = {
      id: 3,
      city: 'City 3'
    };

    httpSpy.post.and.nextWith(newCity);

    service.save(newCity).subscribe({
        next: city => {
          expect(city).toEqual(newCity);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an city', (done: DoneFn) => {

    const city = fakeCities[0];
    city.city = 'Updated City';

    httpSpy.put.and.nextWith(city);

    service.update(city).subscribe({
      next: city => {
        expect(city.city).toEqual('Updated City');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing city', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
