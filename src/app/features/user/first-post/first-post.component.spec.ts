import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPostComponent } from './first-post.component';

describe('FirstPostComponent', () => {
  let component: FirstPostComponent;
  let fixture: ComponentFixture<FirstPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstPostComponent]
    });
    fixture = TestBed.createComponent(FirstPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
