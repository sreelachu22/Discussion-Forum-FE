import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nesreplies20Component } from './nesreplies2.0.component';

describe('Nesreplies20Component', () => {
  let component: Nesreplies20Component;
  let fixture: ComponentFixture<Nesreplies20Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Nesreplies20Component]
    });
    fixture = TestBed.createComponent(Nesreplies20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
