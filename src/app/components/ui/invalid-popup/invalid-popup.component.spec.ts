import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidPopupComponent } from './invalid-popup.component';

describe('InvalidPopupComponent', () => {
  let component: InvalidPopupComponent;
  let fixture: ComponentFixture<InvalidPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidPopupComponent]
    });
    fixture = TestBed.createComponent(InvalidPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
