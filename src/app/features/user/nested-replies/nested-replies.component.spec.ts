import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedRepliesComponent } from './nested-replies.component';

describe('NestedRepliesComponent', () => {
  let component: NestedRepliesComponent;
  let fixture: ComponentFixture<NestedRepliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NestedRepliesComponent]
    });
    fixture = TestBed.createComponent(NestedRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
