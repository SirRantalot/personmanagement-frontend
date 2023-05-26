import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsCreateComponent } from './contact-details-create.component';

describe('ContactDetailsCreateComponent', () => {
  let component: ContactDetailsCreateComponent;
  let fixture: ComponentFixture<ContactDetailsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
