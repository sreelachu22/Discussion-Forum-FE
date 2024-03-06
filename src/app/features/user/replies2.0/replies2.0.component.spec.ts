import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Replies20Component } from './replies2.0.component';

describe('Replies20Component', () => {
  let component: Replies20Component;
  let fixture: ComponentFixture<Replies20Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Replies20Component]
    });
    fixture = TestBed.createComponent(Replies20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
