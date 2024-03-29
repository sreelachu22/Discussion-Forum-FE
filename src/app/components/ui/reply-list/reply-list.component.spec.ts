import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyListComponent } from './reply-list.component';

describe('ReplyListComponent', () => {
  let component: ReplyListComponent;
  let fixture: ComponentFixture<ReplyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyListComponent],
    });
    fixture = TestBed.createComponent(ReplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
