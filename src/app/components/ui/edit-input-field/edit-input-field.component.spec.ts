import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInputFieldComponent } from './edit-input-field.component';

describe('EditInputFieldComponent', () => {
  let component: EditInputFieldComponent;
  let fixture: ComponentFixture<EditInputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInputFieldComponent]
    });
    fixture = TestBed.createComponent(EditInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
