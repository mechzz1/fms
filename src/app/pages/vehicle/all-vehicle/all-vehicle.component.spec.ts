import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVehicleComponent } from './all-vehicle.component';

describe('AllVehicleComponent', () => {
  let component: AllVehicleComponent;
  let fixture: ComponentFixture<AllVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
