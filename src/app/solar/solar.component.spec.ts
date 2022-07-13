import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarComponent } from './solar.component';

describe('SolarComponent', () => {
  let component: SolarComponent;
  let fixture: ComponentFixture<SolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
