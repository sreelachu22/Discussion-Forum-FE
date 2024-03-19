import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeManagementComponent } from './badge-management.component';

describe('BadgeManagementComponent', () => {
  let component: BadgeManagementComponent;
  let fixture: ComponentFixture<BadgeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeManagementComponent]
    });
    fixture = TestBed.createComponent(BadgeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
