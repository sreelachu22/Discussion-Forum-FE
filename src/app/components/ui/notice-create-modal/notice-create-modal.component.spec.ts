import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeCreateModalComponent } from './notice-create-modal.component';

describe('NoticeCreateModalComponent', () => {
  let component: NoticeCreateModalComponent;
  let fixture: ComponentFixture<NoticeCreateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticeCreateModalComponent],
    });
    fixture = TestBed.createComponent(NoticeCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
