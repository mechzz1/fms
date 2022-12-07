import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskInputComponent } from './mask-input.component';

describe('MaskInputComponent', () => {
  let component: MaskInputComponent;
  let fixture: ComponentFixture<MaskInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaskInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
