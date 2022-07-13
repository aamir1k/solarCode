import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryButtonComponent } from './enquiry-button.component';

describe('EnquiryButtonComponent', () => {
  let component: EnquiryButtonComponent;
  let fixture: ComponentFixture<EnquiryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
