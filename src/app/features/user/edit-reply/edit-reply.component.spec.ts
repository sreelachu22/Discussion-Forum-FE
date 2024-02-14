import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReplyComponent } from './edit-reply.component';

describe('EditReplyComponent', () => {
  let component: EditReplyComponent;
  let fixture: ComponentFixture<EditReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReplyComponent]
    });
    fixture = TestBed.createComponent(EditReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
