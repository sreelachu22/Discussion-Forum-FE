import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedThreadsComponent } from './closed-threads.component';

describe('ClosedThreadsComponent', () => {
  let component: ClosedThreadsComponent;
  let fixture: ComponentFixture<ClosedThreadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedThreadsComponent],
    });
    fixture = TestBed.createComponent(ClosedThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
