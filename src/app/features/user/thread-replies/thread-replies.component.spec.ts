import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadRepliesComponent } from './thread-replies.component';

describe('ThreadRepliesComponent', () => {
  let component: ThreadRepliesComponent;
  let fixture: ComponentFixture<ThreadRepliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadRepliesComponent],
    });
    fixture = TestBed.createComponent(ThreadRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
