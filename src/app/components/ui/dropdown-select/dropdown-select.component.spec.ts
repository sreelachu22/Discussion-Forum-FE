import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSelectComponent } from './dropdown-select.component';

describe('DropdownSelectComponent', () => {
  let component: DropdownSelectComponent;
  let fixture: ComponentFixture<DropdownSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSelectComponent]
    });
    fixture = TestBed.createComponent(DropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
