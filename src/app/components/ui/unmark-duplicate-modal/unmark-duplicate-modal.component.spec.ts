import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmarkDuplicateModalComponent } from './unmark-duplicate-modal.component';

describe('UnmarkDuplicateModalComponent', () => {
  let component: UnmarkDuplicateModalComponent;
  let fixture: ComponentFixture<UnmarkDuplicateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnmarkDuplicateModalComponent]
    });
    fixture = TestBed.createComponent(UnmarkDuplicateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
