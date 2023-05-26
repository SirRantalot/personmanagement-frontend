import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseComponent} from './base.component';
import {HttpClient} from '@angular/common/http';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseComponent],
      providers: [{provide: HttpClient}]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
