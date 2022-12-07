import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputChipsSpecialComponent } from './input-chips-special.component';

describe('InputChipsSpecialComponent', () => {
  let component: InputChipsSpecialComponent;
  let fixture: ComponentFixture<InputChipsSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputChipsSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputChipsSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
