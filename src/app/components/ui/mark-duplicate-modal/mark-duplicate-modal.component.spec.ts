import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDuplicateModalComponent } from './mark-duplicate-modal.component';

describe('MarkDuplicateModalComponent', () => {
  let component: MarkDuplicateModalComponent;
  let fixture: ComponentFixture<MarkDuplicateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkDuplicateModalComponent]
    });
    fixture = TestBed.createComponent(MarkDuplicateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
