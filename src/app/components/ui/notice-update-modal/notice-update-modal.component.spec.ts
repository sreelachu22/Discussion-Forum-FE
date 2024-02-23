import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeUpdateModalComponent } from './notice-update-modal.component';

describe('NoticeUpdateModalComponent', () => {
  let component: NoticeUpdateModalComponent;
  let fixture: ComponentFixture<NoticeUpdateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticeUpdateModalComponent],
    });
    fixture = TestBed.createComponent(NoticeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
