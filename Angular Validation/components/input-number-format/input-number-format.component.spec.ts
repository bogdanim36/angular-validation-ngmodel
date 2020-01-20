import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberFormatComponent } from './input-number-format.component';

describe('InputNumberFormatComponent', () => {
  let component: InputNumberFormatComponent;
  let fixture: ComponentFixture<InputNumberFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNumberFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
